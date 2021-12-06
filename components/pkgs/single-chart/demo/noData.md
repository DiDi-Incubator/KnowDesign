---
order: 2
title: 无数据状态
---

``` tsx

import React, { useState, useEffect } from "react";
import { SingleChart } from "@didi/d1-packages";

const Demo = () => {
  const [option, setOption] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>();
  const queryChartData = (): any => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: [],
        });
        setLoading(false);
      }, 3000);
    });
  };

  const getChartOpion = async () => {
    const { data } = await queryChartData();
    setOption({
      title: {
        test: "NoData Demo",
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
          data,
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
  };

  useEffect(() => {
    getChartOpion();
  }, []);

  return (
    <SingleChart
      loading={loading}
      wrapStyle={{
        width: "auto",
        height: 300,
      }}
      option={option}
    />
  );
};

ReactDOM.render(
  <Demo />,
  mountNode
)
```