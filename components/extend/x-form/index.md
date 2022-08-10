---
category: 业务组件
type: 表单
cols: 1
title: XForm
subtitle: 增强表单
---

## 何时使用
通过配置快速生成表单项

## API

| 参数                 | 说明                                                             | 类型                                                       | 默认值                                              |
| :------------------- | :--------------------------------------------------------------- | :--------------------------------------------------------- | :-------------------------------------------------- |
| formMap              | 表单配置                                                         | IFormItem[];                                               | []                                                  |
| formData             | 表单数据                                                         | object                                                     | -                                                   |
| form                 | Form 经 Form.useForm() 创建的 form 控制实实例                    | FormInstance                                               | -                                                   |
| wrappedComponentRef  | 控制 Form 的 ref                                                 | -                                                          | []                                                  |
| onFinish             | 提交表单且数据验证成功后回调事件， 配合 modal 和 drawer 表单使用 | function(values) {}                                        | -                                                   |
| formLayout           | formItem 的 label 和 field 宽度，                                | -                                                          | { labelCol: { span: 4 }, wrapperCol: { span: 20 } } |
| layout               | 表单布局                                                         | horizontal \| vertical \| inline                           | horizontal                                          |
| onHandleValuesChange | 表单项 change 时触发                                             | function(formName: string, info: { changedFields, forms }) | -                                                   |
| formItemColSpan      | formItem 所占的 col                                              | -                                                          | -                                                   |
| contentRender        | 渲染 modalForm 和 drawerForm 内容区使用                          | -                                                          | []                                                  |
| submitter            | 提交按钮配置， 配合 modal 和 drawer 表单使用                     | -                                                          | -                                                   |

### IFormItem
>表单项的配置

| 参数 | 说明            | 类型 | 默认值 |
| :--- | :-------------- | :--- | ------ |
| key  | 表单项的Key |   string   |     -   |
| label  | 表单项的lable |   string   | -       |
| type  | 表单项的类型 |   FormItemType   |   'input'     |
| value  | - |   string   |  -      |
| options  | 下拉选的数据 |  []    |     -   |
| attr  | formItem中元素的属性 |  {}    |   -     |
| defaultValue  | 表单元素的默认值| string \| number \| any[]    |-        |
| rules  | 表单项的校验规则|  []    |  []      |
| invisible  | 是否隐藏 | boolean      |   false     |
| colSpan  | 表单项所占的列数 |   any   | -       |
| isCustomStyle  | 是否添加ant-form-item-custom类名 |  string    |     -   |
| customFormItem  | type为custom时，自定义表单元素 |  any    |    -    |
| treeData  | type为treeSelect时，渲染的数据 |  any[]    |    -    |
| formAttrs  | 其他表单项的属性 | {}     | -       |



### FormItemType
>表单项的类型

| 参数 | 说明            |
| :--- | :-------------- | 
| input  | 输入框 |  
| input_number  | 数字 |  
| text_area  | 文本域 |  
| select  | 下拉选 |  
| _switch  | 开关 |  
| check_box  | 复选框 |  
| date_picker  | 日期选择 |  
| range_picker  | 时间范围选择器 |  
| radio_group  | 单选 |  
| upload  | 上传 |  
| text  | 纯文本 |  
| cascader  | 日历 |  
| autoComplete  | 自动完成 |  
| timePicker  | 时间选择 |  
| treeSelect  | 树选择 | 
| custom  | 自定义元素 |  
