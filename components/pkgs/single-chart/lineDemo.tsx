import React, { useState, useEffect, useRef } from "react";
import { Utils, Input, Button, Select, Radio, Space } from "../../index";
import LineChart from "./LineChart";
const { EventBus } = Utils;
const busInstance = new EventBus();
const { Option } = Select;

export default () => {
  const option = {
    title: {
      text: "Line Demo",
    },
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

  const updateAxisPointer = (e) => {
    // console.log(e);
  };

  const handleChange = (value) => {
    setReqparams((origin) => {
      return {
        ...origin,
        time: value
      }
    })
  }

  const renderInnerQuery = () => {
    return (
      <>
        <Select defaultValue={1} style={{ width: 120 }} onChange={handleChange}>
          <Option value={1}>Top1</Option>
          <Option value={2}>Top2</Option>
          <Option value={3}>Top3</Option>
        </Select>
      </>
    );
  };

  const handleRefresh = () => {
    busInstance.emit('refresh')


  };

  return (
    <div>
      {/* <Input
        onBlur={(e: any) => {
          setReqparams((origin) => {
            return {
              ...origin,
              name: e.target.value,
            };
          });
        }}
      ></Input> */}
      <Space>
        <Button onClick={() => handleRefresh()}>刷新</Button>
        <Radio.Group defaultValue={1} buttonStyle="solid" onChange={handleChange}>
          <Radio.Button value={1}>近15分钟</Radio.Button>
          <Radio.Button value={2}>近一小时</Radio.Button>
          <Radio.Button value={3}>近一天</Radio.Button>
        </Radio.Group>
      </Space>
      <LineChart
        wrapStyle={{
          width: "auto",
          height: 300,
        }}
        eventBus={busInstance}
        eventName={"TEST"}
        url="/api/test"
        reqParams={{
          name: 1,
          age: 12
        }}
        request={queryLineData}
        resCallback={(res: any) => res.data}
        xAxisCallback={(data) => data?.map((item) => item.week)}
        option={option}
        onEvents={{
          updateAxisPointer: updateAxisPointer,
        }}
      />
      <LineChart
        wrapStyle={{
          width: "auto",
          height: 300,
        }}
        eventBus={busInstance}
        url="/api/test"
        reqParams={reqParams}
        eventName={"TEST"}
        request={queryChartData}
        resCallback={(res: any) => res.data}
        xAxisCallback={(data) => data?.map((item) => item.week)}
        option={option}
        renderInnerQuery={renderInnerQuery}
        onEvents={{
          updateAxisPointer: updateAxisPointer,
        }}
      />
    </div>
  );
};
