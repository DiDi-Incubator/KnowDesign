import React, { useRef, useEffect, useState } from 'react';
import _ from 'lodash';
import * as echarts from 'echarts';
import { getMergeOption, chartTypeEnum } from './config';
import { Spin, Empty, Utils } from 'knowdesign';

const { post, request } = Utils;

interface Opts {
  width?: number;
  height?: number;
  theme?: Record<string, any>;
}

export type PieChartProps = {
  title?: string;
  eventBus?: any;
  url?: string;
  request?: Function;
  requestMethod?: 'get' | 'post';
  propsParams?: any;
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
  propChartData?: any;
};

export const SingleChart = (props: PieChartProps) => {
  const {
    title,
    url,
    propsParams,
    request,
    reqCallback,
    resCallback,
    xAxisCallback,
    legendCallback,
    seriesCallback,
    eventBus,
    onEvents,
    wrapStyle,
    option,
    wrapClassName = '',
    initOpts,
    onResize,
    resizeWait = 1000,
    propChartData = null,
    requestMethod,
  } = props;

  const [chartData, setChartData] = useState<Record<string, any>>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
    }

    bindEvents(chartInstance, onEvents || {});

    chartInstance.setOption(chartOptions);
  };

  const getOptions = () => {
    const xAxisData = xAxisCallback?.(chartData);
    const legendData = legendCallback?.(chartData);
    const seriesData = seriesCallback ? seriesCallback(chartData) : chartData;
    const chartOptons = getMergeOption(chartTypeEnum.pie, {
      ...option,
      xAxisData,
      legendData,
      seriesData,
    });

    return chartOptons;
  };

  const renderHeader = () => {
    return (
      <div className="single-chart-header">
        <div className="header-title">{title}</div>
        <div className="header-right"></div>
      </div>
    );
  };

  const bindEvents = (instance: any, events: any) => {
    const _bindEvent = (eventName: string, func: Function) => {
      if (typeof eventName === 'string' && typeof func === 'function') {
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

  const getChartData = async (variableParams?: any) => {
    if (propChartData) {
      return;
    }
    try {
      setLoading(true);
      const mergeParams = {
        ...propsParams,
        ...variableParams,
      };
      const params = reqCallback ? reqCallback(mergeParams) : mergeParams;
      const res = requestMethod === 'post' ? await post(url, params) : request(url, { params });
      // const res = await request(url, params);
      if (res) {
        const data = resCallback ? resCallback(res) : res;
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

  const handleChartResize = () => {
    setLoading(true);
    setTimeout(() => {
      chartInstance?.resize();
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getChartData();
  }, []);

  useEffect(() => {
    (handleChartResize as any).type = title;
    eventBus?.on('chartResize', handleChartResize);
    return () => {
      eventBus?.offByType('chartResize', handleChartResize);
    };
  });

  useEffect(() => {
    renderChart();
  }, [chartData]);

  useEffect(() => {
    if (propChartData) {
      setChartData(propChartData);
    }
  }, [propChartData]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      // chartInstance && chartInstance.dispose();
    };
  }, [chartData, option]);

  return (
    <Spin spinning={loading}>
      {chartData ? (
        <div
          className="single-chart-container"
          style={{
            opacity: loading ? 0 : 1,
          }}
        >
          {renderHeader()}
          <div ref={chartRef} className={wrapClassName} style={wrapStyle}></div>
        </div>
      ) : (
        <div
          className="single-chart-container"
          style={{
            ...wrapStyle,
            position: 'relative',
            opacity: loading ? 0 : 1,
          }}
        >
          {renderHeader()}
          <Empty
            description="数据为空~"
            image={Empty.PRESENTED_IMAGE_CUSTOM}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
    </Spin>
  );
};

export default SingleChart;
