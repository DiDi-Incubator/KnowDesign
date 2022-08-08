---
order: 1
title: 模式切换
---

修改 `mode`、`showOptionBtns`、`showCollapseButton` 参数，观察组件的变化。

```jsx
import { useState } from 'react';
import { DQueryForm, InputNumber, Switch } from '@didi/dcloud-design';
const queryColumns = [{
    type: 'select',
    title: '展示模式(mode)',
    dataIndex: 'mode',
    options: [
      {
        title: '占满整行，左对齐',
        value: 'full',
      },
      {
        title: '根据标题右对齐',
        value: 'align',
      }
    ],
},{
    type: 'custom',
    title: '是否展示Option(showOptionBtns)',
    dataIndex: 'showOptionBtns',
    valuePropName: 'checked',
    component: (
      <Switch />
    )
},{
    type: 'custom',
    title: '是否展示收起(showCollapseButton)',
    dataIndex: 'showCollapseButton',
    valuePropName: 'checked',
    component: (
      <Switch />
    )
}]

const columns = [
  {
    type: 'input',
    title: '实例名称',
    dataIndex: 'name',
  },
  {
    type: 'select',
    title: '报警等级',
    dataIndex: 'level',
    options: [
      {
        title: '全部',
        value: 'all',
      },
      {
        title: 'P0',
        value: 'p0',
      },
      {
        title: 'P1',
        value: 'p1',
      },
      {
        title: 'P2',
        value: 'p2',
      },
    ],
  },
  {
    type: 'select',
    title: '任务状态',
    dataIndex: 'status',
    selectMode: 'multiple',
    options: [
      {
        title: '进行中',
        value: 'processing',
      },
      {
        title: '成功',
        value: 'success',
      },
      {
        title: '失败',
        value: 'fail',
      },
    ],
  },
  {
    type: 'custom',
    title: '机器数量',
    dataIndex: 'number',
    component: (
      <InputNumber
        placeholder="请输入机器数量"
        style={{ marginTop: 4, width: '100%' }}
        min={0}
        precision={0}
      />
    ),
  },
];

const Demo: React.FC = () => {
  const initialValues = {
    mode: "full",
    showOptionBtns: true,
    showCollapseButton: true,
  }
  const [query, setQuery] = useState(initialValues);
  const [result, setResult] = useState({});
  const handleQueryChange = queryValue => {
    setQuery(queryValue);
  };
  const handleResultChange = queryValue => {
    setResult(queryValue);
  };

  return (
    <div style={{
      background: '#f0f2f5',
      padding: 20,
    }}>
      <h4>选择DQueryForm属性</h4>
      <DQueryForm
        onChange={handleQueryChange} 
        columns={queryColumns}
        showOptionBtns={false}
        initialValues={initialValues}
      />
      <div style={{ width: '100%', height: 60 }}></div>
      <DQueryForm
        onChange={handleResultChange} 
        onSearch={handleResultChange}
        columns={columns}
        {...query}
      />
      <div style={{ width: '100%', height: 60 }}></div>
      <div 
      style={{
        background: '#fff',
        padding: 10,
      }}
      >结果：{JSON.stringify(result)}</div>
    </div>
  );
}

ReactDOM.render(
  <div>
    <Demo />
  </div>,
  mountNode,
);
```
