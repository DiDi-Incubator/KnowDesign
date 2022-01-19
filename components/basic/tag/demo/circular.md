---
order: 8.1
title:
  zh-CN: 圆形标签
  en-US: circular label
---

## zh-CN

可通过设置`className`为`ant-tag-circular`,启用圆形标签

## en-US


```jsx
import { Tag } from '@didi/dcloud-design';

ReactDOM.render(
  <>
    <div>
      <Tag className="ant-tag-primary ant-tag-circular">primary</Tag>
      <Tag color="success" className="ant-tag-circular" closable>success</Tag>
      <Tag color="processing" className="ant-tag-circular">processing</Tag>
      <Tag color="error" className="ant-tag-circular">error</Tag>
      <Tag color="warning" className="ant-tag-circular">warning</Tag>
      <Tag className="ant-tag-dark" className="ant-tag-circular">dark</Tag>
    </div>
  </>,
  mountNode,
);
```
