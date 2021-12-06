---
order: 0
title:
  en-US: Basic Usage
  zh-CN: 基本用法
---

## zh-CN

简单的表格，最后一列是各种操作。

## en-US

Simple table with actions.

```jsx
import { Table, Tag, Space, Dropdown, Menu, Divider } from 'dcloud-design';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" href="">
         操作1
      </a>
    </Menu.Item>
   <Menu.Item>
      <a target="_blank" href="">
         操作2
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" href="">
         操作3
      </a>
    </Menu.Item>  </Menu>
);

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '工单类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '审核人',
    dataIndex: 'auditor',
    key: 'auditor',
  },
  {
    title: '更新时间',
    dataIndex: 'dateTime',
    key: 'dateTime',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>操作</a>
        <Divider type="vertical" />
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            更多操作
           <DownOutlined />
          </a>
        </Dropdown>
        <Divider type="vertical" />
        <a style={{color: "#EF645C"}}>删除</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'task-hw-2473822756794270718',
    type: '发布更新',
    auditor: 'Lilimuzi',
    dateTime: '2019-01-12 16:14:00'
  },
 {
    key: '2',
    name: 'task-hw-2473822756794270718',
    type: '发布更新',
    auditor: 'Lilimuzi',
    dateTime: '2019-01-12 16:14:00'
  },
  {
    key: '3',
    name: 'task-hw-2473822756794270718',
    type: '发布更新',
    auditor: 'Lilimuzi',
    dateTime: '2019-01-12 16:14:00'
  },
  {
    key: '4',
    name: 'task-hw-2473822756794270718',
    type: '发布更新',
    auditor: 'Lilimuzi',
    dateTime: '2019-01-12 16:14:00'
  },
  {
    key: '5',
    name: 'task-hw-2473822756794270718',
    type: '发布更新',
    auditor: 'Lilimuzi',
    dateTime: '2019-01-12 16:14:00'
  },
];

ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);
```
