import React, { useState, useEffect } from 'react';
import _, { isArray } from 'lodash';
import { FullscreenOutlined, ReloadOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
import { Input, Button, Select, Radio, Space, Drawer, IconFont } from '../../index';
import moment from 'moment';
import TimeModule from '../chart-container/TimeModule';
import { Utils } from '../../utils';
import type { LineChartProps } from './LineChart';
import LinkageTable from './linkageTable';
import { eventBus } from '../chart-container/index';
const { EventBus } = Utils;
let busInstance = new EventBus();

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
) => {
  const { title, requestParams, url, request, onSave } = props;
  const [rangeTimeArr, setRangeTimeArr] = useState<any[]>();
  const [propParams, setPropParams] = useState<any>();
  const [lastTime, setLastTime] = useState<string>(moment().format('YYYY.MM.DD.hh:mm:ss'));
  const [visible, setVisible] = useState(false);
  const [lineData, setlineData] = useState([]);
  const [sortMetricType, setSortMetricType] = useState<any>();
  const [chartData, setChartData] = useState<any>();
  const [clearFlag, setClearFlag] = useState<number>(0);
  const [curXAxisData, setCurXAxisData] = useState<any>(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSave = (isClose?: boolean) => {
    console.log(curXAxisData, 'curXAxisData');
    const { startTime, endTime } = requestParams;
    const sortTime = curXAxisData ? curXAxisData.value : endTime;
    onSave({
      dateStrings: [startTime, endTime],
      sortTime,
      sortMetricType,
    });
    const ConnectChartsParams = JSON.parse(localStorage.getItem('ConnectChartsParams')) || {};
    // let chartParams = ConnectChartsParams[propParams.metricCode] || {};
    // chartsSchartParamsortTypeData[propParams.metricCode] = sortMetricType;
    ConnectChartsParams[propParams.metricCode] = {
      sortTime,
      sortMetricType,
    };
    localStorage.setItem('ConnectChartsParams', JSON.stringify(ConnectChartsParams));
    isClose && setVisible(false);
  };

  const handleSortChange = (sortObj) => {
    const sortMetricTypeVal = sortCodeEnum[sortObj.columnKey];
    setSortMetricType(sortMetricTypeVal);
    busInstance.emit('singleReload', {
      ...propParams,
      startTime: rangeTimeArr[0],
      endTime: rangeTimeArr[1],
      sortTime: curXAxisData ? curXAxisData.value : rangeTimeArr[1],
      sortMetricType: sortMetricTypeVal,
    });
  };

  const handleRefresh = () => {
    setClearFlag((data) => {
      return data + 1;
    });
    busInstance.emit('singleReload', {
      ...propParams,
      startTime: rangeTimeArr[0],
      endTime: rangeTimeArr[1],
      sortMetricType,
    });
  };

  const timeChange = (val) => {
    setRangeTimeArr(val);
    setClearFlag((data) => {
      return data + 1;
    });
    busInstance.emit('singleReload', {
      ...propParams,
      startTime: val[0],
      endTime: val[1],
      sortMetricType,
    });
  };

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
          // TODO: X轴的key "timeStampMinute"
          return item.timeStampMinute === type;
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
          <LineChart
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
                  <div><span style="display:inline-block;margin-right:8px;border-radius:50%;width:6px;height:6px;background-color:${item.color};"></span><span>${item.name}</span></div>
                  <div>${item.value}</div>
                </div>`;
                    const color = item.marker?.split('background-color:')[1]?.slice(0, 7);
                    return color;
                  });
                  setlineData && setlineData(getTableData(params[0]?.axisValue, lineColor));
                  setCurXAxisData({
                    index: params[0]?.dataIndex,
                    value: params[0]?.axisValue
                  });
                  return str;
                },
                triggerOn: 'click',
                alwaysShowContent: true, 
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
              const { type, singleLineChatValue, multiLineChatValue } = res;
              const data =
                type === 1
                  ? singleLineChatValue.map((item: any) => {
                      return {
                        ...item,
                        // timeStampMinute: moment(item.timeStampMinute).format("mm:ss"),
                        name: item.device || item.hostName || item.path,
                        value: item.last,
                      };
                    })
                  : multiLineChatValue.map((item) => {
                      return item.map((el) => {
                        return {
                          ...el,
                          // timeStampMinute: moment(el.timeStampMinute).format("mm:ss"),
                          name: el.device || el.hostName || el.path,
                          value: el.last,
                        };
                      });
                    });
              const typeObj = {
                0: 'label',
                1: 'singleLine',
                2: 'multLine',
              };
              setChartData(data);
              return {
                data,
                type: typeObj[type],
              };
            }}
            curXAxisData={curXAxisData}
            xAxisCallback={({ type, data }) => {
              if (type === 'singleLine') {
                return data?.map((item) => item.timeStampMinute);
              }
              return data?.[0].map((item) => item.timeStampMinute).splice(0, 6);
            }}
            legendCallback={({ type, data }) => {
              if (type === 'singleLine') {
                return data?.map((item) => item.name);
              }
              return data?.map((item) => item[0].name);
            }}
            seriesCallback={({ data, type }) => {
              if (type === 'singleLine') {
                return [
                  {
                    name: data[0].name,
                    data,
                    symbolSize: 6,
                    symbol: 'circle',
                    showSymbol: false,
                  },
                ];
              }
              return (
                data
                  .map((item, index) => {
                    return {
                      name: data[index][0].name,
                      data: data[index],
                      symbolSize: 6,
                      symbol: 'circle',
                      showSymbol: false,
                    };
                  })
                  .splice(0, 6) || []
              );
            }}
          ></LineChart>
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
