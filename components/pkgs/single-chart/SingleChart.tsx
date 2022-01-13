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

export type ChartProps = {
  title?: string;
  eventName?: any;
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

export const Chart = (props: ChartProps) => {
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

    eventBus?.on('chartReload', (params) => {
      getChartData(params);
    });

    eventBus?.on('singleReload', (params) => {
      getChartData(params);
    });

    eventBus?.on('chartResize', () => {
      setLoading(true);
      setTimeout(() => {
        chartInstance.resize();
        setLoading(false);
      }, 0);
    });
  };

  const getOptions = () => {
    const chartType = option?.series?.[0]?.type;
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

  const renderEnlargedChart = () => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
      setVisible(true);
      setTimeout(() => {
        const largedChart = echarts.init(document.getElementById('largedChart'))
        const option = getOptions();
        largedChart.setOption(option);
      });
    };
    const onClose = () => {
      setVisible(false);
    };

    return  <>
      <FullscreenOutlined
        onClick={showDrawer}
      />
      <Drawer
        title={title}
        placement="right"
        size="large"
        onClose={onClose}
        visible={visible}
      >
        {visible && <div
          style={{
            zIndex: 999999,
            ...wrapStyle,
          }}
          id="largedChart"
        ></div>}
      </Drawer>
    </>
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
    eventBus?.on('chartInit', (params) => {
      getChartData(params);
    });

    return () => {
      onUnmount?.({
        chartInstance,
        chartRef,
      });
    };
  });

  useEffect(() => {
    renderChart();
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

export default Chart;
