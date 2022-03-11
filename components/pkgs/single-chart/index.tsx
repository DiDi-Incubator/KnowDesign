import React from 'react';
import LineChart, { LineChartProps } from './LineChart';
import PieChart, { PieChartProps } from './PieChart';
function Chart(
  props: (LineChartProps & PieChartProps & {
    chartTypeProp: "line" | "pie"
  })
) {
  const { chartTypeProp, ...rest } = props;
  return chartTypeProp === 'line' ? <LineChart {...rest} /> : <PieChart {...rest} />
};

export default Chart;
