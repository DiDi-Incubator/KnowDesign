import React, { useRef, useEffect, useState } from "react";
import _ from "lodash";
import * as echarts from "echarts";
import { getMergeOption, chartTypeEnum } from "./config";
import { Spin, Empty, Drawer } from "../../index";
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import EnlargedChart from './EnlargedChart';

import './style/index.less'

interface Opts {
  width?: number;
  height?: number;
  theme?: Record<string, any>;
}

export type SingleChartProps = {
  chartType?: string;
  title?: string;
  eventBus?: any;
  url?: string;
  request?: Function;
  reqCallback?: Function;
  resCallback?: Function;
  xAxisCallback?: Function;
  yAxisCallback?: Function;
  option: any;
  wrapStyle: React.CSSProperties;
  wrapClassName?: string;
  initOpts?: Opts;
  onResize?: (params: any) => void;
  resizeWait?: number;
  onEvents?: Record<string, Function>;
  onMount?: (params?: any) => void;
  onUnmount?: (params?: any) => void;
  showLargeChart?: boolean;
  code?: any;
};

export const SingleChart = (props: SingleChartProps) => {
  const {
    title: titleVal,
    url,
    request,
    reqCallback,
    resCallback,
    xAxisCallback,
    yAxisCallback,
    eventBus,
    onEvents,
    onMount,
    onUnmount,
    wrapStyle,
    option,
    wrapClassName = "",
    initOpts,
    onResize,
    resizeWait = 1000,
    showLargeChart = false,
    chartType,
    code
  } = props;

  const [chartData, setChartData] = useState<Record<string, any>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(titleVal);
  const chartRef = useRef(null);
  let chartInstance = null;

  const renderChart = async () => {
    if (!chartData) {
      return;
    }

    const chartOptions = getOptions();
    const renderedInstance = echarts.getInstanceByDom(chartRef.current);
    if (renderedInstance) {
      chartInstance = renderedInstance;
    } else {
      chartInstance = echarts.init(chartRef.current, initOpts?.theme, {
        width: initOpts?.width || undefined,
        height: initOpts?.height || undefined,
      });
    };

    bindEvents(chartInstance, onEvents || {});

    chartInstance.setOption(chartOptions);
    onMount?.({
      chartInstance,
      chartRef,
    });

    // eventBus?.on('chartReload', (params) => {
    //   getChartData(params);
    // });

    // eventBus?.on('singleReload', (params) => {
    //   getChartData(params);
    // });

    eventBus?.on('chartResize', () => {
      setLoading(true);
      setTimeout(() => {
        chartInstance.resize();
        setLoading(false);
      }, 0);
    });
  };

  const getOptions = () => {
    const xAxisData = xAxisCallback?.(chartData);
    const yAxisData = yAxisCallback?.(chartData);

    const chartOptons = getMergeOption(chartType, {
      ...option,
      chartData,
      xAxisData,
      yAxisData,
    });

    return chartOptons;
  };

  const renderHeader = () => {
    return <div className="single-chart-header">
      <div className="header-title">{code}</div>
      <div className="header-right">
        {showLargeChart && <EnlargedChart {...props}></EnlargedChart>}
      </div>
    </div>
  };

  const bindEvents = (instance: any, events: any) => {
    const _bindEvent = (eventName: string, func: Function) => {
      if (typeof eventName === "string" && typeof func === "function") {
        instance.on(eventName, (params) => {
          func(params, instance);
        });
      }
    };

    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _bindEvent(eventName, events[eventName]);
      }
    }
  };

  const getChartData = async (reqParams) => {
    try {
      setLoading(true);
      const params = reqCallback ? reqCallback(reqParams) : reqParams;
      const res = await request(url, params);
      
      if (res) {
        const data = resCallback ? resCallback(res): res;
        setChartData(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResize = _.throttle(() => {
    chartInstance?.resize({
      width: initOpts?.width || undefined,
      height: initOpts?.height || undefined,
    });
    onResize?.(chartInstance);
  }, resizeWait);

  useEffect(() => {
    return () => {
      onUnmount?.({
        chartInstance,
        chartRef,
      });
    };
  });

  useEffect(() => {
    renderChart();

    eventBus?.on('chartInit', (params) => {
      getChartData(params);
    });

    eventBus?.on('chartReload', (params) => {
      getChartData(params);
    });

    eventBus?.on('singleReload', (params) => {
      getChartData(params);
    });
    
  }, [chartData]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      // chartInstance && chartInstance.dispose();
    };
  }, [chartData, option]);

  return (
    <Spin spinning={loading}>
      {chartData ? (
        <div className="single-chart-container" style={{
          opacity: loading ? 0 : 1,
        }}>
          {renderHeader()}
          <div
            ref={chartRef}
            className={wrapClassName}
            style={wrapStyle}
          ></div>
        </div>
      ) : (
        <div
          style={{
            ...wrapStyle,
            position: "relative",
            opacity: loading ? 0 : 1,
          }}
        >
          {renderHeader()}
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
