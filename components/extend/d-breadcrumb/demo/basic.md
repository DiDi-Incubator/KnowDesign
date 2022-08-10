---
order: 0
iframe: 300
reactRouter: react-router-dom
title:
  zh-CN: 基本
  en-US: Basic Usage
---

## zh-CN

最简单的用法。

## en-US

The simplest use.

```jsx
import { DKSBreadcrumb } from 'knowdesign';

ReactDOM.render(
  <DKSBreadcrumb breadcrumbs={[{
    label: 'Application Center',
    aHref: '/',
  }, {
    label: 'Application List',
    aHref: '/',
  }, {
    label: 'An Application',
    aHref: '/',
  }]} >
  </DKSBreadcrumb>,
  mountNode,
);
```
