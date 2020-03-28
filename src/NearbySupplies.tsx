import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { TotalHelped, PoweredBy } from "./Homepage";
import axios from "axios";
import fb from "./Firebase";
import firebase from "firebase";
import { findDistanceFromLocation } from "./helpers";
import { GeoFirestore } from "geofirestore";

const Heading = styled.div`
  font-size: 24px;
  background-color: #000;
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

const ShareButton = styled.div`
  border-radius: 1rem;
  margin: auto;
  cursor: pointer;
  padding: 1rem 2rem;
  margin-top: 2rem;
  border: 1px solid white;
  width: fit-content;
`;
const Chips = styled.div`
  border: 1px solid #d32f2f;
  color: #d32f2f;
  margin: 0.5rem;
  cursor: pointer;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 32px;

  transition: all 0.5s ease-in-out;
  border-radius: 1rem;
  background: ${(props: { clicked?: boolean }) =>
    props.clicked ? "#d32f2f" : "transparent"};
  color: ${(props: { clicked?: boolean }) =>
    props.clicked ? "#fff" : "#d32f2f"};

  :hover {
    background: #d32f2f;
    color: #fff;
  }
`;
const ChipSpan = styled(NavLink)`
  border: 1px solid #d32f2f;
  color: #d32f2f;
  margin: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 32px;
  border-radius: 1rem;
  text-decoration: none;
`;

const TagItem = styled.div`
  border: 1px solid #d32f2f;
  color: #d32f2f;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 24px;
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

export const LoadingDiv = styled.div`
  color: #bdbbc4;
  font-size: 16px;
  margin-top: calc(50vh - 250px);
  margin-bottom: calc(50vh - 150px);
  text-align: center;
`;

const Item = styled.div`
  background-color: #161517;
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

export const NoSupport = styled(Heading)`
  @media (max-width: 640px) {
    display: none;
  }
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

const prevDate = new Date().getTime() - 1000 * 60 * 60 * 24 * 1;

const fiveDaysBack = new Date().getTime() - 1000 * 60 * 60 * 24 * 5;

export default class NearbySupplies extends Component {
  state = {
    userLat: 0,
    userLong: 0,
    locationString: "",
    latFetched: true,
    supplies: [],
    isLoading: true,
    clicked: "",
    tel: "+917012918926"
  };

  componentDidMount() {
    fb.analytics().logEvent('viewed_supplies')
    this.initialize();
  }

  initialize = () => {
    navigator?.geolocation.getCurrentPosition(
      this.locationSuccessCallback,
      this.locationErrorCallback,
      { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 }
    );
  };

  loadSupplies = () => {
    const db = fb.firestore();
    const geofirestore: GeoFirestore = new GeoFirestore(db);
    geofirestore
      .collection("Entries")
      .near({
        center: new firebase.firestore.GeoPoint(
          this.state.userLat,
          this.state.userLong
        ),
        radius: 5,
        limit: 100
      })
      .onSnapshot(querySnapshot => {
        var supplies: any[] = [];
        console.log("supplies", querySnapshot.size);
        querySnapshot.forEach(doc => {
          console.log("doc", doc.data());
          supplies.push({
            ...doc.data(),
            distance: findDistanceFromLocation(
              doc.data().coordinates.latitude,
              doc.data().coordinates.longitude,
              this.state.userLat,
              this.state.userLong,
              "K"
            )
          });
        });
        this.setState({
          isLoading: false,
          supplies: supplies
            .filter(item => {
              if (this.state.clicked === "sanitizer") {
                return item.supply_sanitizer;
              } else if (this.state.clicked === "mask") {
                return item.supply_masks;
              } else if (this.state.clicked === "food") {
                return item.supply_food;
              } else {
                return true;
              }
            })
            .filter(
              (item: any) =>
                item.created.toMillis() >
                firebase.firestore.Timestamp.fromDate(
                  new Date(fiveDaysBack)
                ).toMillis()
            )
            .sort((a, b) => a.distance - b.distance)
        });
      });
  };

