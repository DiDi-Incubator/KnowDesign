---
order: 1
title: 次要按钮
---


次要按钮一般与主要按钮同时出现；按钮整体以文字+边框的形式，在视觉层面上感知较弱，适用于较次要的目标功能操作

```jsx
import { DButton } from 'dcloud-design';

ReactDOM.render(
  <>
    <DButton customtype={"secondary"}>次要按钮</DButton>
    <DButton customtype={"secondary-standard"} style={{marginLeft: 20}}>标准按钮</DButton>
  </>,
  mountNode,
);
``
