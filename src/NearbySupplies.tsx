import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const ButtonContainer = styled.div`
  align-self: center;
  justify-self: center;
  width: 100%;
  max-width: 400px;
`;

const Button = styled(Link)`
  min-height: 100px;
  box-sizing: border-box;
  -webkit-box-align: center;
  align-items: center;
  white-space: nowrap;
  font-size: 24px;
  display: grid;
  -webkit-box-pack: center;
  margin-bottom: 2rem;
  justify-content: center;
  border: 1px solid #b17acc;
  color: #b17acc;
  word-break: break-all;
  margin-right: 3rem;
  margin-left: 3rem;
  cursor: pointer;
  outline: 0px;
  padding: 0px 1rem;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 1rem;
  text-decoration: none;
  :hover {
    background-color: #663399;
    border: 1px solid #663399;
    color: #bdbbc4;
  }
`;

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

export default class Homepage extends Component {
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
        <PlaceHeading>📍 You're at Irinjalakuda, Kerala</PlaceHeading>
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
          <Chips>🧼 Sanitizers</Chips>
          <Chips>😷 Masks</Chips>
        </SubHeading>
        <ItemsContainer>
          {Array(5).fill(1).map(item => (<Item>
            <Distance>📍0.5 KM</Distance>
            <ItemTitle>Neethi Medicals</ItemTitle>
            <ItemDescription>
              Taluk Head Quarters Hospital, Hospital Rd, Thrippunithura,
              Ernakulam
            </ItemDescription>
            <Tags>Tags</Tags>
            <TagItem>✨ Recently added</TagItem>
            <TagItem>😷 Mask</TagItem>
            <Actions>
              <Action>📞 Call</Action>
              <Action>🚗 Navigate</Action>
            </Actions>
          </Item>))}
        </ItemsContainer>
      </div>
    );
  }
}