  fetchLocationString = () => {
    axios({
      url: `https://nominatim.openstreetmap.org/search?format=json&q=${this.state.userLat},${this.state.userLong}&addressdetails=1`
    }).then(result => {
      this.setState(
        {
          locationString: `${result.data?.[0]?.display_name
            ?.split(",")
            .slice(-5)
            .join(",")
            .trim()}`
        },
        this.loadSupplies
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

  share = () => {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: "Your Friendly Neighbourhood Supplies",
        text:
          "Get Help and Help people get food provisions and supplies during the time of lockdown.",
        url: "https://supply.netlify.com"
      });
    }
  };

  locationErrorCallback = (error: any) => {
    console.log("hello", error);
    this.setState({
      latFetched: false
    });
  };
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
        <NoSupport>
          ⚠️ Please use from your phones for better accuracy
        </NoSupport>
        {this.state.latFetched ? (
          <>
            <PlaceHeading>
              <span role="img" aria-label="location">
                📍
              </span>{" "}
              {this.state.locationString
                ? `You're at ${this.state.locationString}`
                : `Retrieving your location...`}
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
              <Chips
                clicked={this.state.clicked === "sanitizer"}
                onClick={() =>
                  this.setState({ clicked: "sanitizer" }, this.loadSupplies)
                }
              >
                <span role="img" aria-label="sanitizer">
                  🧼{" "}
                </span>
                Sanitizers
              </Chips>
              <Chips
                clicked={this.state.clicked === "mask"}
                onClick={() =>
                  this.setState({ clicked: "mask" }, this.loadSupplies)
                }
              >
                <span role="img" aria-label="mask">
                  😷{" "}
                </span>
                Masks
              </Chips>
              <Chips
                clicked={this.state.clicked === "food"}
                onClick={() =>
                  this.setState({ clicked: "food" }, this.loadSupplies)
                }
              >
                <span role="img" aria-label="food">
                  🥫{" "}
                </span>
                Food Provisions
              </Chips>
            </SubHeading>
            {this.state.isLoading || this.state.supplies?.length === 0 ? (
              <LoadingDiv>
                <div style={{ fontSize: "60px", marginBottom: "1rem" }}>
                  {this.state.isLoading ? "🔄" : "❌"}
                </div>
                Be aware, not afraid ! <br />
                {this.state.isLoading ? (
                  "loading..."
                ) : (
                  <div
                    style={{
                      maxWidth: "70%",
                      margin: "auto",
                      marginTop: "2rem",
                      fontSize: "20px"
                    }}
                  >
                    Sorry no shops found in <strong>5km</strong> radius <br />
                    <br /> Please share this app with everyone you know to bring
                    support in your area
                    <br />
                    {(navigator as any).share && (
                      <ShareButton onClick={this.share}>
                        <span
                          role="img"
                          aria-label="share"
                          style={{ marginRight: "1rem" }}
                        >
                          #️⃣
                        </span>
                        Share
                      </ShareButton>
                    )}
                  </div>
                )}
              </LoadingDiv>
            ) : (
              <ItemsContainer>
                {this.state.supplies.map((item: any, index) => {
                  return (
                    <Item key={index}>
                      <Distance>
                        <span role="img" aria-label="location">
                          📍
                        </span>
                        {item.distance.toFixed(2)} KM
                      </Distance>
                      <ItemTitle>{item.place_name}</ItemTitle>
                      <ItemDescription>{item.address}</ItemDescription>
                      {item.description && (
                        <>
                          {" "}
                          <ItemDescription
                            style={{ marginTop: "1rem", fontWeight: "bold" }}
                          >
                            Additional info
                          </ItemDescription>
                          <ItemDescription style={{ fontStyle: "italic" }}>
                            {item.description}
                          </ItemDescription>
                        </>
                      )}
                      <Tags>Tags</Tags>
                      <TagsContainer>
                        {item.created && item.created.toMillis() > prevDate && (
                          <TagItem>
                            <span role="img" aria-label="recently-added">
                              ✨
                            </span>{" "}
                            Recently added
                          </TagItem>
                        )}
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
                              🥫
                            </span>{" "}
                            Food provisions
                          </TagItem>
                        )}
                        {item.facility_delivery && (
                          <TagItem>
                            <span role="img" aria-label="masks">
                              🚚
                            </span>{" "}
                            Door delivery
                          </TagItem>
                        )}
                      </TagsContainer>
                      <Actions>
                        <Action href={`tel:${item.contact}`}>
                          <span role="img" aria-label="call">
                            📞
                          </span>{" "}
                          Call
                        </Action>
                        <Action
                          href={`google.navigation:q=${item.coordinates.latitude},${item.coordinates.longitude}`}
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
            )}
          </>
        ) : (
          <StyledError onClick={this.initialize}>
            {" "}
            <div>
              <span role="img" aria-label="location">
                📍
              </span>
            </div>
            Please enable location services <br />{" "}
            <span>Click here after that</span>
          </StyledError>
        )}
        <a href="https://www.webfreecounter.com/" target="_blank">
          <TotalHelped>Total People Helped</TotalHelped>{" "}
          <img
            src="https://www.webfreecounter.com/hit.php?id=guvekofnd&nd=6&style=26"
            alt="web counter"
          />
        </a>
        <PoweredBy>
          Made in India with ❤️ |{" "}
          <NavLink to="/contributors">Contributors</NavLink> |{" "}
          <a href="https://github.com/kirananto/SupplyInfo">Github</a> |
          #BreaktheChain
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
`;
