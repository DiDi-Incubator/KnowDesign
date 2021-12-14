---
order: 1
title:
  zh-CN: 三种大小
  en-US: Three sizes of Input
---

## zh-CN

我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 `42px`、`36px` 和 `27px`。

## en-US

There are three sizes of an Input box: `large` (42px), `default` (36px) and `small` (27px).

```jsx
import { DInput } from 'dcloud-design';

ReactDOM.render(
  <>
    默认<DInput placeholder="default size"  />
    <br />
    <br />
    大<DInput size="large" placeholder="large size"  />
    <br />
    <br />
    小<DInput size="small" placeholder="small size" />
    <br />
    <br />
    禁用 <DInput disabled placeholder="default size" />
  </>,
  mountNode,
);
```
