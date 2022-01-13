import React, { useEffect, useState } from "react";
import SingleChart, { SingleChartProps } from "./SingleChart";

export interface lineChartProps extends SingleChartProps {
  connectEventName?: string;
}

const LineChart = (props: lineChartProps) => {
  const { eventBus, connectEventName } = props;
  let handleMouseMove: Function;
  let handleMouseOut: Function = () => {
    eventBus?.emit("mouseout");
  };

  const onMount = ({ chartInstance, chartRef }) => {
    
    handleMouseMove = (e: any) => {
      let result = chartInstance?.convertFromPixel(
        {
          seriesIndex: 0,
          xAxisIndex: 0,
        },
        [e.offsetX, e.offsetY]
      );
      eventBus?.emit(connectEventName, {
        result,
      });
    };

    eventBus?.on(connectEventName, ({ result }) => {
      if (result) {
        chartInstance?.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: result[0],
        });
        chartInstance?.setOption({
          tooltip: {
            axisPointer: {
              type: "line",
            },
          },
        });
      }
    });



    chartRef?.current?.addEventListener("mousemove", handleMouseMove);

    eventBus?.on("mouseout", () => {
      chartInstance?.dispatchAction({
        type: "hideTip",
      });

      chartInstance?.setOption({
        tooltip: {
          axisPointer: {
            type: "none",
          },
        },
      });
    });

    chartRef?.current?.addEventListener("mouseout", handleMouseOut);
  };

  const onUnmount = ({ chartRef }) => {
    chartRef?.current?.removeEventListener("mousemove", handleMouseMove);
    chartRef?.current?.removeEventListener("mouseout", handleMouseOut);
  };
  return <SingleChart chartType="line" {...props} onMount={onMount} onUnmount={onUnmount} />;
};

export default LineChart;
