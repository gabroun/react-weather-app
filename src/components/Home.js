import React from "react";
import Location from "./Location";
class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1 className="header">Enter A City</h1>
        <Location />
      </div>
    );
  }
}

export default Home;
