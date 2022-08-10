---
order: 0
title: Input
---

这是一个基础的动态表单，可以使用 `dataSource` 来设置初始值。

```jsx
import React, {useState} from 'react';
import { DFormItems, Form, Button } from 'knowdesign';
import { processBasicFormItemsData } from 'knowdesign/utils';

const Demo = props => {
  const [form] = Form.useForm();
  const { validateFields } = form;
  const [results, setResults] = useState();
  const handleSubmit = () => {
    validateFields().then(values => setResults(JSON.stringify(processBasicFormItemsData(values))))
  };
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <DFormItems          
        fieldName="inputParams"
        form={form}
        columns={[
          {
            type: 'input',
            title: '自定义Value',
            required: true,
          },
        ]} 
      />
      <div style={{ width: '100%', height: 60 }}></div>
      <Button
        type="primary"
        onClick={handleSubmit}
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
