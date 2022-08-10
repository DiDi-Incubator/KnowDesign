---
order: 0
title: 折线图
---

``` tsx
// import React, { useState, useEffect, useRef } from "react";
// import { SingleChart, Utils } from "knowdesign";
// const { EventBus } = Utils;
// const Demo = () => {
//   const [option, setOption] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>();
//   const eventBus = new EventBus();
//   const ref = useRef(null);

//   const queryChartData = (): any => {
//     setLoading(true)
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           code: 0,
//           data: [
//             {
//               week: "Mon",
//               value: 700,
//             },
//             {
//               week: "Tue",
//               value: 200,
//             },
//             {
//               week: "Wed",
//               value: 400,
//             },
//             {
//               week: "Thu",
//               value: 200,
//             },
//             {
//               week: "Fri",
//               value: 100,
//             },
//             {
//               week: "Sat",
//               value: 280,
//             },
//             {
//               week: "Sun",
//               value: 120,
//             },
//           ],
//         });
//         setLoading(false)
//       }, 3000);
//     });
//   };

//   const getChartOpion = async () => {
//     const { data } = await queryChartData();
//     setOption({
//       title: {
//         text: "Line Demo",
//       },
//       tooltip: {
//         trigger: "axis",
//       },
//       legend: {
//         data: ['Email'],
//       },
//       xAxis: {
//         type: "category",
//         boundaryGap: false,
//         data: data?.map((item) => item.week),
//       },
//       yAxis: {
//         type: "value",
//       },
//       series: [
//         {
//           name: "Email",
//           type: "line",
//           data: data?.map((item) => item.value)
//         },
//       ],
//     });
//   };
//   const updateAxisPointer = (event) => {
//     setTimeout(() => {
//           console.log(ref, 'ref')
//     }, 0)
//   };


//   useEffect(() => {
//     getChartOpion();
//   }, []);
//   return (
//     <>
//       <SingleChart
//         loading={loading}
//         wrapStyle={{
//           width: "auto",
//           height: 300,
//         }}
//         option={option}
//         onEvents={{
//           'updateAxisPointer': updateAxisPointer
//         }}
//       />
//       <SingleChart
//         ref={ref}
//         loading={loading}
//         wrapStyle={{
//           width: "auto",
//           height: 300,
//         }}
//         option={option}
//         onEvents={{
//           'updateAxisPointer': updateAxisPointer
//         }}
//       />
//     </>
//   );
// };

import Demo from '../lineDemo.tsx'

ReactDOM.render(
  <Demo />,
  mountNode
)
```