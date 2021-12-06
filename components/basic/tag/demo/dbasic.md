---
order: 8
title: 基本标签
---

基本标签 可调大小 可以通过添加 closable 变为可关闭标签。可关闭标签具有 onClose 事件。


```jsx
import { DTag } from 'dcloud-design';

function log(e) {
  console.log(e);
}
const BasicExample: React.FC = () => { 
  return (
    <div>
      <DTag
        size="small"
      >标签样式1</DTag>
      <DTag
        size="middle"
      >标签样式2</DTag>
      <DTag
        size="large"
      >标签样式3</DTag>
      <DTag closable onClose={log}>
        标签样式4
      </DTag>
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
