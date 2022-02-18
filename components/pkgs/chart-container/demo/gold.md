---
order: 1
title: 黄金指标
---

ChartContainer示例   

``` tsx
import React, { useState, useEffect } from 'react';
import ChartContainer from '../index';
import { arrayMoveImmutable } from 'array-move';
import SingleChart from "../../single-chart/index.tsx";
import { Imenu } from '../index';
import { Utils, Button } from "@didi/dcloud-design";

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
  
  const queryLineData = (url, params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: {
            type: 2,
            lableValue: 1644481590473,
            singleLineChatValue: [
              {
                name: 'host',
                timeStampMinute: '星期一',
                value: 10,
                max: 500,
                min: 0,
                path: '路径1',
              },
              {
                name: 'host',
                timeStampMinute: '星期二',
                value: 200,
                max: 500,
                path: '路径2',
                min: 0,
              },
            ],
            multiLineChatValue: [
              [
                {
                  name: 'host',
                  timeStampMinute: '星期一',
                  value: 10,
                  max: 500,
                  min: 0,
                  path: '路径1',
                },
                {
                  name: 'host',
                  timeStampMinute: '星期二',
                  value: 200,
                  max: 500,
                  path: '路径2',
                  min: 0,
                },
              ],
              [
                {
                  name: 'topic',
                  timeStampMinute: '星期一',
                  value: 80,
                  max: 20,
                  min: 0,
                },
                {
                  name: 'topic',
                  timeStampMinute: '星期二',
                  value: 290,
                  max: 30,
                  path: '路径2',
                  min: 0,
                },
              ],
              [
                {
                  name: 'health',
                  timeStampMinute: '星期一',
                  value: 80,
                  max: 60,
                  path: '路径3',
                  min: 0,
                },
                {
                  name: 'health',
                  timeStampMinute: '星期二',
                  value: 490,
                  max: 90,
                  min: 0,
                },
              ],
              [
                {
                  name: 't1',
                  timeStampMinute: '星期一',
                  value: 50,
                  max: 70,
                  min: 0,
                },
                {
                  name: 't1',
                  timeStampMinute: '星期二',
                  value: 490,
                  max: 500,
                  min: 0,
                },
              ],
              [
                {
                  name: 't2',
                  timeStampMinute: '星期一',
                  value: 350,
                  max: 100,
                  min: 0,
                },
                {
                  name: 't2',
                  timeStampMinute: '星期二',
                  value: 290,
                  max: 120,
                  min: 0,
                },
              ],
              [
                {
                  name: 't3',
                  timeStampMinute: '星期一',
                  value: 150,
                  max: 500,
                  min: 0,
                },
                {
                  name: 't3',
                  timeStampMinute: '星期二',
                  value: 290,
                  max: 500,
                  min: 0,
                },
              ],
            ],
          },
        });
      }, 2000);
    });
  };

  const getPropParams = (metricCode) => {
    const chartsSortTypeData = JSON.parse(localStorage.getItem('$ConnectChartsSortTypeData'));
   // 排序字段 默认平均值
    const sortMetricType = chartsSortTypeData?.metricCode ? chartsSortTypeData?.metricCode : 0;
    return {
      metricCode,
      sortMetricType, 
    }
  }

  const reqCallback = (params) => {
    const { dateStrings, type, agent, hostName, logCollectTaskId, pathId, ...rest } = params;
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
      startTime: dateStrings?.[0],
      endTime: dateStrings?.[1],
      topN: 6, // 获取top几的数据
    };
    console.log(mergeParams, 'mergeParams');
    return mergeParams;
  };

  const DragItem = (props: any) => {
    const { code: metricCode, eventBus, title, requstUrl } = props;
    return (
      <SingleChart
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
                    <div><span style="display:inline-block;margin-right:8px;border-radius:50%;width:6px;height:6px;background-color:${item.color};"></span><span>${item.name}</span></div>
                    <div>${item.value}</div>
                  </div>`;
                  })
                  .join('')
              );
            },
            legend: {
                orient: 'vertical',
                x:'center',      //可设定图例在左、右、居中
                y:'bottom',     //可设定图例在上、下、居中
                padding:[0,50,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
            }
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
          const { type, lableValue, singleLineChatValue, multiLineChatValue } = res.data;
          const data = type === 0 ? lableValue : type === 1 ? singleLineChatValue : multiLineChatValue;
          const typeObj = {
            0: 'label',
            1: 'singleLine',
            2: 'multLine',
          };
          return {
            data,
            type: typeObj[type],
          };
        }}
        xAxisCallback={({ type, data }) => {
          if (type === 'singleLine') {
            return data?.map((item) => item.timeStampMinute);
          }
          return data?.[0].map((item) => item.timeStampMinute);
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
            data.map((item, index) => {
              return {
                name: data[index][0].name,
                data: data[index],
                symbolSize: 6,
                symbol: 'circle',
                showSymbol: false,
              };
            }) || []
          );
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
            pathId: '采集路径id'
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
            hide: true,
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
