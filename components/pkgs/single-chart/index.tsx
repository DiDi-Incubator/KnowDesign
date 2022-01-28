import React from "react";
import LineChart, { LineChartProps } from "./LineChart";
import PieChart, { PieChartProps } from './PieChart';


function Chart(props: (LineChartProps | PieChartProps) & {
  chartType?: 'pie' | 'line'
} ) {
  const { chartType, ...rest } = props;
  return chartType === 'pie' ? <PieChart {...rest}></PieChart> : <LineChart {...rest}></LineChart> ;
}

export default Chart;
