import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PoweredBy } from "./Homepage";
import { withRouter } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import swearjar from "swearjar-extended";
import { validatePhone } from "./helpers";
import firebaseApp from "./Firebase";
import firebase from "firebase";
import { GeoCollectionReference, GeoFirestore } from "geofirestore";

const Heading = styled.div`
  font-size: 16px;
  background-color: rgba(19, 18, 23, 0.975);
  border-bottom: 1px #232129 solid;
  line-height: 54px;
  font-weight: 600;
  text-align: left;
  padding-right: 1rem;
  padding-left: 1rem;
  color: #bdbbc4;
`;

const BlueButton = styled.button`
  height: 42px;
  padding: 0rem 2rem;
  border-radius: 2px;
  cursor: pointer;
  margin: 15px;
  /* text-transform: uppercase; */
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #b17acc;
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  text-rendering: geometricprecision;
  letter-spacing: normal;
  transition: all 0.05s linear;
  :hover {
    box-shadow: 0 6px 10px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
  :focus {
    box-shadow: 0 6px 10px rgba(50, 50, 93, 0.3), 0 1px 3px rgba(0, 0, 0, 0.08);
    outline: none;
  }
  background: transparent;
  border: #b17acc 2px solid;
  width: 322px;
`;

const SubHeading = styled(Heading)`
  display: flex;
  font-size: 16px;
  line-height: 32px;
  flex-wrap: wrap;
  border-bottom: none;

  max-width: 70%;
`;
const Chips = styled.div`
  border: 1px solid #b17acc;
  cursor: pointer;
  background: ${(props: { clicked: boolean }) =>
    props.clicked ? "#b17acc" : "transparent"};
  color: ${(props: { clicked: boolean }) =>
    props.clicked ? "#fff" : "#b17acc"};
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  height: 32px;
  border-radius: 2rem;
  :hover {
    background: #b17acc;
    color: #fff;
  }
`;
const ChipSpan = styled(NavLink)`
  border: 1px solid #b17acc;
  color: #b17acc;
  margin: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 32px;
  border-radius: 1rem;
  text-decoration: none;
`;

const PlaceHeading = styled(Heading)`
  font-size: 14px;
  text-align: center;
`;

const ItalicText = styled.div`
  font-size: 12px;
  font-style: italic;
  text-align: left;
  color: #bdbbc4;
  margin-left: 15px;
`;
const ErrorText = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: calc(50vh - 170px);
  margin-bottom: calc(50vh - 170px);
  color: #cf6679;
  margin-left: 15px;
`;

const MainContainer = styled.div``;

const StyledInput = styled.input`
  width: 280px;
  margin-bottom: 12px;
  height: 45px;
  margin-top: 4px;
  margin-left: 15px;
  padding-left: 1rem;
  padding-right: 1.5rem;
  font-size: 16px;
  color: #bdbbc4;
  border-radius: 5px;
  border: ${(props: { hasError?: any }) =>
    props.hasError
      ? "solid 2px rgba(255, 42, 45, 0.93)"
      : "solid 1px rgba(107, 124, 147, 0.43)"};
  background-color: #232129;
`;

const StyledInputContainer = styled.div`
  margin-top: 27px;
  text-align: left;
`;

const Label = styled.div`
  font-size: 14px;
  text-align: left;
  margin-left: 15px;
  color: #bdbbc4;
`;

const ErrorMessage = styled.div`
  color: rgba(255, 42, 45, 0.93);
  margin-left: 15px;
