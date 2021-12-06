import React, { useRef, useEffect, useState } from "react";
import _ from "lodash";
import * as echarts from "echarts";
import { getMergeOption } from "./config";
import { Spin, Empty } from "antd";
interface Opts {
  width?: number;
  height?: number;
  theme?: Record<string, any>;
}

interface Props {
  option: any;
  wrapStyle: React.CSSProperties;
  wrapClassName?: string;
  initOpts?: Opts;
  onResize?: (params: any) => void;
  resizeWait?: number;
  loading?: boolean;
}

export const SingleChart = (props: Props) => {
  const {
    wrapStyle,
    option,
    wrapClassName = "",
    initOpts,
    onResize,
    resizeWait = 1000,
    loading,
  } = props;
  const chartRef = useRef(null);
  let chartInstance = null;

  const renderChart = () => {
    if (!option || option?.series?.[0]?.data?.length < 1) {
      return;
    }
    const chartType = option?.series?.[0]?.type;
    const chartOptons = getMergeOption(chartType, option);
    const renderedInstance = echarts.getInstanceByDom(chartRef.current);
    if (renderedInstance) {
      chartInstance = renderedInstance;
    } else {
      chartInstance = echarts.init(chartRef.current, initOpts?.theme, {
        width: initOpts?.width || undefined,
        height: initOpts?.height || undefined,
      });
    }
    chartInstance.setOption(chartOptons);
  };

  const renderEmpty = () => {
    return (
      <div
        style={{
          ...wrapStyle,
          position: "relative",
          opacity: loading ? 0 : 1,
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  };

  const handleResize = _.throttle(() => {
    chartInstance?.resize({
      width: initOpts?.width || undefined,
      height: initOpts?.height || undefined,
    });
    onResize?.(chartInstance);
  }, resizeWait);

  useEffect(() => {
    renderChart();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance && chartInstance.dispose();
    };
  }, [option]);

  return (
    <Spin spinning={loading}>
      {option?.series?.[0]?.data?.length > 0 ? (
        <div
          ref={chartRef}
          className={wrapClassName}
          style={{
            ...wrapStyle,
            opacity: loading ? 0 : 1,
          }}
        ></div>
      ) : (
        // renderEmpty()
        <div
          style={{
            ...wrapStyle,
            position: "relative",
            opacity: loading ? 0 : 1,
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
    </Spin>
  );
};

export default SingleChart;
