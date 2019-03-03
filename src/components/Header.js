import React from "react";
import styled from "styled-components";

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  /* background-color: #028ebf; */
  background-color: #83a5b3;
  a {
    text-decoration: none;
    letter-spacing: 2px;
    &:hover,
    &:active,
    &:visited {
      text-decoration: none;
      color: #fff;
    }
  }
`;
class Header extends React.Component {
  render() {
    return (
      <NavBar>
        <a href="/">
          <h1>Weather App</h1>
        </a>
      </NavBar>
    );
  }
}
export default Header;
