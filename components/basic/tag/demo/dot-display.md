---
order: 8.2
title:
  zh-CN: 超过100px 打点显示
  en-US: 超过100px 打点显示
---

## zh-CN

可通过设置`className`为`ant-tag-dot-display`,启用打点显示

注意：可关闭按钮不适合打点显示

## en-US


```jsx
import { Tag } from 'antd';

ReactDOM.render(
  <>
    <div>
      <Tag className="ant-tag-primary ant-tag-dot-display">primaryprimaryprimaryprimary</Tag>
      <Tag color="success" className="ant-tag-dot-display">successsuccesssuccesssuccess</Tag>
      <Tag color="processing" className="ant-tag-dot-display">processingprocessingprocessingprocessing</Tag>
      <Tag color="error" className="ant-tag-dot-display">errorerrorerrorerrorerror</Tag>
      <Tag color="warning" className="ant-tag-dot-display">warning</Tag>
      <Tag className="ant-tag-dark" className="ant-tag-dot-display">dark</Tag>
    </div>
  </>,
  mountNode,
);
```
