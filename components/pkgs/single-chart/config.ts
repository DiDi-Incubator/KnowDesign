export const getMergeOption = (chartType: string, opiton: any): any => {
  return mergeOptionMap[chartType](opiton);
};
export const lineColor = ['#1473FF', '#34C38F', '#F1B44C', '#4A5A69', '#F46A6A', "#50A5F1"];

export const getLineOption = (config: any) => {
  const { title, tooltip, grid, xAxis, yAxis, dataZoom, series, legend, chartData, xAxisData, legendData, seriesData, color: colorVal, ...rest } = config;
  const color = lineColor;
  const defaultLineSeriesItem = {
    smooth: false,
    seriesLayoutBy: 'row',
    emphasis: { focus: 'series' },
    animation: true,
    animationDuration: 1000,
    animationEasing: 'linear',
    animationDurationUpdate: 300,
    animationEasingUpdate: 'linear',
    symbolSize: 6,
    symbol: 'circle',
    showSymbol: false,
  }
  return {
    title: {
      show: true,
      ...title,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      textStyle: tooltip ? null : {
        color: "#495057",
        fontSize: 12,
        fontWeight: 'normal'
      },
      axisPointer: {
        lineStyle: {
          color: '#CED4DA',
          width: 1,
          type: 'solid',
        },
        type: 'line',
      },
      extraCssText: "box-shadow: 0 2px 12px 0 rgba(31,50,82,0.18); border-radius: 2px;",
      ...tooltip,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#DCDFE6',
          fontSize: 12,
        },
      },
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#ADB5BD',
        },
      },
      axisTick: {
        alignWithLabel: true, //坐标值是否在刻度中间
      },
      ...xAxis,
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 12,
        color: '#ADB5BD',
        ...yAxis?.axisLabel
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 2,
          type: 'dotted',
          color: ['#E4E7ED'],
        },
      },
      ...yAxis,
    },
    color: colorVal || color,
    grid: {
      left: 24,
      right: 100,
      bottom: 24,
      containLabel: true,
      ...grid
    },
    legend: {
      type: 'scroll',
      orient: "vertical",
      right: -24,
      top: 52,
      icon: "rect",
      itemHeight: 2,
      itemWidth: 12,
      textStyle: {
        width: 86,
        overflow: "truncate",
        ellipsis: "...",
      },
      tooltip: {
        show: true,
      },
      data: legendData,
      ...legend
    },
    series: seriesData.map(item => {
      return {
        ...defaultLineSeriesItem,
        ...item,
        type: 'line',
      }
    }),
    ...rest,
  };
};

export const getPieOption = (config) => {
  const { legend, series, seriesData, ...rest } = config;
  return {
    legend: {
      left: 'center',
      itemWidth: 6,
      itemHeight: 6,
      icon: 'circle',
      textStyle: {
        color: '#A8ADBD',
      },
      ...legend,
    },
    series: [
      {
        ...series?.[0],
        type: 'pie',
        animation: true,
        data: seriesData
      },
    ],
    ...rest,
  };
};

export const chartTypeEnum = {
  pie: 'pie',
  line: 'line'
}

const mergeOptionMap = {
  [chartTypeEnum.pie]: getPieOption,
  [chartTypeEnum.line]: getLineOption,
};
