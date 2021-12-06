---
category: Utils
type: 
cols: 1
title: Event Bus
subtitle: 事件通信
---

## 何时使用

可用于跨层级组件中通信，事件监听

```js
const eventBus = new EventBus();
```

## API

| 属性         | 说明             | 类型                                                                        | 默认值   |
| ----------- | --------------   | -------------------------------------------------------------------------- | ------- |
| on          | 添加函数          | (type: string, fn: (...args: any[]) => void, once: boolean = false) => void |         |
| off         | 是否关闭定时器     | (type: string, fn: (...args: any[]) => void) => void                        |         |
| removeAll   | 定时器调用时间     | (type: string) => void                                                      |         |
| emit        | 是否立即执行       | (type: string, ...args: any[]) => void                                      |         |
| once        | 添加只执行一次函数  | (type: string, fn: (...args, : any[]) => void) => void                      |         |

