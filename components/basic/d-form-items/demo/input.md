---
order: 0
title: Input
---

这是一个基础的动态表单，可以使用 `dataSource` 来设置初始值。

```jsx
import React, {useState} from 'react';
import { DFormItems, DEmptyLine, Form, Button } from '@didi/dcloud-design';
import { processBasicFormItemsData } from '@didi/dcloud-design/utils';

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
      <DEmptyLine height={60} />
      <Button
        type="primary"
        onClick={handleSubmit}
      >
        提交
      </Button>
      <DEmptyLine />
      {results}
    </div>
  );
}


ReactDOM.render(<Demo />, mountNode);
```
