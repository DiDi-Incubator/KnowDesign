import React, { useState, useEffect } from 'react';
import _, { isArray } from "lodash";
import { FullscreenOutlined, ReloadOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
import { Input, Button, Select, Radio, Space, Drawer, IconFont } from "../../index";
import moment from 'moment';
import TimeModule from '../chart-container/TimeModule';
import { Utils } from '../../utils'
import type { LineChartProps } from './LineChart'
import LinkageTable from './linkageTable';
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
  ninetyNineQuantile: 8
};

const EnlargedChart = (props: LineChartProps & {
  requestParams?: any;
  onSave?: any;
}) => {
  const { title, requestParams, url, request, onSave } = props;
  const [rangeTimeArr, setRangeTimeArr] = useState<any[]>();
  const [propParams, setPropParams] = useState<any>();
  const [lastTime, setLastTime] = useState<string>(moment().format('YYYY.MM.DD.hh:mm:ss'));
  const [visible, setVisible] = useState(false);
  const [lineData, setlineData] = useState([]);
  const [sortMetricType, setSortMetricType] = useState<any>();
  const [chartData, setChartData] = useState<any>();
  const [clearFlag, setClearFlag] = useState<number>(0);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  const handleSave = (isClose?: boolean) => {
    onSave({
      sortMetricType
    });
    localStorage.setItem(propParams.metricCode, sortMetricType);
    isClose && setVisible(false);
  };

  const handleSortChange = (sortObj) => {
    const sortMetricTypeVal = sortCodeEnum[sortObj.columnKey]
    setSortMetricType(sortMetricTypeVal);
    busInstance.emit('singleReload', {
      ...propParams,
      startTime: rangeTimeArr[0],
      endTime: rangeTimeArr[1],
      sortMetricType: sortMetricTypeVal
    });
  };

  const handleRefresh = () => {
    setClearFlag((data) => {
      return data + 1
    })
    busInstance.emit('singleReload', {
      ...propParams,
      startTime: rangeTimeArr[0],
      endTime: rangeTimeArr[1],
      sortMetricType
    });
  };

  const timeChange = ((val) => {
    setRangeTimeArr(val);
    setClearFlag((data) => {
      return data + 1
    })
    busInstance.emit('singleReload', {
      ...propParams,
      startTime: val[0],
      endTime: val[1],
      sortMetricType,
      type: '888'
    });
  });

  useEffect(() => {
    if (visible && requestParams) {
      const { dateStrings, sortMetricType, ...rest } = requestParams;
      setPropParams({
        ...rest,
        topN: 0, // 获取全部的数据
      })
      setRangeTimeArr(dateStrings);
      setSortMetricType(sortMetricType);
      busInstance.emit("singleReload", {
        ...rest,
        topN: 0, // 获取全部的数据
        sortMetricType,
        startTime: dateStrings?.[0],
        endTime: dateStrings?.[1],
      });
    };
  }, [visible, requestParams]);



  const getTableData = (type, lineColor) => {
    // 通过X轴过滤全部数据
    let arr = [];
    if (isArray(chartData)) {
      // 二维数组
      arr = [].concat(...chartData).filter((item) => {
        // TODO: X轴的key "timeStampMinute"
        return item.timeStampMinute === type;
      }).map((i, index) => {
        return {
          ...i,
          color: lineColor[index] || ''
        }
      })
    }
    return arr;
  };


  return <>
    <IconFont type="icon-shaixuan" onClick={showDrawer} style={{
      fontSize: 14,
      border: "0.5px solid #CED4DA",
      borderRadius: 2,
      padding: 2,
    }} />
    <Drawer
      width={1080}
      title={title}
      placement="right"
      onClose={onClose}
      visible={visible}
      footer={<div style={{
        textAlign: 'left',
      }}>
        <Button onClick={onClose}>
          取消
        </Button>
        <Button onClick={() => handleSave(true)} type="primary" style={{ marginLeft: 10 }}>
          保存
        </Button>
      </div>}
    >
      <Space>
        <div className="reload-module">
          <Button
            type="text"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
          >刷新</Button>
          <span className="last-time">上次刷新时间: {lastTime}</span></div>
        <TimeModule timeChange={timeChange} rangeTimeArr={rangeTimeArr} />
      </Space>
      {visible && <LineChart
        wrapStyle={{
          width: '100%',
          height: 300,
        }}
        option={{
          tooltip: {
            formatter: (params) => {
              let str = '';
              str += `<h3>${params[0]?.axisValue}</h3>`;
              const lineColor = params.map((item) => {
                str += `<div style="min-width: 100px;display: flex;align-items: center;justify-content: space-between;">${item.marker + '' + item.value}</div>`;
                const color = item.marker?.split('background-color:')[1]?.slice(0, 7);
                return color;
              });
              setlineData && setlineData(getTableData(params[0]?.axisValue, lineColor));
              return str
            }
          },
          grid: {
            top: 20,
            bottom: 20
          }
        }}
        eventBus={busInstance}
        url={url}
        request={request}
        resCallback={(res: any) => {
          // setChartData(res.data);
          return res.data
        }}
        xAxisCallback={((data) => data?.[0].map((item) => item.timeStampMinute))}
        legendCallback={((data) => data?.map((item) => item[0].name)?.splice(0, 6))}
        seriesCallback={(data) => {
          const arr = data.map((item, index) => {
            return {
              name: data[index][0].name,
              data: data[index]
            }
          }) || [];
          // 图表最多展示6条
          return arr.splice(0, 6);
        }}></LineChart>}
      <LinkageTable clearFlag={clearFlag} dispatchSort={handleSortChange} rangeTimeArr={rangeTimeArr} requestParams={requestParams} lineData={lineData} />
    </Drawer>
  </>
}

export default EnlargedChart;
