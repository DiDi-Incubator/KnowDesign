---
order: 0
title: 基本
---

``` tsx
import React, { useState } from 'react';
import { XForm as XFormComponent, IFormItem } from '../../x-form';
import { Form, Row, Col, Button, Input, Select, DatePicker } from '@didi/dcloud-design';
import { EditableTable } from '@didi/dcloud-design';
import moment from 'moment';

interface ITableData {
  id: string;
  edit?: boolean;
  [key: string]: any;
}

interface IEditRenderNode {
  (text?: any, record?: ITableData): any;
}

const data = [
  {
    id: 11113213211,
    title: '1',
    desc: '这是描述',
    state: 'open',
    created_at: '2021-10-08'
  },
  {
    id: 11113223211,
    title: '1',
    desc: '描述哈哈哈',
    state: 'all',
    created_at: '2021-10-08'
  },
]

export const IsEdit = (_text: any, record: ITableData) => {
  return (noEditRenderNode: IEditRenderNode, editRenderNode: IEditRenderNode) => {
    if (record?.edit) {
      return editRenderNode();
    }
    return noEditRenderNode();
  };
};

export const columns = [
  {
    dataIndex: 'title',
    title: '活动名称',
    key: 'title',
    render: (text, record) =>
      IsEdit(text, record)(
        () => text,
        () => {
          return (
            <div>
              <Form.Item
                className={`tpl-table-formitem`}
                name={'title'}
                key={'title'}
                // label={formItem.label}
                rules={[{ required: false, message: '' }]}
                // valuePropName={}
              >
                <Input/>
              </Form.Item>
            </div>
          );
        }
      ),
  },
  {
    dataIndex: 'state',
    title: '状态',
    key: 'state',
    render: (text, record) =>
      IsEdit(text, record)(
        () => (text === 'all' ? '全部' : '未解决'),
        () => {
          return (
            <div>
              <Form.Item
                className={`tpl-table-formitem`}
                name={'state'}
                key={'state'}
                rules={[{ required: false, message: '' }]}
                initialValue={'all'}
              >
                <Select>
                  {['all', 'open'].map(item => <Select.Option value={item}>{item}</Select.Option>)}
                </Select>
              </Form.Item>
            </div>
          );
        }
      ),
  },
  {
    dataIndex: 'desc',
    title: '描述',
    key: 'desc',
    render: (text, record) =>
      IsEdit(text, record)(
        () => text,
        () => {
          return (
            <div>
              <Form.Item
                className={`tpl-table-formitem`}
                name={'desc'}
                key={'desc'}
                rules={[{ required: false, message: '' }]}
                initialValue={record.desc}
              >
                <Input/>
              </Form.Item>
            </div>
          );
        }
      ),
  },
  {
    dataIndex: 'city',
    title: '城市',
    key: 'city',
    render: (text, record) =>
      IsEdit(text, record)(
        () => text,
        () => {
          return (
            <div>
              <Form.Item
                className={`tpl-table-formitem`}
                name={'city'}
                key={'city'}
                rules={[{ required: false, message: '' }]}
                initialValue={record.city}
              >
                <Input/>
              </Form.Item>
            </div>
          );
        }
      ),
  },
];

const Demo  =  () => {
  const [dataSource, setDataSource] = useState(data);
  const [form] = Form.useForm();
  const [rowData, setRowData] = useState({});
  const [tableForm] = Form.useForm();
  const formMap = [
    {
      key: "title",
      label: "活动名称",
      type: "input",
      placeholder: "请选择",
    },
    {
      key: "state",
      label: "状态",
      type: "select",
      options: [{value: 'all', label: '全部'}, {value: 'open', label: '未解决'}],
      placeholder: "请选择",
    },
    {
      key: "desc",
      label: "描述",
      type: "input",
      placeholder: "请输入",
    },
    {
      key: "city",
      label: "城市",
      type: "input",
      placeholder: "请输入",
    },
  ] as unknown as IFormItem[];

  const onAdd = async () => {
    const value = await form.getFieldsValue();
    value.id = (Math.random() * 1000000).toFixed(0)
    setRowData(value)
  }
  return <div>
    <div style={{ marginTop: 20, background: '#fff' }}>
      <Row gutter={10}>
        <Col span={20}>
          <XFormComponent formMap={formMap} form={form} formData={[]} formItemColSpan={6} formLayout={{
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          }}/>
        </Col>
        <Col span={4}><Button onClick={onAdd}>新增一行</Button></Col>
      </Row>
      <Form form={tableForm}>
        <EditableTable
          columns={columns}
          dataSource={dataSource}
          name=""
          rowData={rowData}
          setData={setDataSource}
          form={tableForm}
        />
      </Form>
    </div>
  </div>
}

ReactDOM.render(
    <Demo />,
    mountNode
)

```