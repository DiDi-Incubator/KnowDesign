---
category: 组件
type: 反馈
title: Result & DResult
subtitle: 结果
cols: 1
---

用于反馈一系列操作任务的处理结果。 

## 何时使用

当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## API

### Result

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extra | 操作区 | ReactNode | - |
| icon | 自定义 icon | ReactNode | - |
| status | 结果的状态，决定图标和颜色 | `success` \| `error` \| `info` \| `warning` \| `info` |
| subTitle | subTitle 文字 | ReactNode | - |
| title | title 文字 | ReactNode | - |


### DResult

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 结果的状态，决定图标和颜色 | `404` \| `403` \| `500` |
| explain | explain 文字 | ReactNode | - |

更多配置项，请参考上边 `Result`。
