import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Firebase from "./Firebase";

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
const ContributorsDiv = styled.div`
  line-height: normal;
  margin-left: 30px;
  margin-right: 30px;
  text-align: left;
  margin-top: 2rem;
  color: #bdbbc4;
  min-height: calc(100vh - 13rem);
  padding-bottom: 5rem;
`;

const ContributorTile = styled.a`
  display: grid;
  text-decoration: none;
  color: #bdbbc4;
  :hover {
    background: #7d1313;
  }
  padding-top: 1rem;
  padding-bottom: 1rem;
  grid-template-columns: 100px auto;
`;
const ContributorTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const ContributorIcon = styled.div`
  background-color: #d32f2f;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: grid;
  justify-content: center;
  align-content: center;
  align-self: center;
  justify-self: center;
`
const ContributorContent = styled.div``

const ContributorContact = styled.div``;
export default class Contributors extends Component {
  contributors = [
    {
      name: 'Kiran Anto',
      email: 'kirananto@gmail.com',
      role: 'Creator',
      link: 'https://github.com/kirananto'
    }, {
      name: 'Mohamed Fawaz',
      email: 'favazkandath@gmail.com',
      role: 'Contributor',
      link: 'https://github.com/favazkandath'
    }
  ]
  render() {
    Firebase.analytics().logEvent('viewed_contributors')
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
          Contributors
        </Heading>
        <ContributorsDiv>
          {this.contributors.map(item => (
            <ContributorTile href={item.link} key={item.name}>
            <ContributorIcon>{item.name[0]}</ContributorIcon>
            <ContributorContent>
            <ContributorTitle>{item.name}</ContributorTitle>
            <ContributorContact>{item.role}</ContributorContact>
            <ContributorContact>{item.email}</ContributorContact>
            </ContributorContent>
          </ContributorTile>
          ))}
          
        </ContributorsDiv>
      </div>
    );
  }
}
