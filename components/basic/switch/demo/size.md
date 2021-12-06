---
order: 3
title:
  zh-CN: 两种大小
  en-US: Two sizes
---

## zh-CN

`size="small"` 表示小号开关。

## en-US

`size="small"` represents a small sized switch.

```jsx
import { Switch } from 'dcloud-design';

ReactDOM.render(
  <>
    <Switch defaultChecked />
    <br />
    <Switch size="small" defaultChecked />
  </>,
  mountNode,
);
```
