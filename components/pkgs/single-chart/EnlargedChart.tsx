import React, { useState, useEffect } from 'react';
import _, { isArray } from 'lodash';
import { Button, Drawer, IconFont, Utils, SingleChart } from '../../index';
import moment from 'moment';
import type { LineChartProps } from './LineChart';
import LinkageTable from './linkageTable';
debugger
const { EventBus } = Utils;
const busInstance = new EventBus();

export const sortCodeEnum = {
  last: 0,
  min: 1,
  max: 2,
  mean: 3,
  std: 4,
  fiftyFiveQuantile: 5,
  seventyFiveQuantile: 6,
  ninetyFiveQuantile: 7,
  ninetyNineQuantile: 8,
};

const EnlargedChart = (
  props: LineChartProps & {
    requestParams?: any;
    onSave?: any;
  }
): JSX.Element => {
  const { title, requestParams, url, request, onSave } = props;
  const [rangeTimeArr, setRangeTimeArr] = useState<any[]>();
  const [propParams, setPropParams] = useState<any>();
  //   const [lastTime, setLastTime] = useState<string>(moment().format('YYYY.MM.DD.hh:mm:ss'));
  const [visible, setVisible] = useState(false);
  const [lineData, setlineData] = useState([]);
  const [sortMetricType, setSortMetricType] = useState<any>();
  const [chartData, setChartData] = useState<any>();
  const [clearFlag, setClearFlag] = useState<number>(0);
  const [curXAxisData, setCurXAxisData] = useState<any>(null);
  const [unitDataObj, setUnitDataObj] = useState<Record<string, any>>();

  const typeEnum = {
    1: 'label',
    2: 'multLine',
    3: 'singleLine',
  };

  const unitEnum = {
    0: '',
    1: 'Byte',
    2: 'MB',
    3: 'MS',
    4: 'S',
    5: '%',
    6: '',
    7: 'NS',
  };

  const valueEnum = {
    1: 'b',
    2: 'mb',
    3: 'ms',
    4: 's',
    6: 'date',
    7: 'ns',
  };

  const unitFormatFn = (val, displayUnit?: string) => {
    return val + unitEnum[displayUnit || unitDataObj.displayUnit];
  };
  const valueFormatFn = (value, baseUnit, displayUnit) => {
    if (!valueEnum[displayUnit]) {
      return value;
    }
    if (valueEnum[displayUnit] === 'mb') {
      return Utils.transBToMB(value);
    }
    return Utils.formatTimeValueByType(value, valueEnum[baseUnit], valueEnum[displayUnit]);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSave = (isClose?: boolean) => {
    const { startTime, endTime } = requestParams;
    const sortTime = curXAxisData ? curXAxisData.timeStampMinute : endTime;
    const ConnectChartsParams = JSON.parse(localStorage.getItem('ConnectChartsParams')) || {};
    ConnectChartsParams[propParams.metricCode] = {
      sortTime,
      sortMetricType,
    };
    localStorage.setItem('ConnectChartsParams', JSON.stringify(ConnectChartsParams));

    onSave({
      dateStrings: [startTime, endTime],
      sortTime,
      sortMetricType,
    });

    isClose && setVisible(false);
  };

  const handleSortChange = (sortObj) => {
    const sortMetricTypeVal = sortCodeEnum[sortObj.columnKey];
    setSortMetricType(sortMetricTypeVal);
    busInstance.emit('singleReload', {
      ...propParams,
      startTime: rangeTimeArr[0],
      endTime: rangeTimeArr[1],
      sortTime: curXAxisData ? curXAxisData.timeStampMinute : rangeTimeArr[1],
      sortMetricType: sortMetricTypeVal,
    });
  };

  // const handleRefresh = () => {
  //   setClearFlag((data) => {
  //     return data + 1;
  //   });
  //   busInstance.emit('singleReload', {
  //     ...propParams,
  //     startTime: rangeTimeArr[0],
  //     endTime: rangeTimeArr[1],
  //     sortMetricType,
  //   });
  // };

  // const timeChange = (val) => {
  //   setRangeTimeArr(val);
  //   setClearFlag((data) => {
  //     return data + 1;
  //   });
  //   busInstance.emit('singleReload', {
  //     ...propParams,
  //     startTime: val[0],
  //     endTime: val[1],
  //     sortMetricType,
  //   });
  // };

  useEffect(() => {
    if (visible && requestParams) {
      const { startTime, endTime, sortMetricType, ...rest } = requestParams;
      setPropParams({
        ...rest,
        topN: 0, // 获取全部的数据
      });
      setRangeTimeArr([startTime, endTime]);
      setSortMetricType(sortMetricType);
      busInstance.emit('singleReload', {
        ...rest,
        topN: 0, // 获取全部的数据
        sortMetricType,
        startTime,
        endTime,
      });
    }
  }, [visible, requestParams]);

  const getTableData = (type, lineColor) => {
    // 通过X轴过滤全部数据
    let arr = [];
    if (isArray(chartData)) {
      // 二维数组
      arr = []
        .concat(...chartData)
        .filter((item) => {
          return item.timeMinute === type;
        })
        .map((i, index) => {
          return {
            ...i,
            color: lineColor[index] || '',
          };
        });
    }
    return arr;
  };

  return (
    <>
      <IconFont
        type="icon-shaixuan"
        onClick={showDrawer}
        style={{
          fontSize: 14,
          border: '0.5px solid #CED4DA',
          borderRadius: 2,
          padding: 2,
        }}
      />
      <Drawer
        width={1080}
        title={title}
        placement="right"
        onClose={onClose}
        visible={visible}
        footer={
          <div
            style={{
              textAlign: 'left',
            }}
          >
            <Button onClick={onClose}>取消</Button>
            <Button onClick={() => handleSave(true)} type="primary" style={{ marginLeft: 10 }}>
              保存
            </Button>
          </div>
        }
      >
        {/* <Space>
          <div className="reload-module">
            <Button type="text" icon={<ReloadOutlined />} onClick={handleRefresh}>
              刷新
            </Button>
            <span className="last-time">上次刷新时间: {lastTime}</span>
          </div>
          <TimeModule timeChange={timeChange} rangeTimeArr={rangeTimeArr} />
        </Space> */}
        {visible && (
          <SingleChart
            chartTypeProp="line"
            wrapStyle={{
              width: '100%',
              height: 300,
            }}
            option={{
              tooltip: {
                formatter: (params) => {
                  let str = '';
                  str += `<div style="font-size: 12px;color: #212529;line-height: 20px; margin-top: 4px; margin-bottom: 4px;">${params[0].axisValue}</div>`;
                  const lineColor = params.map((item) => {
                    str += `<div style="display: flex; min-width: 140px; justify-content: space-between;line-height: 20px;color: #495057;">
                  <div><span style="display:inline-block;margin-right:8px;border-radius:50%;width:6px;height:6px;background-color:${
                    item.color
                  };"></span><span>${item.name}</span></div>
                  <div>${unitFormatFn(item.value)}</div>
                </div>`;
                    const color = item.marker?.split('background-color:')[1]?.slice(0, 7);
                    return color;
                  });
                  setlineData && setlineData(getTableData(params[0]?.axisValue, lineColor));
                  setCurXAxisData({
                    index: params[0]?.dataIndex,
                    value: params[0]?.axisValue,
                    timeStampMinute: params[0]?.data?.timeStampMinute,
                  });
                  return str;
                },
                triggerOn: 'click',
                alwaysShowContent: true,
              },
              yAxis: {
                axisLabel: {
                  formatter: (value) => `${unitFormatFn(value)}`,
                },
              },
              grid: {
                top: 20,
                bottom: 20,
              },
            }}
            eventBus={busInstance}
            url={url}
            request={request}
            resCallback={(res: any) => {
              const { type, baseUnit, displayUnit, lableValue, singleLineChatValue, multiLineChatValue, name } = res;
              if (
                !lableValue &&
                (!singleLineChatValue || singleLineChatValue.length < 1) &&
                (!multiLineChatValue || multiLineChatValue.length < 1)
              ) {
                return null;
              }
              const data =
                type === 3
                  ? singleLineChatValue?.map((item: any) => {
                      return {
                        ...item,
                        timeMinute: moment(item.timeStampMinute).format('HH:mm'),
                        value: valueFormatFn(item.last, baseUnit, displayUnit),
                        last: valueFormatFn(item.last, baseUnit, displayUnit) + unitEnum[displayUnit],
                      };
                    })
                  : multiLineChatValue?.map((item) => {
                      return item.map((el) => {
                        return {
                          ...el,
                          timeMinute: moment(el.timeStampMinute).format('HH:mm'),
                          name: el.device || el.hostName || el.path,
                          value: valueFormatFn(el.last, baseUnit, displayUnit),
                          last: valueFormatFn(el.last, baseUnit, displayUnit) + unitEnum[displayUnit],
                        };
                      });
                    });
              setUnitDataObj({
                baseUnit,
                displayUnit,
              });
              setChartData(data);
              return {
                data,
                type: typeEnum[type],
              };
            }}
            curXAxisData={curXAxisData}
            xAxisCallback={({ type, data }) => {
              if (data) {
                if (type === 'singleLine') {
                  return data?.map((item) => item.timeMinute);
                }
                return data?.[0]?.map((item) => item.timeMinute);
              }
            }}
            seriesCallback={({ data, type }) => {
              if (data) {
                if (type === 'singleLine') {
                  return [
                    {
                      name: data?.[0]?.name,
                      data,
                      symbolSize: 6,
                      symbol: 'circle',
                      showSymbol: false,
                    },
                  ];
                }
                return (
                  data.map((item, index) => {
                    return {
                      name: data[index]?.[0]?.name,
                      data: data[index],
                      symbolSize: 6,
                      symbol: 'circle',
                      showSymbol: false,
                    };
                  }) || []
                );
              }
            }}
          ></SingleChart>
        )}
        {visible && (
          <LinkageTable
            clearFlag={clearFlag}
            dispatchSort={handleSortChange}
            rangeTimeArr={rangeTimeArr}
            requestParams={requestParams}
            lineData={lineData}
          />
        )}
      </Drawer>
    </>
  );
};

export default EnlargedChart;
