import React from "react";
import * as d3 from "d3";
import { getDate, convertTemp } from "../utils/helpers";

const width = 325;
const height = 200;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: []
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const width = 325;
    const height = 200;
    const { data } = nextProps;

    if (!data) return {};

    // x axis using the dates
    // get min/max of date
    const timeDomain = d3.extent(data.list, d => new Date(d.dt * 1000));
    const xScale = d3
      .scaleTime()
      .domain(timeDomain)
      .range([0, width]);
    // y axis using the high temp
    const tempMax = d3.max(data.list, d => d.temp.max);
    const [minTempMax, maxTempMax] = d3.extent(data.list, d => d.temp.max);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(minTempMax, 0), maxTempMax])
      .range([height, 0]);

    const colorExtent = d3.extent(data.list, d => d.temp.day);
    const colorScale = d3
      .scaleSequential()
      .domain(colorExtent)
      .interpolator(d3.interpolateRdYlBu);

    const bars = data.list.map(d => {
      const y1 = yScale(d.temp.max);
      const y2 = yScale(d.temp.min);
      return {
        x: xScale(new Date(d.dt * 1000)),
        y: y1,
        height: y2 - y1,
        fill: colorScale(d.temp.day)
      };
    });
    return { bars };
  }
  render() {
    return (
      <div>
        <svg width={width} height={height}>
          {this.state.bars.map(d => {
            return (
              <rect
                key={d.dt}
                x={d.x}
                y={d.y}
                width={20}
                height={d.height}
                fill={d.fill}
              />
            );
          })}
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
