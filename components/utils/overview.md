---
category: Utils
order: -1
title: Utils
subtitle: 通用函数库
---

## 何时使用

通用函数库，包含EventBus、tools和request相关
## 代码演示
```typescript
import { Utils } from 'knowdesign'


Utils.formatDate()

Utils.getCookie()

Utils.request(params[,config]) //默认为get请求,作为get请求使用时，如有参数传递，可自行拼接到url后，也可在config中传递 

Utils.delete(path[,config])
...
```



