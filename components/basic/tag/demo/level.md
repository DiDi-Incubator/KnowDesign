---
order: 9
title: 级别标签
---

级别标签 P0 | P1 | P2 | P3 | P4 | P5 | P6

```jsx
import { DTag } from 'dcloud-design';

const BasicExample: React.FC = () => { 
  return (
    <div>
      <DTag
        level="P0"
      />
      <DTag
        level="P1"
      />
      <DTag
        level="P2"
      />
      <DTag
        level="P3"
      />
      <DTag
        level="P4"
      />
      <DTag
        level="P5"
      />
      <DTag
        level="P6"
      />
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
