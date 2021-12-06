---
order: 0
title:
  zh-CN: 进度条
  en-US: Progress bar
---

## zh-CN

标准的进度条。

## en-US

A standard progress bar.

```jsx
import { Progress } from 'dcloud-design';

ReactDOM.render(
  <>
    <Progress percent={30}/>
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={70} strokeColor="#32C5FF"/>
    <Progress percent={70} strokeColor="#FF6D01"/>
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </>,
  mountNode,
);
```
