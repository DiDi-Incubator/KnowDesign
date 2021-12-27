import React, { useRef, useEffect, useState } from "react";
import _ from "lodash";
import * as echarts from "echarts";
import { getMergeOption } from "./config";
import { Spin, Empty, Modal, Input } from "../../index";

interface Opts {
  width?: number;
  height?: number;
  theme?: Record<string, any>;
};

export type SingleChartProps = {
  eventName?: any;
  eventBus?: any;
  url?: string;
  request?: Function;
  reqParams?: Record<string, any>,
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
  onUnmount?:  (params?: any) => void;
};

export const SingleChart = (props: SingleChartProps) => {
  const {
    url,
    request,
    reqParams,
    resCallback,
    xAxisCallback,
    yAxisCallback,
    onEvents,
    onMount,
    onUnmount,
    wrapStyle,
    option,
    wrapClassName = "",
    initOpts,
    onResize,
    resizeWait = 1000,
  } = props;

  const [showFullChart, setShowFullChart] = useState<boolean>(false);

  // let fullchart = null;

  // const toolbox = {
  //   show: true,
  //   right: 100,
  //   top: 10,
  //   feature: {
  //     dataZoom: {
  //       yAxisIndex: "none"
  //     },
  //     myFull: {
  //       title: '全屏查看',
  //       icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
  //       onclick: function (e) {
  //         const { toolbox, title, ...rest } = e.getOption();
  //         setShowFullChart(true);
  //         fullchart = echarts.init(document.getElementById('fullChart'));
  //         fullchart.setOption(rest);
  //       }
  //     },
  //   }
  // };

  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const chartRef = useRef(null);
  let chartInstance = null;

  const renderChart = async () => {
    if (!chartData) {
      return;
    }


    const chartType = option?.series?.[0]?.type;
    const xAxisData = xAxisCallback?.(chartData);
    const yAxisData = yAxisCallback?.(chartData);

    const chartOptons = getMergeOption(chartType, { ...option, chartData, xAxisData, yAxisData });
    const renderedInstance = echarts.getInstanceByDom(chartRef.current);
    if (renderedInstance) {
      chartInstance = renderedInstance;
    } else {
      chartInstance = echarts.init(chartRef.current, initOpts?.theme, {
        width: initOpts?.width || undefined,
        height: initOpts?.height || undefined,
      });
    }
    bindEvents(chartInstance, onEvents || {});
    chartInstance.setOption(chartOptons);
    onMount({
      chartInstance,
      chartRef,
    });
  };


  const bindEvents = (instance: any, events: any) => {
    const _bindEvent = (eventName: string, func: Function) => {
      if (typeof eventName === 'string' && typeof func === 'function') {
        instance.on(eventName, (params) => {
          func(params, instance);
        });
      }
    }

    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _bindEvent(eventName, events[eventName]);
      }
    }
  };

  const getChartData = async () => {
    try {
      setLoading(true);
      const res = await request(url, reqParams);
      if (res) {
        const data = resCallback(res);
        setChartData(data);
      }
    } catch (error) {
      console.log(error)
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
    getChartData();
  }, [reqParams]);

  useEffect(() => {
    return () => {
      onUnmount({
        chartInstance,
        chartRef,
      })
    }
  }, []);

  useEffect(() => {
    renderChart();
  }, [chartData]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance && chartInstance.dispose();
    };
  }, [chartData, option]);

  return (
    <Spin spinning={loading}>
      {chartData ? (
        <>
          <div
            ref={chartRef}
            className={wrapClassName}
            style={{
              ...wrapStyle,
              opacity: loading ? 0 : 1,
            }}
          ></div>
          {/* <Modal width="80%" visible={showFullChart} footer={null} onCancel={() => {
            setShowFullChart(false)
            fullchart?.dispose();
          }}>
          <div id="fullChart" style={{
            width: '100%',
            height: '500px'
          }}></div>
          </Modal> */}
        </>
      ) : (
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
