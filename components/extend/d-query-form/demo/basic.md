---
order: 0
title: 基本
---

和 `Table` 组件类似，传入 `columns` 属性，会自动生成 `DQueryForm`。
监听 `onChange` 属性使用起返回值进行 `query` 查询。

```jsx
import { useState } from 'react';
import { DQueryForm, InputNumber, Card, Button, Modal } from '@didi/dcloud-design';


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
    name: 'test',
    level: 'p1',
  }
  const [result, setResult] = useState(initialValues);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = queryValue => {
    setResult(queryValue);
  };
  return (
    <div>
      <DQueryForm 
        onChange={handleChange} 
        onSearch={handleChange}
        columns={columns} 
        initialValues={initialValues}
      />
      <h3>结果：</h3>
      <div>{JSON.stringify(result)}</div>

      <Card>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Card>
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
