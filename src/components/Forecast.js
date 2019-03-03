import React from "react";
import queryString from "query-string";
import { getForecast } from "../utils/api";
import Day from "./Day";
import styled from "styled-components";

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  text-align: center;
  max-width: 1280px;
`;

const Title = styled.h1`
  font-size: 45px;
  color: #333;
  font-weight: 100;
  text-align: center;
  text-transform: capitalize;
`;

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      forecastData: []
    };

    this.makeRequest = this.makeRequest.bind(this);
  }

  componentDidMount() {
    this.city = queryString.parse(this.props.location.search).city;
    this.makeRequest(this.city);
  }

  makeRequest(city) {
    this.setState(() => {
      return {
        loading: true
      };
    });
    getForecast(city).then(res => {
      this.setState(() => {
        return {
          forecastData: res,
          loading: false
        };
      });
    });
  }

  handleClick(item) {
    item.city = this.city;
    this.props.history.push({
      pathname: `details/${this.city}`,
      state: item
    });
  }

  render() {
    return this.state.loading === true ? (
      <p>Loading</p>
    ) : (
      <React.Fragment>
        <Title>{this.city}</Title>
        <DaysContainer>
          {this.state.forecastData.list.map(item => {
            return (
              <Day
                key={item.dt}
                day={item}
                onclick={this.handleClick.bind(this, item)}
              />
            );
          })}
        </DaysContainer>
      </React.Fragment>
    );
  }
}

export default Forecast;
