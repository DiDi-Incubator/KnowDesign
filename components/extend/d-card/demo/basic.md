---
order: 0
title: 基本卡片
---

卡片白底样式，基本属性包括标题和数值。


```jsx
import { DCard } from 'knowdesign';

const DExample: React.FC = () => { 
  return (
    <div>
      <DCard
        value="99.999%"
      />
      <DCard
        title="DCard"
        value="99.999%"
        style={{marginTop: 16 }}
      />
       <DCard
        title="DCard"
        value="99.999%"
        subTitle="我是副标题，ngnix"
        style={{marginTop: 16 }}
      />
    </div>
  );
}

ReactDOM.render(
  <div>
    <DExample />
  </div>,
  mountNode,
);
```
