---
order: 3
title: Custom
---

当 `type=custom` 时，可以通过 `component` 属性传入组件

```jsx
import React, {useState} from 'react';
import { DFormItems, Form, Button, DatePicker, InputNumber } from '@didi/dcloud-design';
import { processBasicFormItemsData } from '@didi/dcloud-design/utils';
import moment from 'moment';

const Demo = props => {
  const [form] = Form.useForm();
  const { validateFields } = form;
  const [results, setResults] = useState();
  const customDataSource = [['张三', 23, moment('1996-12-23'), '程序员']];
  const handleSubmit = () => {
     validateFields().then(values => 
       setResults(JSON.stringify(processBasicFormItemsData(values)))
       )
  };
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <DFormItems
        fieldName="customParams"
        form={form}
        dataSource={customDataSource}
        columns={[
          {
            type: 'input',
            title: '姓名',
            required: true,
          },
          {
            type: 'custom',
            title: '年龄',
            required: true,
            component: (
              <InputNumber style={{ width: '100%' }} min={0} precision={0} />
            ),
          },
          {
            type: 'custom',
            title: '生日',
            required: true,
            component: <DatePicker style={{ width: '100%' }} />,
          },
          {
            type: 'select',
            title: '职业',
            required: true,
            selectOptions: [
              {
                title: '程序员',
                value: '程序员',
              },
              {
                title: '产品经理',
                value: '产品经理',
              },
              {
                title: '设计师',
                value: '设计师',
              },
            ],
          },
        ]}
      />
      <div style={{ width: '100%', height: 60 }}></div>
      <Button
        type="primary"
        onClick={handleSubmit}
        htmlType="submit"
      >
        提交
      </Button>
      <div style={{ width: '100%', height: 60 }}></div>
      {results}
    </div>
  );
}


ReactDOM.render(<Demo />, mountNode);
```
