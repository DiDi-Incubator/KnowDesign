import React, { useEffect, useState, useRef } from "react";
import ProTable from "../pro-table";
import * as echarts from "echarts";
import _ from "lodash";
import classnames from "classnames";
import "./style.less";
import { getPieOption } from "./config";
import { Empty, Spin } from "antd";

interface Opts {
  width?: number;
  height?: number;
  theme?: Record<string, any>;
}

interface ITablePieChartProps {
  layout?: "vertical" | "horizontal";
  tableProps: any;
  chartProps: any;
  hightlightIndex: number;
  wrapClassName?: string;
  tableClassName?: string;
  chartClassName?: string;
  wrapStyle?: React.CSSProperties;
  tableStyle?: React.CSSProperties;
  chartStyle?: React.CSSProperties;
  updateHighlighItem?: (params?: any) => void;
  onResize?: (params?: any) => void;
  chartData?: any;
  chartLoading?: boolean;
  tableData?: [];
  initChartOpts?: Opts;
  resizeWait?: number;
}

const TablePieChart: React.FC<ITablePieChartProps> = ({
  tableProps,
  chartProps: option,
  layout = "horizontal",
  updateHighlighItem,
  chartData,
  tableData,
  wrapClassName,
  tableClassName,
  chartClassName,
  wrapStyle,
  tableStyle,
  chartStyle,
  chartLoading,
  initChartOpts,
  onResize,
  hightlightIndex,
  resizeWait = 1000,
}) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  const [dataSource, setDataSource] = useState<any>(tableData);

  const renderChart = () => {
    if (!chartData || chartData.length < 1) {
      return;
    }

    const renderedInstance = echarts.getInstanceByDom(chartRef.current);
    if (renderedInstance) {
      chartInstance = renderedInstance;
      chartInstance.setOption(getPieOption(option, chartData));
    } else {
      chartInstance = echarts.init(chartRef.current, initChartOpts?.theme, {
        width: initChartOpts?.width || undefined,
        height: initChartOpts?.height || undefined,
      });

      chartInstance.setOption(getPieOption(option, chartData));

      chartInstance.off("click");
      chartInstance.on("click", (e) => {
        chartInstance.dispatchAction({
          type: "downplay",
          seriesIndex: e.seriesIndex,
        });
        chartInstance.dispatchAction({
          type: "highlight",
          dataIndex: e.dataIndex,
        });
        updateHighlighItem(e.data);
      });
      setTimeout(() => {
        chartInstance.dispatchAction({
          type: "highlight",
          dataIndex: hightlightIndex,
        });
      }, 0);
    }
  };

  const renderEmpty = () => {
    return (
      <div
        style={{
          ...wrapStyle,
          position: "relative",
          opacity: chartLoading ? 0 : 1,
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

  const renderChartDom = () => {
    return (
      <div
        className={classnames("pie-chart-box", chartClassName)}
        ref={chartRef}
        style={chartStyle}
      ></div>
    );
  };

  useEffect(() => {
    renderChart();
    const resize = _.throttle(() => {
      chartInstance?.resize();
      onResize?.(chartInstance);
    }, resizeWait);

    window.addEventListener("resize", resize);
    return () => {
      chartInstance && chartInstance.dispose();
      window.removeEventListener("resize", resize);
    };
  }, [chartData]);

  useEffect(() => {
    setDataSource(tableData);
  }, [tableData]);

  return (
    <div
      className={classnames("pie-table-box", {
        verticalLayout: layout === "vertical",
        wrapClassName,
      })}
      style={wrapStyle}
    >
      <div
        className={classnames("table-box", tableClassName)}
        style={tableStyle}
      >
        <ProTable
           tableProps={{
            ...tableProps,
            dataSource,
          }}
        />
      </div>
      {chartLoading ? (
        <Spin spinning={chartLoading}>
          <div style={chartStyle}></div>
        </Spin>
      ) : chartData && chartData.length > 0 ? (
        renderChartDom()
      ) : (
        renderEmpty()
      )}
    </div>
  );
};
export default TablePieChart;
