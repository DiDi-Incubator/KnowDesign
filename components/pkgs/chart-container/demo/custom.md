---
order: 0
title: 基础用法
---

ChartContainer示例

``` tsx
import React, { useState } from 'react';
import ChartContainer from '../index';
import { arrayMoveImmutable } from 'array-move';
import Chart from "../../single-chart";

const Containers = (): JSX.Element => {
    

  const queryLineData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: [
            {
              week: "Mon",
              value: (Math.random() * 1000).toFixed(),
            },
            {
              week: "Tue",
              value: 200,
            },
            {
              week: "Wed",
              value: 400,
            },
            {
              week: "Thu",
              value: 200,
            },
            {
              week: "Fri",
              value: 100,
            },
            {
              week: "Sat",
              value: 280,
            },
            {
              week: "Sun",
              value: 120,
            },
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
    series: [
      {
        name: "Email",
        type: "line",
      },
    ],
  };

  const DragItem = (props) => {
    const { eventBus, title, chartType} = props;

    return (
      <Chart
        title={title}
        chartType={chartType}
        wrapStyle={{
          width: "100%",
          height: 300,
        }}
        eventBus={eventBus}
        showLargeChart={chartType === 'line' ? true : false}
        connectEventName={chartType === 'line' ? "conenctLine" : ''}
        url="/api/test"
        request={queryLineData}
        resCallback={(res: any) => res.data}
        xAxisCallback={(data) => data?.map((item) => item.week)}
        option={option}
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
          dragItemChildren={{
            dom: <DragItem></DragItem>
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