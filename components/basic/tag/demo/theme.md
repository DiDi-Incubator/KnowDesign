---
order: 9
title: 主题色标签
---

主题色标签

```jsx
import { DTag } from 'dcloud-design';

const BasicExample: React.FC = () => { 
  return (
    <div>
      <DTag
      >标签样式1</DTag>
      <DTag
        theme="success"
      >标签样式2</DTag>
      <DTag
        theme="error"
      >标签样式3</DTag>
      <DTag
        theme="warning"
      >标签样式4</DTag>
      <DTag
        theme="info"
      >标签样式5</DTag>
    </div>
  );
}

ReactDOM.render(
  <div>
    <BasicExample />
  </div>,
  mountNode,
);
```
