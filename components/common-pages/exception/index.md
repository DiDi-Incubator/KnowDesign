---
category: 公共页面
type:
title: Exception
subtitle: 兜底页面
---

## 何时使用

401、403、404、500 兜底页面

## 代码演示

```tsx | pure
import { Exception } from "knowdesign"

ReactDOM.render(
    <Exception.Page401>,
    mountNode
)

ReactDOM.render(
    <Exception.Page403>,
    mountNode
)

ReactDOM.render(
    <Exception.Page404>,
    mountNode
)

ReactDOM.render(
    <Exception.Page500>,
    mountNode
)
```
