import React from "react";
import { getCurrentWeather } from "../utils/api";

import styled from "styled-components";

const WeatherForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  input {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    height: 100%;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
  }
`;
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleSubmitLocation = this.handleSubmitLocation.bind(this);
  }

  handleChangeLocation(e) {
    const location = e.target.value;
    this.setState(() => {
      return {
        location
      };
    });
  }

  handleSubmitLocation() {
    this.props.onSubmitLocation(this.state.location);
    getCurrentWeather(this.state.location).then(res => {});

    this.setState(() => ({
      location: ""
    }));
  }

  render() {
    return (
      <WeatherForm className="location">
        <input
          placeholder="London"
          type="text"
          onChange={this.handleChangeLocation}
          value={this.state.location}
        />
        <button type="button" onClick={this.handleSubmitLocation}>
          Get Weather
        </button>
      </WeatherForm>
    );
  }
}

export default Location;
