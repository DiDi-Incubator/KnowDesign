---
order: 1
title: 黄金指标
---

ChartContainer适配黄金指标示例   

``` tsx
import React, { useState, useEffect } from 'react';
import ChartContainer from '../index';
import { arrayMoveImmutable } from 'array-move';
import ContainerChart from "../../single-chart/containerChart/index.tsx";
import { Imenu } from '../index';
import { Utils, Button } from "@didi/dcloud-design";
import moment from 'moment';

const columns = [
  {
    title: '',
    dataIndex: 'color',
    key: 'color',
    render: (_, record) => {
      return <>
        <span style={{display: 'inline-block', marginRight:4, borderRadius:10, width:10, height:10, backgroundColor: record.color}}></span>
        <span>{record.name}</span>
      </>
    }     
  },
  {
    title: '磁盘路径',
    dataIndex: 'src',
    key: 'src',
  },
  {
    title: '设备名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '最大值',
    dataIndex: 'max',
    key: 'max',
    sorter: true
  },
  {
    title: '最小值',
    dataIndex: 'min',
    key: 'min',
    sorter: true,
    sortOrder: "ascend"
  },
  {
    title: '平均值',
    dataIndex: 'average',
    key: 'average',
    sorter: true
  },
  {
    title: '当前值',
    dataIndex: 'value',
    key: 'value',
    sorter: true
  },
  {
    title: '55%',
    dataIndex: '55th',
    key: '55th',
    sorter: true
  },
  {
    title: '75%',
    dataIndex: '75th',
    key: '75th',
    sorter: true
  },
  {
    title: '95%',
    dataIndex: '95th',
    key: '95th',
    sorter: true
  },
  {
    title: '99%',
    dataIndex: '99th',
    key: '99%th',
    sorter: true
  },
];

const menuLists = [
  {
    name: "Agent",
    key: '0', // 固定
    url: 'http://116.85.35.62:8010/api/v1/normal/metrics/1'
  }
];

const Containers = (): JSX.Element => {
  const [isGroup, setIsgroup] = useState(true); 
  let [menuList, setMenuList] = useState<Imenu[]>(menuLists); 
  useEffect(() => {
    setTimeout(() => {
      // const list = [
      //   {
      //     name: "Agent",
      //     key: '0', // 固定
      //     url: ''
      //   }
      // ];
      // setMenuList(list);
      // setIsgroup(true);
    }, 2000)
  }, [])
  
  const DragItem = (props: any) => {
  const { code: metricCode, eventBus, title, requstUrl } = props;
  const [unitDataObj, setUnitDataObj] = useState<Record<string, any>>();
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

  const queryLineData = (url, params) => {
    // return Utils.post(url, params);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          type: 1,
          baseUnit: 3,
          displayUnit: 6,
          lableValue: 1644481590473,
          name: 'ceshi',
          singleLineChatValue: [
            {
              device: 'host',
              timeStampMinute: 1645411761278,
              last: 20210202121212,
              max: 500,
              min: 0,
              path: '路径1',
            },
            {
              device: 'host',
              timeStampMinute: 1645411700000,
              last: 20210202121212,
              max: 500,
              path: '路径2',
              min: 0,
            },
          ],
          multiLineChatValue: [
            [
              {
                device: 'host',
                timeStampMinute: 1645411700000,
                last: 10,
                max: 500,
                min: 0,
                path: '路径1',
              },
              {
                device: 'host',
                timeStampMinute: 1649499999999,
                last: 200,
                max: 500,
                path: '路径2',
                min: 0,
              },
            ],
            [
              {
                hostName: 'topic',
                timeStampMinute: 1645411700000,
                last: 80,
                max: 20,
                min: 0,
              },
              {
                hostName: 'topic',
                timeStampMinute: 1649499999999,
                last: 290,
                max: 30,
                path: '路径2',
                min: 0,
              },
            ],
            [
              {
                hostName: 'health',
                timeStampMinute: '1645411761278',
                last: 80,
                max: 60,
                path: '路径3',
                min: 0,
              },
              {
                hostName: 'health',
                timeStampMinute: '1645411795247',
                last: 490,
                max: 90,
                min: 0,
              },
            ],
            [
              {
                path: 't1',
                timeStampMinute: '1645411761278',
                last: 50,
                max: 70,
                min: 0,
              },
              {
                path: 't1',
                timeStampMinute: '1645411795247',
                last: 490,
                max: 500,
                min: 0,
              },
            ],
            [
              {
                path: 't2',
                timeStampMinute: '1645411761278',
                last: 350,
                max: 100,
                min: 0,
              },
              {
                path: 't2',
                timeStampMinute: '1645411795247',
                last: 290,
                max: 120,
                min: 0,
              },
            ],
            [
              {
                path: 't3',
                timeStampMinute: '1645411761278',
                last: 150,
                max: 500,
                min: 0,
              },
              {
                path: 't3',
                timeStampMinute: '1645411795247',
                last: 290,
                max: 500,
                min: 0,
              },
            ],
          ],
        });
      }, 2000);
    });
  };

  const getPropParams = (metricCode) => {
    const ConnectChartsParams = JSON.parse(localStorage.getItem('ConnectChartsParams'));
    const chartParams = ConnectChartsParams?.metricCode;
    // 排序字段 默认平均值
    const sortMetricType = chartParams?.sortMetricType || 0;
    const sortTime = chartParams?.sortTime || '';
    return {
      metricCode,
      sortTime,
      sortMetricType,
    };
  };

  const reqCallback = (params) => {
    const { dateStrings, type, agent, hostName, logCollectTaskId, pathId, sortTime, ...rest } = params;
    const changeObj =
      type === '0'
        ? {
            hostName: agent,
          }
        : {
            hostName,
            pathId,
            logCollectTaskId,
          };

    const mergeParams = {
      ...rest,
      ...changeObj,
      sortTime: sortTime || dateStrings?.[1],
      startTime: dateStrings?.[0],
      endTime: dateStrings?.[1],
      topN: 6, // 获取top几的数据
    };
    return mergeParams;
  };

  const unitFormatFn = (val) => {
    return val + '(' + unitEnum[unitDataObj.displayUnit] + ')';
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

  const getLabelValue = ({ lableValue, baseUnit, displayUnit }) => {
    const unit = valueEnum[displayUnit];
    const value =
      unit === 'date'
        ? Utils.formatDate(lableValue, 'YYYY-MM-DD')
        : `${valueFormatFn(lableValue, baseUnit, displayUnit)} ${unitEnum[displayUnit]}`;
    const subValue = unit === 'date' ? Utils.formatDate(lableValue, 'HH:mm') : '';
    return {
      value,
      subValue,
    };
  };

  return (
    <ContainerChart
      title={title}
      wrapStyle={{
        width: '100%',
        height: 307,
        background: '#FFFFFF',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.01), 0 3px 6px 3px rgba(0,0,0,0.01), 0 2px 6px 0 rgba(0,0,0,0.03)',
        borderRadius: 4,
      }}
      option={{
        tooltip: {
          formatter: (params: any) => {
            return (
              `<div style="font-size: 12px;color: #212529;line-height: 20px; margin-top: 2px; margin-bottom: 3px;">${params[0].axisValue}</div>` +
              params
                .map((item) => {
                  return `<div style="display: flex; min-width: 140px; justify-content: space-between;line-height: 20px;color: #495057;">
                    <div style="margin-right: 20px;"><span style="display:inline-block;margin-right:8px;border-radius:50%;width:6px;height:6px;background-color:${
                      item.color
                    };"></span><span>${item.name}</span></div>
                    <div>${unitFormatFn(item.value)}</div>
                  </div>`;
                })
                .join('')
            );
          },
        },
        yAxis: {
          axisLabel: {
            formatter: (value) => `${unitFormatFn(value)}`,
          },
        },
      }}
      showLargeChart={true}
      connectEventName={'connect'}
      url={requstUrl}
      eventBus={eventBus}
      request={queryLineData}
      reqCallback={reqCallback}
      propParams={getPropParams(metricCode)}
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
          type === 1
            ? getLabelValue({
                lableValue,
                baseUnit,
                displayUnit,
              })
            : type === 3
            ? singleLineChatValue?.map((item: any) => {
                return {
                  ...item,
                  timeStampMinute: moment(item.timeStampMinute).format('HH:mm'),
                  name,
                  value: valueFormatFn(item.last, baseUnit, displayUnit),
                };
              })
            : multiLineChatValue?.map((item) => {
                return item.map((el) => {
                  return {
                    ...el,
                    timeStampMinute: moment(el.timeStampMinute).format('HH:mm'),
                    name: el.device || el.hostName || el.path,
                    value: valueFormatFn(el.last, baseUnit, displayUnit),
                    // value: el.last
                  };
                });
              });

        const typeObj = {
          1: 'label',
          2: 'multLine',
          3: 'singleLine',
        };
        setUnitDataObj({
          baseUnit,
          displayUnit,
        });
        return {
          data,
          type: typeObj[type],
        };
      }}
      xAxisCallback={({ type, data }) => {
        console.log(type, data, 'data222');
        if (type === 'singleLine') {
          return data?.map((item) => item.timeStampMinute);
        }
        return data?.[0]?.map((item) => item.timeStampMinute);
      }}
      // legendCallback={({ type, data }) => {
      //   if (data && type === 'multLine') {
      //     return data?.map((item) => item[0].name);
      //   }
      // }}
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
    />
  );
};

  return (
      <>
        <ChartContainer 
          isGold={true}
          filterData={{
            hostName: '主机名',
            logCollectTaskId: '志采集任务id',
            pathId: '采集路径id',
            agent: 'agent hostName'
          }}
          reloadModule={{ 
            reloadIconShow: true,
            lastTimeShow: true
          }}
          dragModule={{
            dragItem: <DragItem></DragItem>,
            requstUrl: '/api/v1/normal/metrics/metric',
            isGroup: isGroup
          }}
          indicatorSelectModule={{
            hide: false,
            menuList
          }}>
          
        </ChartContainer>           
      </>
  )
}

ReactDOM.render(
  <div>
    <Containers />
  </div>,
  mountNode,
);
```

```css
.drag-sort-item {
  /* background: #4482D4; */
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.01), 0 3px 6px 3px rgba(0,0,0,0.01), 0 2px 6px 0 rgba(0,0,0,0.03);
  border-radius: 4px; 
  color: #fff;
}

```
