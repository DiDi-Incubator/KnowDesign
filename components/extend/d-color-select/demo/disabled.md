---
order: 2
title: 禁用模式
---

使用 disabled 禁用组件

```jsx
import { DColorSelect, DEmptyLine } from '@didi/dcloud-design';


ReactDOM.render(
  <div>
    <DColorSelect disabled />
    <DEmptyLine />
    <DColorSelect value="#4a90e2" disabled />
  </div>,
  mountNode,
);
```
