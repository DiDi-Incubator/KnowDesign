---
order: 0
title:
  zh-CN: 有链接提示
  en-US: LinkAlert
---

## zh-CN

通过 .alert-link 类，可以快速提供对应颜色的链接。

## en-US

Use the .alert-link utility className to quickly provide matching colored links within any alert.

```tsx
import Alert from '../';

ReactDOM.render(
  <>
    <Alert message={<span>Success Text with <a className='alert-link'>an example link</a>, and more...</span>} type="success" />
    <Alert message={<span>Info Text with <a className='alert-link'>an example link</a>, and more...</span>} type="info" />
    <Alert message={<span>Warning Text with <a className='alert-link'>an example link</a>, and more...</span>} type="warning" />
    <Alert message={<span>Error Text with <a className='alert-link'>an example link</a>, and more...</span>} type="error" />
  </>,
  mountNode);
```

<style>
.code-box-demo .ant-alert {
  margin-bottom: 16px;
}
</style>
