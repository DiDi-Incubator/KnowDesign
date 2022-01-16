---
order: 0
title: 基础用法
---

ChartContainer示例

``` tsx
import React, { useState } from 'react';
import ChartContainer from '../index';
import { arrayMoveImmutable } from 'array-move';
import Chart from "../../single-chart/index.tsx";
import { Utils, Button } from "@didi/dcloud-design";

const menuList = [
  {
    name: "Agent",
    key: '0', // 固定
    url: ''
  },
  {
    name: "日志采集",
    key: '1', // 固定
    url: ''
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
  const queryLineData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: [
            [
              {
                name: 'host',
                timeStampMinute: '星期一',
                value: 100
              },
            {
              name: 'host',
              timeStampMinute: '星期二',
              value: 200
            }
            ],
                 [
              {
                name: 'topic',
                timeStampMinute: '星期一',
                value: 80
              },
            {
              name: 'topic',
              timeStampMinute: '星期二',
              value: 290
            }
            ],
                   [
              {
                name: 'health',
                timeStampMinute: '星期一',
                value: 80
              },
            {
              name: 'health',
              timeStampMinute: '星期二',
              value: 490
            }
            ],
          ],
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

  const handleReqCallback = (data, props) => {
    const { host, agent, path, ...rest } = data
    const { code, type } = props
    const changeObj = type === 'agent' ? {
      agent
    } : {
      host,
      path
    }
    return {
      ...rest,
      ...changeObj,
      code
    }
  }

  const DragItem = (props) => {
    const { eventBus, title, chartType, type, code} = props;
    return (
      <Chart
        title={'测试12'}
        chartType={chartType}
        wrapStyle={{
          width: "100%",
          height: 300,
        }}
        showLargeChart={true}
        connectEventName={chartType === 'line' ? "conenctLine" : ''}
        url="/api/test"
        eventBus={eventBus}
        request={queryLineData}
        resCallback={(res: any) => res.data}
        reqCallback={(data) => handleReqCallback(data, props)}
        xAxisCallback={((data) => data?.[0].map((item) => item.timeStampMinute))}
        legendCallback={((data) => data?.map((item) => item[0].name))}
        seriesCallback={(data) => {
          return data.map((item, index) => {
            return {
              name: data[index][0].name,
              data: data[index]
            }
          })
        }}
      />
    )
  };
  return (
      <>
        <ChartContainer 
          reloadModule={{ 
            reloadIconShow: true,
            lastTimeShow: true
          }}
          dragModule={{
            dragItem: <DragItem></DragItem>,
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
  border: 1px solid #50A5F1;
  color: #fff;
}

```