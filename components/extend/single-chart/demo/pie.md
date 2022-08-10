---
order: 1
title: 饼图
---

```tsx
import React, { useState, useEffect } from "react";
import { SingleChart } from "knowdesign";

const Demo = () => {
  const [option, setOption] = useState<any>({
    title: {
      text: "Pie Demo",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  const queryChartData = (url, params): any => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        });
      }, 3000);
    });
  };

  return (
    <SingleChart
      url="/api/test"
      reqParams={{
        name: 1,
        age: 12
      }}
      request={queryChartData}
      resCallback={(res) => res.data}
      wrapStyle={{
        width: "auto",
        height: 300,
      }}
      option={option}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```
