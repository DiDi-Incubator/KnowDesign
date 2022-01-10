import React, { useEffect, useState } from "react";
import SingleChart from "./SingleChart";
import { ChartProps } from "./SingleChart";

const LineChart = (props: ChartProps) => {
  const { eventBus, eventName } = props;
  let handleMouseMove: Function;
  let handleMouseOut: Function = () => {
    eventBus?.emit("mouseout");
  };

  const onMount = ({ chartInstance, chartRef }) => {
    console.log('line mount');
    
    handleMouseMove = (e: any) => {
      let result = chartInstance?.convertFromPixel(
        {
          seriesIndex: 0,
          xAxisIndex: 0,
        },
        [e.offsetX, e.offsetY]
      );
      eventBus?.emit(eventName, {
        result,
      });
    };

    eventBus?.on(eventName, ({ result }) => {
      debugger
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
  // onMount={onMount} onUnmount={onUnmount}
  return <SingleChart {...props}    />;
};

export default LineChart;
