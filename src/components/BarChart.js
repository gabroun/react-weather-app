import React, { Component } from "react";
import * as d3 from "d3";
const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class BarChart extends Component {
  state = {
    bars: []
  };

  xAxis = d3.axisBottom().tickFormat(d3.timeFormat("%a %d"));
  yAxis = d3.axisLeft().tickFormat(d => `${d}c`);

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};
    const updatedData = data.list;
    // 1. map date to x-position
    // get min and max of date
    const extent = d3.extent(updatedData, d => new Date(d.dt * 1000));
    const xScale = d3
      .scaleTime()
      .domain(extent)
      .range([margin.left, width - margin.right]);

    // 2. map high temp to y-position
    // get min/max of high temp
    const [min, max] = d3.extent(updatedData, d => d.temp.max);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(min, 0), max])
      .range([height - margin.bottom, margin.top]);

    // 3. map avg temp to color
    // get min/max of avg
    const colorExtent = d3
      .extent(updatedData, d => (d.temp.max + d.temp.min) / 2)
      .reverse();
    const colorScale = d3
      .scaleSequential()
      .domain(colorExtent)
      .interpolator(d3.interpolateRdYlBu);

    // array of objects: x, y, height
    const bars = updatedData.map(d => {
      return {
        x: xScale(new Date(d.dt * 1000)),
        y: yScale(d.temp.max),
        height: yScale(d.temp.min) - yScale(d.temp.max),
        fill: colorScale((d.temp.max + d.temp.min) / 2),
        date: new Date(d.dt * 1000)
      };
    });

    return { bars, xScale, yScale };
  }

  componentDidMount() {
    this.xAxis.scale(this.state.xScale).tickValues(
      this.state.bars.map(item => {
        return item.date;
      })
    );
    d3.select(this.refs.xAxis).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }

  render() {
    return (
      <div style={{ margin: "0 auto", display: "block", textAlign: "center" }}>
        <h1>Weather Data for the week</h1>
        <svg
          width={670}
          height={height}
          style={{ margin: "5px", border: "solid 1px black", padding: "5px" }}
        >
          {this.state.bars.map(d => (
            <rect x={d.x} y={d.y} width={2} height={d.height} fill={d.fill} />
          ))}
          <g
            ref="xAxis"
            transform={`translate(0, ${height - margin.bottom})`}
          />
          <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
        </svg>
      </div>
    );
  }
}

export default BarChart;
