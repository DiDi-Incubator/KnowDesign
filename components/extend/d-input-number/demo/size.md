---
order: 1
title:
  zh-CN: 三种大小
  en-US: Sizes
---

## zh-CN

三种大小的数字输入框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `42px` 和 `27px` ，默认高度为 `36px`。

## en-US

There are three sizes available to a numeric input box. By default, the size is `32px`. The two additional sizes are `large` and `small` which means `40px` and `24px`, respectively.

```jsx
import { DInputNumber, Space } from 'dcloud-design';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
  <Space>
    <DInputNumber size="large" min={1} max={100000} defaultValue={3} onChange={onChange} />
    <DInputNumber min={1} max={100000} defaultValue={3} onChange={onChange} />
    <DInputNumber size="small" min={1} max={100000} defaultValue={3} onChange={onChange} />
  </Space>,
  mountNode,
);
```
