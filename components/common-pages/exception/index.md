---
category: 公共页面
type: 
title: Exception 
subtitle: 兜底页面
---

## 何时使用

401、403、404、500兜底页面


## 代码演示

``` tsx | pure
import { Page401, Page403, Page404, Page500 } from "@didi/d1-packages"

ReactDOM.render(
    <Page401>,
    mountNode
)

ReactDOM.render(
    <Page403>,
    mountNode
)

ReactDOM.render(
    <Page404>,
    mountNode
)

ReactDOM.render(
    <Page500>,
    mountNode
)
```