`;

class AddInfo extends Component<any, any> {
  readonly state = {
    place_name: "",
    address: "",
    location: "Unknown location",
    locationShort: "",
    description: '',
    lat: 0,
    latFetched: false,
    direct:
      new URLSearchParams(window.location.search).get("direct") === "true",
    long: 0,
    contact: "",
    masks: false,
    food: true,
    doorDelivery: false,
    sanitizer: false,

    placeNameError: undefined,
    addressError: undefined,
    contactError: undefined
  };

  fetchLocationString = () => {
    axios({
      url: `https://nominatim.openstreetmap.org/search?format=json&q=${this.state.lat},${this.state.long}&addressdetails=1`
    }).then(result => {
      const address = result.data?.[0]?.address;
      this.setState({
        location: result.data?.[0]?.display_name,
        locationShort: `${address?.road},${address?.village},${address?.county}`
      });
    });
  };

  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    navigator?.geolocation?.getCurrentPosition(this.setDefaultCenter);
  };

  setDefaultCenter = (position: any) => {
    if (position?.coords?.latitude && position?.coords?.longitude) {
      this.setState(
        {
          lat: position.coords.latitude,
          long: position.coords.longitude,
          latFetched: true
        },
        this.fetchLocationString
      );
    } else {
      this.setState({
        latFetched: false
      });
    }
  };

  handleChangePlaceName = (event: any) => {
    this.setState({
      place_name: event.target.value.slice(0, 64)
    });
  };

  handleChangeDescription = (event: any) => {
    this.setState({
      description: event.target.value.slice(0, 140)
    });
  };

  validatePlaceName = () => {
    if (this.state.place_name.length < 4) {
      this.setState({ placeNameError: "Enter a valid place name" });
      return false;
    } else if (swearjar.profane(this.state.place_name)) {
      this.setState({
        placeNameError: `Let's be responsible and not get into hate`
      });
      return false;
    } else {
      this.setState({ placeNameError: undefined });
      return true;
    }
  };

  validateAddress = () => {
    if (this.state.address.length < 5) {
      this.setState({ addressError: "Enter a valid Address" });
      return false;
    } else if (swearjar.profane(this.state.address)) {
      this.setState({
        addressError: `Let's be responsible and not get into hate`
      });
      return false;
    } else {
      this.setState({ addressError: undefined });
      return true;
    }
  };

  validateContact = () => {
    if (this.state.contact.length < 5 || !validatePhone(this.state.contact)) {
      this.setState({ contactError: "Enter a valid phone number" });
      return false;
    } else {
      this.setState({ contactError: undefined });
      return true;
    }
  };

  handleAddress = (event: any) => {
    this.setState({
      address: event.target.value.slice(0, 140)
    });
  };
  handleContact = (event: any) => {
    const contact = event.target.value.slice(0, 25);
    this.setState({
      contact
    });
  };

  handleValidations = () => {
    const contact = this.validateContact();
    const address = this.validateAddress();
    const placeName = this.validatePlaceName();
    return placeName && address && contact;
  };
  onSubmit = () => {
    // TODO Handle save
    if (this.handleValidations()) {
      const db = firebaseApp.firestore();

      // Create a GeoFirestore reference
      const geofirestore: GeoFirestore = new GeoFirestore(db);

      // Create a GeoCollection reference
      const geocollection: GeoCollectionReference = geofirestore.collection(
        "Entries"
      );

      // Add a GeoDocument to a GeoCollection
      geocollection
        .add({
          address: this.state.address,
          contact: this.state.contact,
          direct: this.state.direct,
          description: this.state.description,
          // The coordinates field must be a GeoPoint!
          coordinates: new firebase.firestore.GeoPoint(
            this.state.lat,
            this.state.long
          ),
          created: firebase.firestore.FieldValue.serverTimestamp(),
          place_name: this.state.place_name,
          supply_food: this.state.food,
          supply_masks: this.state.masks,
          supply_sanitizer: this.state.sanitizer,
          facility_delivery: this.state.doorDelivery
        })
        .then(result => {
          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER
          });

          this.props.history.push("/");
        })
        .catch(error => {
          toast.error("Error Posting !", {
            position: toast.POSITION.TOP_CENTER
          });
        });
    }
  };
  render() {
    return (
      <div style={{ textAlign: "left" }}>
        <Heading>
          <ChipSpan
            to="/"
            style={{
              margin: 0,
              width: "fit-content",
              fontSize: "1rem",
              marginRight: "1rem"
            }}
          >
            {" "}
            {"< "}Back
          </ChipSpan>
          Add Nearby Supply Info
        </Heading>
        <PlaceHeading>
          <span role="img" aria-label="location">
            📍
          </span>{" "}
          You're at{" "}
          {this.state.locationShort
            ? this.state.locationShort
            : this.state.location}
        </PlaceHeading>
        {this.state.latFetched ? (
          <MainContainer>
            <StyledInputContainer>
              <Label>🏥 Enter place name </Label>
              <StyledInput
                onChange={this.handleChangePlaceName}
                value={this.state.place_name}
                onBlur={this.validatePlaceName}
                hasError={this.state.placeNameError}
                placeholder="Enter the title of the shop"
              />
              {this.state.placeNameError && (
                <ErrorMessage> {this.state.placeNameError}</ErrorMessage>
              )}
            </StyledInputContainer>
            <StyledInputContainer>
              <Label>📨 Address </Label>
              <StyledInput
                onChange={this.handleAddress}
                value={this.state.address}
                onBlur={this.validateAddress}
                hasError={this.state.addressError}
                placeholder="Address, so people can identify the location"
              />
              {this.state.addressError && (
                <ErrorMessage> {this.state.addressError}</ErrorMessage>
              )}
            </StyledInputContainer>
            <StyledInputContainer>
              <Label>📙 Additional info (Optional) </Label>
              <StyledInput
                onChange={this.handleChangeDescription}
                value={this.state.description}
                placeholder="If you want to add any extra information"
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <Label>📍 Pin Location </Label>
              <StyledInput
                disabled={true}
                hasError={false}
                value={this.state.location}
                placeholder={"Autofilled from your gps location"}
              />
              {!this.state.direct && (
                <ItalicText>
                  Ability to select location of shop - coming soon 🎉
                </ItalicText>
              )}
            </StyledInputContainer>
            <StyledInputContainer>
              <Label style={{ marginBottom: "0.5rem" }}>
                🛍️ Select supplies that are available here
              </Label>
              <SubHeading>
                <Chips
                  clicked={this.state.sanitizer}
                  onClick={() =>
                    this.setState({ sanitizer: !this.state.sanitizer })
                  }
                >
                  <span role="img" aria-label="sanitizer">
                    🧼{" "}
                  </span>
                  Sanitizers
                </Chips>
                <Chips
                  clicked={this.state.masks}
                  onClick={() => this.setState({ masks: !this.state.masks })}
                >
                  <span role="img" aria-label="mask">
                    😷{" "}
                  </span>
                  Masks
                </Chips>
                <Chips
                  clicked={this.state.food}
                  onClick={() => this.setState({ food: !this.state.food })}
                >
                  <span role="img" aria-label="food">
                    🍕{" "}
                  </span>
                  Food items
                </Chips>
              </SubHeading>
            </StyledInputContainer>
            <StyledInputContainer>
              <Label style={{ marginBottom: "0.5rem" }}>
                🏛 Facilities that are available
              </Label>
              <SubHeading>
                <Chips
                  clicked={this.state.doorDelivery}
                  onClick={() =>
                    this.setState({ doorDelivery: !this.state.doorDelivery })
                  }
                >
                  <span role="img" aria-label="sanitizer">
                    🚚{" "}
                  </span>
                  Door delivery
                </Chips>
              </SubHeading>
            </StyledInputContainer>
            <StyledInputContainer>
              <Label>📞 Contact number </Label>
              <StyledInput
                onChange={this.handleContact}
                hasError={this.state.contactError}
                onBlur={this.validateContact}
                value={this.state.contact}
                placeholder="Contact no of person with supply"
              />
              {this.state.contactError && (
                <ErrorMessage> {this.state.contactError}</ErrorMessage>
              )}
            </StyledInputContainer>
            <BlueButton onClick={this.onSubmit}>Save</BlueButton>
          </MainContainer>
        ) : (
          <ErrorText>
            {" "}
            <div style={{ fontSize: "60px" }}>❌</div>
            <br /> Unable to read your location
            <br />
            <div onClick={this.initialize}>
              Enable your location services and try again
            </div>
          </ErrorText>
        )}
        <PoweredBy>
          Powered by <a href="https://github.com/kirananto">Kiran Anto</a>, in
          association with #BreaktheChain
        </PoweredBy>
      </div>
    );
  }
}

export default withRouter(AddInfo);
