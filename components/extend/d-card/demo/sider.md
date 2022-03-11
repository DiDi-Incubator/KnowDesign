---
order: 3
title: 侧边指标数据
---

传参siderData，支持侧边指标数据展示。


```jsx
import { DCard } from '@didi/dcloud-design';
import {
  SmileTwoTone,
} from '@ant-design/icons';

const DExample: React.FC = () => { 
  return (
    <DCard
      title="DCard"
      value="99.999%"
      icon={ <SmileTwoTone tyle={{cursor: 'pointer'}} />}
      siderData={
          [{
            label: '指标1',
            value: '30%'
          }, {
            label: '指标2',
            value: '20%'
          }, {
            label: '指标2',
            value: '20%'
          }, {
            label: '指标2',
            value: '20%'
          }, {
            label: '指标2',
            value: '20%'
          }, {
            label: '指标2',
            value: '20%'
          }]
        }
    />
  );
}

ReactDOM.render(
  <div>
    <DExample />
  </div>,
  mountNode,
);
```
