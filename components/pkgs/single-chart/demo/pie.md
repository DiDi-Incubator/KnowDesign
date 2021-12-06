---
order: 1
title: 饼图
---

``` tsx

import React, { useState, useEffect } from "react";
import { SingleChart } from "@didi/d1-packages";

const Demo = () => {
  const [option, setOption] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>();
  const queryChartData = (): any => {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
        });
        setLoading(false)
      }, 3000);
    });
  };

  const getChartOpion = async () => {
    const { data } = await queryChartData();
    setOption({
        title: {
          test: 'Pie Demo',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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