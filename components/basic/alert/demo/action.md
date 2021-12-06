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
import { Alert, Button, Space, Divider } from 'dcloud-design';

ReactDOM.render(
  <>
    <Alert
      message="Success Tips"
      type="success"
      showIcon
      action={
        <>
          <a href="http://www.baidu.com" target="_blank">立即认证</a>
          <Divider type="vertical" />
          <a href="https://www.didiglobal.com/" target="_blank">计费说明</a>
        </>
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
