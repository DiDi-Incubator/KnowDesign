import React, { useRef, useEffect } from 'react';
import _ from 'lodash';
import * as echarts from 'echarts';
import { getLineOption, getPieOption, getLineData, getPieData } from './config';
import { Spin, Empty } from 'knowdesign';
interface Opts {
  width?: number;
  height?: number;
  theme?: Record<string, any>;
}

interface Props {
  wrapClassName?: string;
  wrapStyle?: React.CSSProperties;
  lineClassName?: string;
  lineStyle?: React.CSSProperties;
  pieClassName?: string;
  pieStyle?: React.CSSProperties;
  lineOption: echarts.EChartsOption;
  pieOption: echarts.EChartsOption;
  lineInitOpts?: Opts;
  pieInitOpts?: Opts;
  chartData: any;
  resizeWait?: number;
  loading?: boolean;
  onResize?: (params: any) => void;
  onUpdateAxisPointer?: (params: any) => void;
}

const LineConnectPieChart: React.FC<Props> = ({
  wrapClassName = '',
  wrapStyle,
  lineClassName = '',
  lineStyle,
  pieClassName = '',
  pieStyle,
  lineOption,
  pieOption,
  lineInitOpts,
  pieInitOpts,
  chartData,
  resizeWait = 200,
  loading,
  onResize,
  onUpdateAxisPointer,
}) => {
  const lineChartRef = useRef(null);
  let lineChartInstance = null;

  const pieChartRef = useRef(null);
  let pieChartInstance = null;

  const renderLineChart = () => {
    if (!chartData || chartData.length < 1) {
      return;
    }
    const renderedInstance = echarts.getInstanceByDom(lineChartRef.current);
    if (renderedInstance) {
      lineChartInstance = renderedInstance;
    } else {
      lineChartInstance = echarts.init(lineChartRef.current, lineInitOpts?.theme, {
        width: lineInitOpts?.width || undefined,
        height: lineInitOpts?.height || undefined,
      });
    }

    lineChartInstance.setOption(getLineOption(lineOption, chartData));
    lineChartInstance.on('updateAxisPointer', function (event: any) {
      if (onUpdateAxisPointer) {
        onUpdateAxisPointer({
          lineChartInstance,
          pieChartInstance,
        });
      } else {
        if (!event.dataIndex) {
          return;
        }
        const currLineItemData = getLineData(chartData);
        const pieData = currLineItemData[event.dataIndex]?.list;
        if (pieData) {
          pieChartInstance.setOption({
            series: [
              {
                data: pieData,
              },
            ],
          });
        }
      }
    });
  };

  const renderPieChart = () => {
    if (!chartData || chartData.length < 1) {
      return;
    }
    const renderedInstance = echarts.getInstanceByDom(pieChartRef.current);
    if (renderedInstance) {
      pieChartInstance = renderedInstance;
    } else {
      pieChartInstance = echarts.init(pieChartRef.current, lineInitOpts?.theme, {
        width: pieInitOpts?.width || undefined,
        height: pieInitOpts?.height || undefined,
      });
    }
    pieChartInstance.setOption(getPieOption(pieOption, chartData));
  };

  const renderEmpty = () => {
    return (
      <div
        style={{
          ...wrapStyle,
          position: 'relative',
          opacity: loading ? 0 : 1,
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    renderLineChart();
    renderPieChart();

    const resize = _.throttle(() => {
      setTimeout(() => {
        lineChartInstance?.resize({
          width: lineInitOpts?.width || undefined,
          height: lineInitOpts?.height || undefined,
        });
        pieChartInstance?.resize({
          width: pieInitOpts?.width || undefined,
          height: pieInitOpts?.height || undefined,
        });
        onResize?.({ lineChartInstance, pieChartInstance });
      }, 0);
    }, resizeWait);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      lineChartInstance?.dispose();
      pieChartInstance?.dispose();
    };
  }, [chartData]);

  return (
    <Spin spinning={loading}>
      {chartData && chartData.length > 0 ? (
        <div
          className={`line-connect-pie-chart-box ${wrapClassName}`}
          style={{
            ...wrapStyle,
            opacity: loading ? 0 : 1,
          }}
        >
          <div
            ref={lineChartRef}
            className={`line-chart-box ${lineClassName}`}
            style={lineStyle}
          ></div>
          <div ref={pieChartRef} className={`pie-chart-box ${pieClassName}`} style={pieStyle}></div>
        </div>
      ) : (
        renderEmpty()
      )}
    </Spin>
  );
};

export default LineConnectPieChart;
