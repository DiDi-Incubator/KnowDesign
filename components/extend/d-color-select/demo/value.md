---
order: 1
title: 受控模式
---

提供 value 和 onChange 属性，支持受控模式的组件

```jsx
import { useState } from 'react';
import { DColorSelect } from '@didi/dcloud-design';

const Demo: React.FC = () => {
  const [color, setColor] = useState('#746aa7');
  return (
    <DColorSelect
      value={color}
      onChange={newColor => {
        setColor(newColor);
      }}
    />
  )
}

ReactDOM.render(
  <div>
    <Demo />
  </div>,
  mountNode,
);
```
