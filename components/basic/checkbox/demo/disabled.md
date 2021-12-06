---
order: 1
title:
  zh-CN: 不可用
  en-US: Disabled
---

## zh-CN

checkbox 不可用。

## en-US

Disabled checkbox.

```jsx
import { Checkbox } from 'dcloud-design';

ReactDOM.render(
  <>
    <Checkbox defaultChecked={false} disabled />
    <br />
    <Checkbox defaultChecked disabled />
  </>,
  mountNode,
);
```
