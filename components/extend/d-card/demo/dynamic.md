---
order: 7
title: 动态卡片
---

动态卡片。


```jsx
import { DCard } from '@didi/dcloud-design';
import {
  EditFilled,
  SmileTwoTone,
  DeleteFilled,
  ClusterOutlined,
} from '@ant-design/icons';

const DExample: React.FC = () => { 
  return <>
      <DCard
        title="DCard"
        tooltip="prompt text"
        subTitle="我是副标题，ngnix"
        value="99.999%"
        showDynamic={true}
        icon={<ClusterOutlined />}
        style={{marginTop: 16 }}
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
        rightHeader={
          <div>
            <EditFilled/>
            <DeleteFilled style={{ marginLeft: 5 }} />
          </div>
        }
      />
  </>;
}

ReactDOM.render(
  <div>
    <DExample />
  </div>,
  mountNode,
);
```
