import React from "react";
import { getDate } from "../utils/helpers";
import icons from "../images/weather-icons/*.svg";

import styled from "styled-components";

const DayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 35px;
  &:hover {
    cursor: pointer;
  }

  img {
    height: 130px;
  }
  h2 {
    font-size: 28px;
    color: #333;
    font-weight: 100;
  }
`;

const Day = props => {
  const date = getDate(props.day.dt);
  let icon = props.day.weather[0].icon;
  return (
    <DayContainer className="container" onClick={props.onclick}>
      <img src={icons[icon]} alt="weather" />
      <h2>{date}</h2>
    </DayContainer>
  );
};
export default Day;
