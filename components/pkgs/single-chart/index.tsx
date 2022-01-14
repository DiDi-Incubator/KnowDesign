import React from "react";
import { SingleChartProps } from "./SingleChart";
import { chartTypeEnum } from './config';
import LineChart from "./LineChart";
import PieChart from './PieChart';

function Chart(props: SingleChartProps) {
  const { chartType, ...rest } = props;
  return chartType === chartTypeEnum.pie ? <PieChart {...rest}></PieChart> : <LineChart {...rest}></LineChart> ;
}

export default Chart;
