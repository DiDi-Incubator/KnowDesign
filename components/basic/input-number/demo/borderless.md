---
order: 6
title:
  zh-CN: 无边框
  en-US: Borderless
---

## zh-CN

没有边框。

## en-US

No border.

```jsx
import { InputNumber } from 'knowdesign';

ReactDOM.render(<>
<InputNumber min={1} max={10} defaultValue={3} bordered={false} />
<InputNumber min={1} max={10} defaultValue={3} bordered={false} className='dcloud-input-number-borderless-extra' />
</>, mountNode);
```
