---
order: 0
title: 主要按钮/标准按钮
---


该按钮在页面中运用广泛，出现最为频繁，在与次按钮搭配使用时主按钮为页面中按钮区最为核心的操作，一般用于强调页面中的目标功能操作


```jsx
import { DButton } from 'knowdesign';

ReactDOM.render(
  <>
    <DButton type="primary">主要按钮</DButton>
    <DButton customtype={"primary-standard"} style={{marginLeft: 20}}>标准按钮</DButton>
  </>,
  mountNode,
);
```
