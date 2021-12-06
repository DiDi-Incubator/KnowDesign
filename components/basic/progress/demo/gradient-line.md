---
order: 11
title:
  zh-CN: 自定义进度条渐变色
  en-US: Custom line gradient
---

## zh-CN

`linear-gradient` 的封装。推荐只传两种颜色。

## en-US

A package of `linear-gradient`. It is recommended to only pass two colors.

```jsx
import { Progress } from 'dcloud-design';

const Demo = () => (
  <>
    <Progress
      strokeColor={{
        '0%': '#2F81F9',
        '100%': '#87d068',
      }}
      percent={99.9}
    />
    <Progress
      strokeColor={{
        from: '#2F81F9',
        to: '#87d068',
      }}
      percent={99.9}
      status="active"
    />
    <Progress
      type="circle"
      strokeLinecap="square"
      strokeColor={{
        '0%': '#2F81F9',
        '100%': 'rgba(47,129,249,0.12)',
      }}
      percent={90}
    />
    <Progress
      type="circle"
      strokeColor={{
        '0%': '#2F81F9',
        '100%': '#87d068',
      }}
      percent={100}
    />
  </>
);

ReactDOM.render(<Demo />, mountNode);
```
