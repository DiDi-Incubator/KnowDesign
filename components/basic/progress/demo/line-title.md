---
order: 13
title:
  zh-CN: 带标题的进度条
  en-US: Progress bar
---

## zh-CN

带标题的标准进度条。

## en-US

A standard progress bar with titleA.

```jsx
import { Progress } from 'dcloud-design';

ReactDOM.render(
  <>
    <Progress 
      percent={70} 
      strokeWidth={20}
      title="标题标题"
    />
    <Progress 
      percent={100} 
      strokeWidth={20}
      title="标题标题"
    />
  </>,
  mountNode,
);
```
