import React from "react";
import { render } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Home from "./components/Home";
import Location from "./components/Location";
import Forecast from "./components/Forecast";
import Details from "./components/Details";
import Header from "./components/Header";

import background from "./images/background.jpg";

const GlobalStyle = createGlobalStyle`
body {
margin: 0;
padding: 0;
}`;

const PageWrapper = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  background-size: cover;
  flex-direction: column;
  display: flex;
  justify-content: center;
  background-image: url(${background});
  height: 100vh;
  align-items: center;
`;
class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <GlobalStyle />
          <Header />
          <Route
            exact
            path="/"
            render={props => {
              return (
                <PageWrapper>
                  <Location
                    onSubmitLocation={city => {
                      // pushing new path to browser router history where we can use it to serve another component
                      props.history.push({
                        pathname: "/forecast",
                        search: `?city=${city}`
                      });
                    }}
                  />
                </PageWrapper>
              );
            }}
          />

          <Route path="/forecast" component={Forecast} />
          <Route path="/details/:city" component={Details} />
        </React.Fragment>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
