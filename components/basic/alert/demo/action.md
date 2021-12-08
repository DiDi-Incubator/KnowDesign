---
order: 13
title:
  zh-CN: 操作
  en-US: Custom action
---

## zh-CN

可以在右上角自定义操作项。

## en-US

Custom action.

```tsx
import React from 'react';
import { Alert, Button, Space } from 'antd';

ReactDOM.render(
  <>
    <Alert
      message="Success Tips"
      type="success"
      showIcon
      action={
        <Button size="small" type="text">
          UNDO
        </Button>
      }
      closable
    />
    <Alert
      message="Error Text"
      showIcon
      description="Error Description Error Description Error Description Error Description"
      type="error"
      action={
        <Button size="small" danger>
          Detail
        </Button>
      }
    />
    <Alert
      message="Warning Text"
      type="warning"
      action={
        <Space>
          <Button size="small" type="ghost">
            Done
          </Button>
        </Space>
      }
      closable
    />
    <Alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
      action={
        <Space direction="vertical">
          <Button size="small" type="primary">
            Accept
          </Button>
          <Button size="small" danger type="ghost">
            Decline
          </Button>
        </Space>
      }
      closable
    />
  </>,
  mountNode,
);
```

<style>
.code-box-demo .ant-alert {
  margin-bottom: 16px;
}
</style>
