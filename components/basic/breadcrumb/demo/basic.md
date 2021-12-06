---
order: 0
title:
  zh-CN: 基本
  en-US: Basic Usage
---

## zh-CN

最简单的用法。

## en-US

The simplest use.

```jsx
import { Breadcrumb } from 'dcloud-design';

ReactDOM.render(
  <Breadcrumb>
    <Breadcrumb.Item>
      <a href="">首页</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">二级页面</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>三级页面</Breadcrumb.Item>
  </Breadcrumb>,
  mountNode,
);
```
