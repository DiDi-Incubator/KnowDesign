---
order: 2
title: 无数据状态
---

```tsx
import React, { useState, useEffect } from "react";
import { SingleChart } from "@didi/dcloud-design";

const Demo = () => {
  const [option, setOption] = useState<any>({
    title: {
      text: "NoData Demo",
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
  const queryChartData = (): any => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });
  };

  return (
    <SingleChart
      url="/api/test"
      reqParams={{}}
      request={queryChartData}
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
