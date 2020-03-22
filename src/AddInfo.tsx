import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PoweredBy } from "./Homepage";

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

const TagItem = styled.span`
  border: 1px solid #b17acc;
  color: #b17acc;
  margin: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 32px;
  border-radius: 1rem;
  text-decoration: none;
  margin: 0;
  width: fit-content;
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const PlaceHeading = styled(Heading)`
  font-size: 14px;
  text-align: center;
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
const Action = styled.div`
  text-align: center;
  padding: 0.5rem;
`;

export default class AddInfo extends Component {
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
          Add Nearby Supply Info
        </Heading>
        <PlaceHeading>
          <span role="img" aria-label="location">
            📍
          </span>{" "}
          You're at Irinjalakuda, Kerala
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
          {Array(5)
            .fill(1)
            .map(item => (
              <Item>
                <Distance>
                  <span role="img" aria-label="location">
                    📍
                  </span>
                  0.5 KM
                </Distance>
                <ItemTitle>Neethi Medicals</ItemTitle>
                <ItemDescription>
                  Taluk Head Quarters Hospital, Hospital Rd, Thrippunithura,
                  Ernakulam
                </ItemDescription>
                <Tags>Tags</Tags>
                <TagItem>
                  <span role="img" aria-label="recently-added">
                    ✨
                  </span>{" "}
                  Recently added
                </TagItem>
                <TagItem>
                  <span role="img" aria-label="masks">
                    😷
                  </span>{" "}
                  Mask
                </TagItem>

                <Actions>
                  <Action>
                    <span role="img" aria-label="call">
                      📞
                    </span>{" "}
                    Call
                  </Action>
                  <Action>
                    <span role="img" aria-label="navigate">
                      🚗
                    </span>{" "}
                    Navigate
                  </Action>
                </Actions>
              </Item>
            ))}
        </ItemsContainer>
        <PoweredBy>
          Powered by <a href="https://github.com/kirananto">Kiran Anto</a>
        </PoweredBy>
      </div>
    );
  }
}
