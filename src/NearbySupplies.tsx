import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PoweredBy } from "./Homepage";
import axios from "axios";
import firebase from "./Firebase";
import { findDistanceFromLocation } from "./helpers";

const Heading = styled.div`
  font-size: 24px;
  background-color: rgba(19, 18, 23, 0.975);
  border-bottom: 1px #232129 solid;
  line-height: 54px;
  font-weight: 600;
  text-align: left;
  padding-right: 1rem;
  padding-left: 1rem;
  color: #bdbbc4;
`;
const SubHeading = styled(Heading)`
  display: flex;
  font-size: 16px;
  line-height: 32px;
  flex-wrap: wrap;
`;
const Chips = styled.div`
  border: 1px solid #b17acc;
  color: #b17acc;
  margin: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 32px;
  border-radius: 1rem;
`;
const ChipSpan = styled(NavLink)`
  border: 1px solid #b17acc;
  color: #b17acc;
  margin: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 32px;
  border-radius: 1rem;
  text-decoration: none;
`;

const TagItem = styled.div`
  border: 1px solid #b17acc;
  color: #b17acc;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 30px;
  border-radius: 1rem;
  text-decoration: none;
  margin: 0;
  width: fit-content;
  font-size: 1rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const PlaceHeading = styled(Heading)`
  font-size: 14px;
  text-align: center;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ItemsContainer = styled.div`
  /* display: flex; */
  color: #bdbbc4;
  padding-top: 1rem;
  margin-left: 15px;
  margin-right: 15px;
`;

const Item = styled.div`
  background-color: #232129;
  /* width: 100%; */
  margin-bottom: 15px;
  min-height: 100px;
  padding: 15px;
  text-align: left;
`;
const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Tags = styled(ItemTitle)`
  font-size: 15px;
  font-style: italic;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;
const ItemDescription = styled.div`
  font-size: 14px;
`;
const Distance = styled.div`
  font-size: 14px;
  float: right;
`;

const Actions = styled.div`
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: -15px;
  margin-top: 1rem;
  display: grid;
  border-top: 1px #2d2d2d solid;
  grid-template-columns: repeat(2, 1fr);
`;
const Action = styled.a`
  text-align: center;
  text-decoration: none;
  color: #bdbbc4;
  padding: 0.5rem;
`;

export default class NearbySupplies extends Component {
  state = {
    userLat: 0,
    userLong: 0,
    locationString: "",
    latFetched: true,
    supplies: [],
    tel: "+917012918926"
  };

  componentDidMount() {
    navigator?.geolocation.getCurrentPosition(this.locationSuccessCallback, this.locationErrorCallback);
  }

  fetchLocationString = () => {
    axios({
      url: `https://nominatim.openstreetmap.org/search?format=json&q=${this.state.userLat},${this.state.userLong}&addressdetails=1`
    }).then(result => {
      const address = result.data?.[0]?.address;
      this.setState(
        {
          locationString: `${address?.road},${address?.village},${address?.county}`
        },
        () => {
          const db = firebase.firestore();
          db.collection("Entries").onSnapshot(querySnapshot => {
            var supplies: any[] = [];
            console.log("supplies", querySnapshot.size);
            querySnapshot.forEach(function(doc) {
              console.log("doc", doc.data());
              supplies.push(doc.data());
            });
            console.log("supplies", supplies);
            this.setState({ supplies });
          });
        }
      );
    });
  };

  locationSuccessCallback = (position: any) => {
    if (position?.coords?.latitude && position?.coords?.longitude) {
      this.setState(
        {
          userLat: position.coords.latitude,
          userLong: position.coords.longitude,
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

  locationErrorCallback = () => {
    console.log('hello')
    this.setState({
      latFetched: false
    });
  }
  render() {
    return (
      <div>
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
          Nearby Supplies
        </Heading>
        {this.state.latFetched ? (<>
          <PlaceHeading>
          <span role="img" aria-label="location">
            📍
          </span>{" "}
          You're at{" "}
          {this.state.locationString
            ? this.state.locationString
            : `Unknown location`}
        </PlaceHeading>
        <div
          style={{
            color: "white",
            textAlign: "left",
            paddingLeft: "1rem",
            fontStyle: "italic",
            marginTop: "0.5rem"
          }}
        >
          Available items
        </div>
        <SubHeading>
          <Chips>
            <span role="img" aria-label="sanitizer">
              🧼
            </span>
            Sanitizers
          </Chips>
          <Chips>
            <span role="img" aria-label="mask">
              😷
            </span>
            Masks
          </Chips>
          <Chips>
            <span role="img" aria-label="food">
              🍕
            </span>
            Food items
          </Chips>
        </SubHeading>
        <ItemsContainer>
          {this.state.supplies.map((item: any, index) => {
            const distance = findDistanceFromLocation(
              item.location.latitude,
              item.location.longitude,
              this.state.userLat,
              this.state.userLong,
              "K"
            );
            return (
              <Item key={index}>
                <Distance>
                  <span role="img" aria-label="location">
                    📍
                  </span>
                  {distance} KM
                </Distance>
                <ItemTitle>{item.place_name}</ItemTitle>
                <ItemDescription>{item.address}</ItemDescription>
                <Tags>Tags</Tags>
                <TagsContainer>
                  <TagItem>
                    <span role="img" aria-label="recently-added">
                      ✨
                    </span>{" "}
                    Recently added
                  </TagItem>
                  {item.supply_masks && (
                    <TagItem>
                      <span role="img" aria-label="masks">
                        😷
                      </span>{" "}
                      Mask
                    </TagItem>
                  )}
                  {item.supply_sanitizer && (
                    <TagItem>
                      <span role="img" aria-label="masks">
                        🧼
                      </span>{" "}
                      Sanitizers
                    </TagItem>
                  )}
                  {item.supply_food && (
                    <TagItem>
                      <span role="img" aria-label="masks">
                        🍕
                      </span>{" "}
                      Food items
                    </TagItem>
                  )}
                </TagsContainer>
                <Actions>
                  <Action href={`tel:${item.address}`}>
                    <span role="img" aria-label="call">
                      📞
                    </span>{" "}
                    Call
                  </Action>
                  <Action
                    href={`google.navigation:q=${item.location.latitude},${item.location.longitude}`}
                  >
                    <span role="img" aria-label="navigate">
                      🚗
                    </span>{" "}
                    Navigate
                  </Action>
                </Actions>
              </Item>
            );
          })}
        </ItemsContainer>
        </>) : (<StyledError> <div>📍</div>Please enable location services </StyledError>)}
        <PoweredBy>
          Powered by <a href="https://github.com/kirananto">Kiran Anto</a>
        </PoweredBy>
      </div>
    );
  }
}

const StyledError = styled(Heading)`
  line-height: normal;
  text-align: center;
  display: grid;
  align-content: center;
  min-height: calc(100vh - 13rem);
  padding-bottom: 5rem;
  div {
    font-size: 80px;
  }
`
