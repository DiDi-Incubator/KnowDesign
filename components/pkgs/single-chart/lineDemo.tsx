import React, { useState, useEffect, useRef } from "react";
import { Utils, Input, Button, Select, Radio, Space } from "../../index";
import LineChart from "./LineChart";
import { Container } from '../../index'
const { EventBus } = Utils;
const busInstance = new EventBus();
const { Option } = Select;


export default () => {
  const [time, setTime] = useState(1)

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Email"],
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

  const [reqParams, setReqparams] = useState({
    time: 1
  });

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
  }

  const queryChartData = (url, params): any => {
    // console.log(url, params);
    return new Promise((resolve) => {
      setTimeout(() => {
        // resolve(null);
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
      }, 3000);
    });
  };

  const handleChange = (e) => {
    
    setTime(e.target.value);
    busInstance.emit('chartReload', {
      time: e.target.value
    })
  };


  const handleRefresh = () => {
    busInstance.emit('chartReload', {
      time
    })
  };

  React.useEffect(() => {
    busInstance.emit('chartReload', {
      time
    })
  }, [])

  return (
    <div>
      <Space>
        <Button onClick={() => handleRefresh()}>刷新</Button>
        <Radio.Group defaultValue={time} buttonStyle="solid" onChange={handleChange}>
          <Radio.Button value={1}>近15分钟</Radio.Button>
          <Radio.Button value={2}>近一小时</Radio.Button>
          <Radio.Button value={3}>近一天</Radio.Button>
        </Radio.Group>
      </Space>

      <Container gutter={10} grid={12}>
        <LineChart
          title="测试001"
          wrapStyle={{
            width: "auto",
            height: 300,
          }}
          showLargeChart={true}
          eventBus={busInstance}
          connectEventName={"conenctLine"}
          url="/api/test"
          request={queryLineData}
          resCallback={(res: any) => res.data}
          xAxisCallback={(data) => data?.map((item) => item.week)}
          option={option}
        />
        <LineChart
          title="测试002"
          wrapStyle={{
            width: "auto",
            height: 300,
          }}
          showLargeChart={true}
          eventBus={busInstance}
          url="/api/test"
          connectEventName={"conenctLine"}
          request={queryChartData}
          resCallback={(res: any) => res.data}
          xAxisCallback={(data) => data?.map((item) => item.week)}
          option={option}
        />
      </Container>
    </div>
  );
};