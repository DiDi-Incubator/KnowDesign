---
category: 自定义Hook
cols: 1
type: hook
title: useRequest
subtitle: 网络请求
---

## 何时使用
 
React网络请求场景使用 useRequest 就够了

## API

Result

| 参数 | 说明 | 类型 | 
| --- | --- | --- | 
| data | 返回的数据 | TData \| undefined  |
| loading | 是否正在执行 | boolean  |
| run | 手动触发 service 执行，参数会传递给 service | (...params: TParams) => void  |
| cancel | 取消当前正在进行的请求 | () => void |

req

| 参数 | 说明 | 类型 | 是否必需 |
| --- | --- | --- | --- |
| url | 请求路径 | string  | true |
| body | 参数 | any | - |
| method | 方法 | GET \| POST \| PUT \| DELETE  | - |
| requestInit | 请求头信息 | xxx | - |

Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 内置 fetch、axios | fetch \| axios  | axios |
| manual | 默认 false。 即在初始化时自动执, 如果设置为 true，则需要手动调用 run 触发执行 | boolean  | false |
| onSuccess | service resolve 时触发 | (data: TData, params: TParams) => void  | - |
| onError | service reject 时触发 | (...params: TParams) => void  | - |
| onFinally | service 执行完成时触发 | () => void(...params: TParams) => void | - |
| debounceWait | 防抖等待时间, 单位为毫秒，设置后，进入防抖模式 | number | - |
| onFinally | 节流等待时间, 单位为毫秒，设置后，进入节流模式 | number | - |
