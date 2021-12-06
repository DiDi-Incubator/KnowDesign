---
order: 1
title:
  zh-CN: 其他提示类型
  en-US: Other types of message
---

## zh-CN

包括成功、失败、警告。

## en-US

Messages of success, error and warning types.

```jsx
import { message, Button, Space } from 'dcloud-design';

const success = () => {
  message.success('This is a success message');
};

const error = () => {
  message.error('This is an error message');
};

const warning = () => {
  message.warning('This is a warning message');
};
const mess = () => {
  message.mess('您有一条新消息');
};

ReactDOM.render(
  <Space>
    <Button onClick={success}>Success</Button>
    <Button onClick={error}>Error</Button>
    <Button onClick={warning}>Warning</Button>
    <Button onClick={mess}>message</Button>
  </Space>,
  mountNode,
);
```
