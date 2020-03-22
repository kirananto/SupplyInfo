import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  margin-right: 10%;
  margin-left: 10%;
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
  font-size: 36px;
  line-height: 54px;
  font-weight: 600;
  margin-right: 1rem;
  margin-left: 1rem;
  margin-bottom: 3rem;
  color: #bdbbc4;
`;
export const PoweredBy = styled.div`
  font-size: 14px;
  line-height: 54px;
  font-weight: 600;
  margin-right: 1rem;
  text-align: center;
  margin-left: 1rem;
  align-self: flex-end;
  margin-bottom: 3rem;
  color: #bdbbc4;
  a {
    color: #b17acc;
  }
`;
const SubHeading = styled.div`
  font-size: 16px;
  margin-top: 1rem;
  font-weight: 400;
  line-height: normal;
  font-style: italic;
  margin-right: 1rem;
  margin-left: 1rem;
  color: #bdbbc4;
`;

const ItalicsText = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin-top: -2rem;
  line-height: normal;
  font-style: italic;
  margin-right: 1rem;
  margin-left: 1rem;
  color: #bdbbc4;
`;

export default class Homepage extends Component {
  render() {
    return (
      <div style={{ display: "grid", minHeight: "100vh" }}>
        <ButtonContainer>
          <Heading>
            Nearest Supply
            <SubHeading>
              An inititative to ease life during <br />
              COVID-19 Lockdowns
            </SubHeading>
          </Heading>
          <Button to={"/add-data"}>
            Add Supply info
            <ItalicsText>Help people find food and masks</ItalicsText>
          </Button>
          <Button to={"/nearby-places"}>View Nearest supplies
          <ItalicsText>Nearest source for sanitizers, masks and food.</ItalicsText></Button>
        </ButtonContainer>
        <PoweredBy>
          Powered by <a href="https://github.com/kirananto">Kiran Anto</a>
        </PoweredBy>
      </div>
    );
  }
}
