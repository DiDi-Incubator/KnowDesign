import React, { useEffect, useState } from "react";
import SingleChart, { SingleChartProps } from "./SingleChart";

const PieChart = (props: SingleChartProps) => {
  return <SingleChart {...props} chartType="pie"/>;
};

export default PieChart;
