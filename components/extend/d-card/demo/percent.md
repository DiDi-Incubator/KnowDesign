---
order: 4
title: 进度条
---

传参showProgress为true，progressLabel展示label，progressPercent展示进度比例。

```jsx
import { DCard } from 'dcloud-design';

const DExample: React.FC = () => { 
  return (
    <DCard
      title="DCard"
      value="99.999%"
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
            label: '指标3',
            value: '20%'
          }, {
            label: '指标3',
            value: '20%'
          }]
        }
      showProgress={true}
      progressLabel="已消耗21/30分钟"
      progressPercent={80}
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
