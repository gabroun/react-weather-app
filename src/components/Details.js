import React from "react";
import Day from "./Day";

import styled from "styled-components";
const Description = styled.div`
  font-size: 24px;
  font-weight: 100;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;

class Details extends React.Component {
  render() {
    let props = this.props.location.state;
    return (
      <React.Fragment>
        <Day day={props} />
        <Description className="container">
          <p style={{ textTransform: "capitalize" }}>{props.city}</p>
          <p style={{ textTransform: "capitalize" }}>
            {props.weather[0].description}
          </p>
          <p>
            Min temp: {Math.round(props.temp.min)}
            <sup>&#176; </sup>
          </p>
          <p>
            Max temp: {Math.round(props.temp.max)}
            <sup>&#176; </sup>
          </p>
        </Description>
      </React.Fragment>
    );
  }
}

export default Details;
