export const getMergeOption = (chartType: string, opiton: any): any => {
  return mergeOptionMap[chartType](opiton);
};

export const getLineOption = (config: any) => {
  const { title, tooltip, xAxis, yAxis, dataZoom, series, ...rest } = config;
  const defaultLineSeriesItem =    {
    type: 'line',
    smooth: true,
    seriesLayoutBy: 'row',
    emphasis: { focus: 'series' },
    animation: true,
    animationDuration: 1000,
    animationEasing: 'linear',
    animationDurationUpdate: 300,
    animationEasingUpdate: 'linear',
  }
  return {
    title: {
      show: true,
      textStyle: {
        rich: {
          titleIcon: {
            width: 4,
            height: 4,
            backgroundColor: '#4E72FF',
            borderRadius: 50,
          },
          titleText: {
            fontSize: 14,
            fontWeight: 'bolder',
            padding: [0, 8, 0, 4],
            color: '#374053',
          },
        },
      },
      ...title,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      borderColor: '#1473FF',
      ...tooltip,
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#EBEDEF',
          fontSize: 12,
        },
      },
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#919AAC',
        },
      },
      axisTick: {
        alignWithLabel: true, //坐标值是否在刻度中间
      },
      ...xAxis,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#919AAC',
        },
      },
      ...yAxis,
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        ...dataZoom?.[0],
      },
    ],
    series: series.map((item) => {
      return {
        ...defaultLineSeriesItem,
        ...item,
      }
    }),
    ...rest,
  };
};

export const getPieOption = (config) => {
  const { legend, series, ...rest } = config;
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
        type: 'pie',
        // radius: 50,
        animation: true,
        ...series?.[0],
      },
    ],
    ...rest,
  };
};

const mergeOptionMap = {
  pie: getPieOption,
  line: getLineOption,
};
