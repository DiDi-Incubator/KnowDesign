---
category: 业务组件
type: 数据录入
title: StepsForm
cols: 1
subtitle: 表单
---


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前表单的步骤数，从 `0` 开始 | `number` | 0 |
| onCurrentChange | current 发生改变的事件 | `(current:number)=>void` | - |
| onFinish | 表单最后一步提交成功触发，如果返回`true`就会自动重置表单(包括`StepForm`变回第一步) | `(values:T)=>void \| boolean` | - |
| stepsProps | StepsForm 自带的 Steps 的 props，使用方式与 [antd](https://ant.design/components/steps-cn/) 相同，但是去掉了 current 和 onChange | [props](https://ant.design/components/steps-cn/#API) | - |
|submitter|  操作按钮配置， false时不展示 |SubmitterProps \| boolean|-|


### SubmitterProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| buttonConfig | 操作按钮文字 | `{submitText, resetText, nextText}` | submitText: '提交' resetText: '上一步'  nextText: '下一步'   |
| submitButtonProps | 提交和下一步按钮的 props | [ButtonProps](https://ant.design/components/button-cn/) | - |
| resetButtonProps | 上一步按钮的 props | [ButtonProps](https://ant.design/components/button-cn/) | - |
| render | 自定义操作的渲染 | `false`\|`(props: { form, onSubmit, onPrev, step }, submitterDom: JSX[]) => React.ReactNode`   | - |


### StepsForm.Item 

> 单步的表单

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|title|单步的标题|string|-|
|name|单步的key, 不传默认取index|string|-|
|stepProps|单步的配置和Steps.Step相同（不包含title）|object|-|
|XFormProps|XForm的配置，不含onFinish|object|-|
| onFinish | 表单提交成功触发 | `(values) => boolean` | - |
