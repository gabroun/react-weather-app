import React from "react";
import Location from "./Location";
import BarChart from "./BarChart";
import data from "./test.json";
class Home extends React.Component {
  render() {
    return <BarChart data={data} />;
  }
}

export default Home;
