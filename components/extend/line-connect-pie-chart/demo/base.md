---
order: 0
title: 基本
---

``` tsx
import React, { useEffect, useState } from "react";
import { LineConnectPieChart } from "knowdesign";

const Demo = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>();
  const queryChartData = (): any => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: [
            {
              name: '2021-01',
              list: [
                {
                  type: 'topic',
                  name: 'Topic',
                  value: 50,
                },
                {
                  type: 'topic1',
                  name: '独享集群',
                  value: 100,
                },
                {
                  type: 'topic2',
                  name: '独立集群',
                  value: 100,
                },
                {
                  type: 'topic3',
                  name: '共享集群',
                  value: 100,
                },
                {
                  type: 'topic',
                  name: '集群资源池',
                  value: 50,
                },
              ],
            },
            {
              name: '2021-02',
              list: [
                {
                  type: 'topic',
                  name: 'Topic',
                  value: 10,
                },
                {
                  type: 'topic1',
                  name: '独享集群',
                  value: 150,
                },
                {
                  type: 'topic2',
                  name: '独立集群',
                  value: 300,
                },
                {
                  type: 'topic3',
                  name: '共享集群',
                  value: 400,
                },
                {
                  type: 'topic',
                  name: '集群资源池',
                  value: 100,
                },
              ],
            },
            {
              name: '2021-03',
              list: [
                {
                  type: 'topic',
                  name: 'Topic',
                  value: 50,
                },
                {
                  type: 'topic1',
                  name: '独享集群',
                  value: 100,
                },
                {
                  type: 'topic2',
                  name: '独立集群',
                  value: 380,
                },
                {
                  type: 'topic3',
                  name: '共享集群',
                  value: 400,
                },
                {
                  type: 'topic',
                  name: '集群资源池',
                  value: 100,
                },
              ],
            },
            {
              name: '2021-04',
              list: [
                {
                  type: 'topic',
                  name: 'Topic',
                  value: 50,
                },
                {
                  type: 'topic1',
                  name: '独享集群',
                  value: 100,
                },
                {
                  type: 'topic2',
                  name: '独立集群',
                  value: 380,
                },
                {
                  type: 'topic3',
                  name: '共享集群',
                  value: 400,
                },
                {
                  type: 'topic',
                  name: '集群资源池',
                  value: 100,
                },
              ],
            },
            {
              name: '2021-05',
              list: [
                {
                  type: 'topic',
                  name: 'Topic',
                  value: 150,
                },
                {
                  type: 'topic1',
                  name: '独享集群',
                  value: 200,
                },
                {
                  type: 'topic2',
                  name: '独立集群',
                  value: 400,
                },
                {
                  type: 'topic3',
                  name: '共享集群',
                  value: 500,
                },
                {
                  type: 'topic',
                  name: '集群资源池',
                  value: 500,
                },
              ],
            },
          ],
        });
        setLoading(false);
      }, 3000);
    });
  };

  const getChartData = async () => {
    const { data } = await queryChartData();
    setChartData(data);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <LineConnectPieChart
      wrapStyle={{
        display: "flex",
        height: 300,
      }}
      lineStyle={{
        flex: 1,
        height: "100%",
      }}
      pieStyle={{
        width: 300,
        height: "100%",
      }}
      lineOption={{
        title: {
          text: "Topic数量",
        },
        grid: {
          top: 50,
          left: 50,
          right: 5,
        },
      }}
      pieOption={{
        legend: {
          left: "center",
          bottom: 10,
          itemWidth: 6,
          itemHeight: 6,
          icon: "circle",
          textStyle: {
            color: "#A8ADBD",
          },
        },
        type: "pie",
        radius: 50,
        color: ["#F8B924", "#FF7D41", "#4E72FF", "#3A9CFF", "#21CAB8"],
        label: {
          formatter: function (data) {
            return data.value + `\n` + data.percent;
          },
        },
      }}
      chartData={chartData}
      loading={loading}
    />
  );
};


ReactDOM.render(
    <Demo />,
    mountNode
)
```
