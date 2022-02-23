import React, { useRef, useEffect, useState } from "react";
import _, { isArray } from "lodash";
import * as echarts from "echarts";
import { getMergeOption, chartTypeEnum } from "./config";
import { Spin, Empty } from "../../index";
// import EnlargedChart from './EnlargedChart';
// import { post, request } from '../../utils/request'
import './style/index.less'

interface Opts {
  width?: number;
  height?: number;
  theme?: Record<string, any>;
}

export type LineChartProps = {
  key?: any;
  title?: string;
  eventBus?: any;
  url?: string;
  request?: Function;
  requestMethod?: "get" | "post";
  propParams?: any;
  propChartData?: any;
  reqCallback?: Function;
  resCallback?: Function;
  xAxisCallback?: Function;
  legendCallback?: Function;
  seriesCallback?: Function;
  option?: any;
  wrapStyle: React.CSSProperties;
  wrapClassName?: string;
  initOpts?: Opts;
  onResize?: (params: any) => void;
  resizeWait?: number;
  onEvents?: Record<string, Function>;
  showLargeChart?: boolean;
  connectEventName?: string;
  renderRightHeader?: Function;
  curXAxisData?: any;
};

export const LineChart = (props: LineChartProps) => {
  const {
    key,
    title,
    url,
    propParams,
    requestMethod,
    reqCallback,
    resCallback,
    xAxisCallback,
    legendCallback,
    seriesCallback,
    eventBus,
    onEvents,
    wrapStyle,
    option,
    wrapClassName = "",
    initOpts,
    onResize,
    resizeWait = 1000,
    connectEventName = "",
    propChartData = null,
    renderRightHeader,
    curXAxisData
  } = props;

  const [chartData, setChartData] = useState<Record<string, any>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [requestParams, setRequestParams] = useState<any>(null);
  const chartRef = useRef(null);
  let [chartInstance, setChartInstance] = useState(null)
  // let chartInstance = null;

  let handleMouseMove: Function;
  let handleMouseOut: Function;

  const onRegisterConnect = ({ chartInstance, chartRef }) => {
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

    handleMouseOut = () => {
      eventBus?.emit("mouseout");
    }

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

  const onDestroyConnect = ({ chartRef }) => {
    chartRef?.current?.removeEventListener("mousemove", handleMouseMove);
    chartRef?.current?.removeEventListener("mouseout", handleMouseOut);
  };

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
    setChartInstance(chartInstance);
    connectEventName && onRegisterConnect?.({
      chartInstance,
      chartRef,
    });
  };

  const getOptions = () => {
    const xAxisData = xAxisCallback?.(chartData);
    const legendData = legendCallback?.(chartData);
    const seriesData = seriesCallback ? seriesCallback(chartData) : chartData;
    const chartOptons = getMergeOption(chartTypeEnum.line, {
      ...option,
      xAxisData,
      legendData,
      seriesData,
    });

    return chartOptons;
  };

  const renderHeader = () => {
    // const { showLargeChart, ...rest } = props;
    return <div className="single-chart-header">
      <div className="header-title">{title}</div>
      <div className="header-right">
        {renderRightHeader?.()}
        {/* {showLargeChart && <EnlargedChart onSave={(arg) => {
         getChartData(arg)
        }} requestParams={requestParams} {...rest}></EnlargedChart>} */}
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

  const handleData = (variableParams, isClearLocalSort) => {
    if(isClearLocalSort && connectEventName) {  
      localStorage.removeItem("$ConnectChartsSortTypeData");
    }
    getChartData(variableParams);
  }

  const getChartData = async (variableParams?: any) => {
     if(propChartData) {
      return;
    };    
    try {
      setLoading(true);
      const mergeParams = {
        ...propParams,
        ...variableParams
      }
      // setRequestParams(mergeParams);
      const params = reqCallback ? reqCallback(mergeParams) : mergeParams;
      // const res = requestMethod === "post" ? await post(url, params) : request(url, { params });
      const res = await props.request?.(url, params);
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
    eventBus?.on('singleReload', (params) => handleData(params, false));
    return () => {
      eventBus?.removeAll('singleReload');
      connectEventName && onDestroyConnect?.({
        chartRef,
      });
    };
  }, [eventBus]);

  useEffect(() => {
    eventBus?.on('chartResize', () => {
      setLoading(true);
      setTimeout(() => {
        chartInstance?.resize();
        setLoading(false);
      }, 500);
    });
  })

  useEffect(() => {
    renderChart();
  }, [chartData]);

  useEffect(() => {
    if(curXAxisData) {
      const handle = () => {
        eventBus?.emit('stayCurXAxis')
      };
      chartRef?.current?.addEventListener("mouseout", handle);
  
      eventBus?.on("stayCurXAxis", () => {
        setTimeout(() => {
        }, 100);
        chartInstance?.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: curXAxisData.index,
        });
        chartInstance?.setOption({
          tooltip: {
            axisPointer: {
              type: "line",
            },
          },
        });
      });
      return () => {
        chartRef?.current?.removeEventListener("mouseout", handle);
        eventBus?.removeAll('stayCurXAxis')
      };
    };
  }, [chartInstance, chartRef, curXAxisData]);

  useEffect(() => {
    if(propChartData) {
      setChartData(propChartData);
    };  
  }, [propChartData]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chartData, option]);

  return (
    <Spin spinning={loading}>
      {chartData ? (
        <div style={{
            ...wrapStyle,
            position: "relative",
            width: "100%",
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

export default LineChart;