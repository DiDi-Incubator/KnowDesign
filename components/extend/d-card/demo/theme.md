---
order: 5
title: 主题色
---

theme支持default，success，error，warning，info，gray等6种主题。

```jsx
import { DCard } from '@didi/dcloud-design';
import {
  EditFilled,
  DeleteFilled
} from '@ant-design/icons';

const DExample: React.FC = () => { 
  return (
    <div>
     <DCard
        title="Default Theme"
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
              label: '指标2',
              value: '20%'
            }, {
              label: '指标2',
              value: '20%'
            }]
          }
        subTitle="我是副标题"
        rightHeader={
          <div>
              <EditFilled style={{cursor: 'pointer'}} />
              <DeleteFilled style={{ marginLeft: 5, cursor: 'pointer' }} />
          </div>
        }
        showProgress={true}
        progressLabel="已消耗30/30分钟"
        progressPercent={100}
        theme="default"
      />
       <DCard
        title="Gray Theme"
        value="99.999%"
        subTitle="我是副标题"
        rightHeader={
          <div>
              <EditFilled style={{cursor: 'pointer'}} />
              <DeleteFilled style={{ marginLeft: 5, cursor: 'pointer' }} />
          </div>
        }
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
        style={{marginTop: 16 }}
        showProgress={true}
        progressLabel="已消耗2/30分钟"
        progressPercent={80}
        theme="gray"
      />
      <DCard
        title="Success Theme"
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
              label: '指标2',
              value: '20%'
            }, {
              label: '指标2',
              value: '20%'
            }]
          }
        subTitle="我是副标题"
        rightHeader={
          <div>
              <EditFilled style={{cursor: 'pointer'}} />
              <DeleteFilled style={{ marginLeft: 5, cursor: 'pointer' }} />
          </div>
        }
        showProgress={true}
        progressLabel="已消耗0/30分钟"
        progressPercent={0}
        theme="success"
        style={{marginTop: 16 }}
      />
       <DCard
        title="Error Theme"
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
              label: '指标2',
              value: '20%'
            }, {
              label: '指标2',
              value: '20%'
            }]
          }
        subTitle="我是副标题"
        rightHeader={
          <div>
              <EditFilled style={{cursor: 'pointer'}} />
              <DeleteFilled style={{ marginLeft: 5, cursor: 'pointer' }} />
          </div>
        }
        style={{marginTop: 16 }}
        showProgress={true}
        progressLabel="已消耗2/30分钟"
        progressPercent={80}
        theme="error"
      />
       <DCard
        title="Warning Theme"
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
              label: '指标2',
              value: '20%'
            }, {
              label: '指标2',
              value: '20%'
            }]
          }
        subTitle="我是副标题"
        rightHeader={
          <div>
              <EditFilled style={{cursor: 'pointer'}} />
              <DeleteFilled style={{ marginLeft: 5, cursor: 'pointer' }} />
          </div>
        }
        style={{marginTop: 16 }}
        showProgress={true}
        progressLabel="已消耗2/30分钟"
        progressPercent={80}
        theme="warning"
      />
       <DCard
        title="Info Theme"
        value="99.999%"
        subTitle="我是副标题"
        rightHeader={
          <div>
              <EditFilled style={{cursor: 'pointer'}} />
              <DeleteFilled style={{ marginLeft: 5, cursor: 'pointer' }} />
          </div>
        }
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
        style={{marginTop: 16 }}
        showProgress={true}
        progressLabel="已消耗2/30分钟"
        progressPercent={80}
        theme="info"
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
