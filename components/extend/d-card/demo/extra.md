---
order: 1
title: 带操作按钮
---

自定义右上角操作栏。


```jsx
import { DCard } from 'knowdesign';
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
        value="99.999%"
        icon={<SmileTwoTone />}
        rightHeader={
          <div>
            <EditFilled style={{cursor: 'pointer'}} />
            <DeleteFilled style={{ marginLeft: 5, cursor: 'pointer' }} />
          </div>
        }
      />
      <DCard
        title="DCard"
        tooltip="prompt text"
        subTitle="我是副标题，ngnix"
        value="99.999%"
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
