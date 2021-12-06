---
category: 组件
type: 布局
title: AppContainer
subtitle: 应用容器
---

## 何时使用

AppContainer, 提供统一入口，状态管理

## 代码演示

``` tsx | pure
const Container = AppContainer as containerType;

Container.connect = connect;
Container.context = context;
Container.eventBus = eventBus;
Container.useGlobalValue = useGlobalValue;
```

### Container



| 属性           | 说明                 | 类型                  | 默认值   |
| -----------   | --------------       | ------------------   | ------- |
| messageChange | message 改变后的回调   | (event: any) => void | ｜
| className     | 容器类名              | string               | |
| store         | 自定义全局数据         | any                  | |
| antdProvider  | antd 国际化配置数据    | any                  |  |
| intlProvider  | react 国际化数据      | any                  |  |


### context

React 的 context, 可以用来获取全局自定义数据

### useGlobalValue

useGlobalValue, 可以用来获取和更改全局自定义数据

```js
const [globalValue, setGlobalValue] = useGlobalValue();
```

### connect

高级组件，接收一个组件并返回一个组件，给类组件扩展全局 hook 参数

```js
<Component globalValue={globalValue} setGlobalValue={setGlobalValue} />
```

### eventBus

| 属性         | 说明             | 类型                                                                        | 默认值   |
| ----------- | --------------   | -------------------------------------------------------------------------- | ------- |
| on          | 添加函数          | (type: string, fn: (...args: any[]) => void, once: boolean = false) => void |         |
| off         | 是否关闭定时器     | (type: string, fn: (...args: any[]) => void) => void                        |         |
| removeAll   | 定时器调用时间     | (type: string) => void                                                      |         |
| emit        | 是否立即执行       | (type: string, ...args: any[]) => void                                      |         |
| once        | 添加只执行一次函数  | (type: string, fn: (...args, : any[]) => void) => void                      |         |

