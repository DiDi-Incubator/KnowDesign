---
order: 20
title:
  zh-CN: 无边框
  en-US: Borderless
---

## zh-CN

没有边框。

## en-US

No border.

```jsx
import { Input } from 'knowdesign';

ReactDOM.render(<>
<Input placeholder="Borderless" bordered={false}  />
<br />
<br />
<Input placeholder="Borderless" bordered={false} className='dcloud-input-borderless-extra' />
</>, mountNode);
```
