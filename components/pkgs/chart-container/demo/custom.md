---
order: 0
title: 基础用法
---

ChartContainer示例   

``` tsx
import React, { useState, useEffect } from 'react';
import ChartContainer from '../index';
import { arrayMoveImmutable } from 'array-move';
import Chart from "../../single-chart/index.tsx";
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
  // {
  //   name: "Agent",
  //   key: '0', // 固定
  //   url: 'http://116.85.35.62:8010/api/v1/normal/metrics/1'
  // },
  {
    name: "日志采集",
    key: '1', // 固定
    url: '/api/v1/normal/metrics/2'
  }
];

const groupsData = [{
  groupId: 1,
  groupName: 'group1',
  lists: [{
    id: 1,
    name: '1-1'
  }, {
    id: 2,
    name: '1-2'
  }, {
    id: 3,
    name: '1-3'
  }, {
    id: 4,
    name: '1-4'
  }, {
    id: 5,
    name: '1-5'
  }]
},
{
  groupId: 2,
  groupName: 'group2',
  lists: [{
    id: 1,
    name: '2-1'
  }, {
    id: 2,
    name: '2-2'
  }]
}]

const groupsData1 = [{
    id: 1,
    name: '1-1'
  }, {
    id: 2,
    name: '1-2'
  }, {
    id: 3,
    name: '1-3'
  }, {
    id: 4,
    name: '1-4'
  }, {
    id: 5,
    name: '1-5'
  }]

const Containers = (): JSX.Element => {
  const [isGroup, setIsgroup] = useState(false); 
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
  
  const queryLineData = (req?: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: {
            type: 1,
            lableValue: 1644481590473,
            singleLineChatValue: [
              {
                name: 'host',
                timeStampMinute: '星期一',
                value: 10,
                max: 500,
                min: 0,
                path: '路径1'
              },
            {
              name: 'host',
              timeStampMinute: '星期二',
              value: 200,
              max: 500,
              path: '路径2',
              min: 0
            }
            ],
            multiLineChatValue: [
            [
              {
                name: 'host',
                timeStampMinute: '星期一',
                value: 10,
                max: 500,
                min: 0,
                path: '路径1'
              },
            {
              name: 'host',
              timeStampMinute: '星期二',
              value: 200,
              max: 500,
              path: '路径2',
              min: 0
            }
            ],
            [
              {
                name: 'topic',
                timeStampMinute: '星期一',
                value: 80,
                max: 20,
                min: 0
              },
            {
              name: 'topic',
              timeStampMinute: '星期二',
              value: 290,
              max: 30,
              path: '路径2',
              min: 0
            }
            ],
            [
              {
                name: 'health',
                timeStampMinute: '星期一',
                value: 80,
                max: 60,
                              path: '路径3',
                min: 0
              },
            {
              name: 'health',
              timeStampMinute: '星期二',
              value: 490,
              max: 90,
              min: 0
            }
            ],
            [
              {
                name: 't1',
                timeStampMinute: '星期一',
                value: 50,
                max: 70,
                min: 0
              },
            {
              name: 't1',
              timeStampMinute: '星期二',
              value: 490,
              max: 500,
              min: 0
            }
            ],
            [
              {
                name: 't2',
                timeStampMinute: '星期一',
                value: 350,
                max: 100,
                min: 0
              },
            {
              name: 't2',
              timeStampMinute: '星期二',
              value: 290,
              max: 120,
              min: 0
            }
            ],
                        [
              {
                name: 't3',
                timeStampMinute: '星期一',
                value: 150,
                max: 500,
                min: 0
              },
            {
              name: 't3',
              timeStampMinute: '星期二',
              value: 290,
              max: 500,
              min: 0
            }
            ],
          ],
          }
        });
      }, 2000);
    });
  };

  const option = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
    },
  };

  const getPropParams = (props) => {
    const { code: metricCode, type, agent, hostName, logCollectTaskId, pathId } = props;
    const changeObj = type === '0' ? {
      hostName: agent
    } : {
      hostName,
      pathId,
      logCollectTaskId
    };
    const chartsSortTypeData = JSON.parse(localStorage.getItem("$ConnectChartsSortTypeData"));
    const sortMetricType = chartsSortTypeData?.metricCode ? chartsSortTypeData?.metricCode : 0;
    return {
      ...changeObj,
      metricCode,
      sortMetricType, // 排序字段 平均值
      topN: 6 // 获取top几的数据
    }
  };

  const reqCallback = (params) => {
    const { dateStrings, ...rest } = params;
    return {
      ...rest,
      startTime: dateStrings?.[0],
      dateString: dateStrings?.[1],
    }
  }

  const DragItem = (props) => {
    const { eventBus, title, code, requstUrl} = props;
    return (
      <Chart
        title={title}
        wrapStyle={{
          width: "100%",
          height: 307,
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
          },
        }}
        showLargeChart={true}
        connectEventName={"connect"}
        url={requstUrl}
        eventBus={eventBus}
        request={queryLineData}
        reqCallback={reqCallback}
        propParams={getPropParams(props)}
        resCallback={(res: any) => {
          const { type, lableValue, singleLineChatValue, multiLineChatValue } = res.data;
          const data = type === 0 ? lableValue : type === 1 ? singleLineChatValue : multiLineChatValue
          const typeObj = {
            0: 'label',
            1: 'singleLine',
            2: 'multLine'
          };
          return {
            data,
            type: typeObj[type]
          }
        }}
        xAxisCallback={({ type, data }) => {
          if(type === "singleLine") {
            return data?.map((item) => item.timeStampMinute)
          }
          return data?.[0].map((item) => item.timeStampMinute)
        }}
        legendCallback={({ type, data }) => {
          if(type === "singleLine") {
            return data?.map((item) => item.name)
          }
          return data?.map((item) => item[0].name)
        }}
        seriesCallback={({ data, type }) => {
          if(type === "singleLine") {
            return [
              {
                name: data[0].name,
                data,
                symbolSize: 6,
                symbol: 'circle',
                showSymbol: false,
              }
            ]
          }
          return data.map((item, index) => {
            return {
              name: data[index][0].name,
              data: data[index],
              symbolSize: 6,
              symbol: 'circle',
              showSymbol: false,
            }
          }) || [];
        }}
      />
    )
  };
  return (
      <>
        <ChartContainer 
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
            isGroup: isGroup,
            groupsData: isGroup ? groupsData : groupsData1
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
