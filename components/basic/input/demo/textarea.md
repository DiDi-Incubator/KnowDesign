---
order: 5
title:
  zh-CN: 文本域
  en-US: TextArea
---

## zh-CN

用于多行输入。

## en-US

For multi-line input.

```jsx
import { Input } from 'knowdesign';

const { TextArea } = Input;

ReactDOM.render(<>
  <TextArea rows={4} />
  <br />
  <br />
  <TextArea rows={4} bordered={false} className='dcloud-input-borderless-extra' />
</>, mountNode);
```
