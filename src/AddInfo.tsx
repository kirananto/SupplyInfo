import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PoweredBy } from "./Homepage";

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
    color: #fff;
    font-size: 18px;
    @media (max-width: 768px) {
        font-size: 14px;
    }
    @media (max-width: 520px) {
        font-size: 12px;
        padding: 0rem 1rem;
        height: 2.5rem;
    }
    /* font-weight: 600; */
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    text-rendering: geometricprecision;
    letter-spacing: normal;
    transition: all 0.05s linear;
    :hover {
        box-shadow: 0 6px 10px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
    }
    :focus {
        box-shadow: 0 6px 10px rgba(50, 50, 93, 0.3),
            0 1px 3px rgba(0, 0, 0, 0.08);
        outline: none;
    }
    background: linear-gradient(45deg, #725cbd, #9b6ad4);
    width: 322px;
    max-width: 70% !important;
`

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

const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  width: 280px;
  max-width: 70%;
  margin-bottom: 12px;
  height: 45px;
  margin-top: 4px;
  margin-left: 15px;
  padding-left: 1rem;
  padding-right: 1.5rem;
  font-size: 16px;
  color: #bdbbc4;
  border-radius: 5px;
  border: ${(props: any) =>
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
      <div style={{ textAlign: 'left'}}>
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
        <StyledInputContainer>
          <Label>Enter place name</Label>
          <StyledInput />
        </StyledInputContainer>
        <StyledInputContainer>
          <Label>Address</Label>
          <StyledInput />
        </StyledInputContainer>
        <StyledInputContainer>
          <Label>Pin Location</Label>
          <StyledInput disabled={true} placeholder={'Autofilled from your gps location'} />
        </StyledInputContainer>
        <StyledInputContainer>
          <Label>Select supply</Label>
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
        </StyledInputContainer>
        <StyledInputContainer>
          <Label>Contact number</Label>
          <StyledInput />
        </StyledInputContainer>
        <BlueButton>Save</BlueButton>
       
        <PoweredBy>
          Powered by <a href="https://github.com/kirananto">Kiran Anto</a>
        </PoweredBy>
      </div>
    );
  }
}
