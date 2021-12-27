import React, { useState, useEffect, useRef } from "react";
import { SingleChart, Utils, Input, Button } from "../../index";
import * as echarts from 'echarts';
const { EventBus } = Utils;
const busInstance = new EventBus()

export default () => {
  const option = {
  title: {
    text: "Line Demo",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ['Email'],
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
  ]}
  // const [loading, setLoading] = useState<boolean>();

  const [reqParams, setReqparams] = useState({
    name: 'abc',
    age: 12,
  });
  const ref = useRef(null);

  const queryChartData = (url, params): any => {    
    return new Promise((resolve) => {
      setTimeout(() => {
        // resolve(null)
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

  // const getChartOpion = async () => {
  //   const { data } = await queryChartData();
  //   setOption({
  //     title: {
  //       text: "Line Demo",
  //     },
  //     tooltip: {
  //       trigger: "axis",
  //     },
  //     legend: {
  //       data: ['Email'],
  //     },
  //     xAxis: {
  //       type: "category",
  //       boundaryGap: false,
  //       data: data?.map((item) => item.week),
  //     },
  //     yAxis: {
  //       type: "value",
  //     },
  //     series: [
  //       {
  //         name: "Email",
  //         type: "line",
  //         data: data?.map((item) => item.value)
  //       },
  //     ],
  //   });
  // };
  const updateAxisPointer = (e) => {

  };

  return (
    <div>
      <Input onBlur={(e: any) => {
        setReqparams((origin) => {
          return {
            ...origin,
            name: e.target.value
          }
        })
      }}></Input>
      <SingleChart
        wrapStyle={{
          width: "auto",
          height: 300,
        }}
        eventBus={busInstance}
        eventName={'TEST'}
        url="/api/test"
        reqParams={reqParams}
        request={queryChartData}
        resCallback={(res: any) => res.data}
        xAxisCallback={(data) => data?.map((item) => item.week)}
        option={option}
        onEvents={{
          'updateAxisPointer': updateAxisPointer
        }}
      />
      <SingleChart
        wrapStyle={{
          width: "auto",
          height: 300,
        }}
        eventBus={busInstance}
        url="/api/test"
        reqParams={reqParams}
        eventName={'TEST'}
        request={queryChartData}
        resCallback={(res: any) => res.data}
        xAxisCallback={(data) => data?.map((item) => item.week)}
        option={option}
        onEvents={{
          'updateAxisPointer': updateAxisPointer
        }}
      />
    </div>
  );
};