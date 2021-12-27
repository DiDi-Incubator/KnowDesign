import React from "react";
import Chart from "./SingleChart";
import { ChartProps } from './SingleChart';
import LineChart from './LineChart';

function SingleChart (props: ChartProps) {
  return <Chart {...props}></Chart>
}

SingleChart.LineChart = LineChart;

export default SingleChart;