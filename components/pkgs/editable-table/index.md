---
category: 组件
type: 数据录入
title: EditableTable
cols: 1
subtitle: 表格
---

## 何时使用
> 基于DTable进行二次封装，主要用于表格编辑的场景
>


## API

|   参数   |          说明           |       类型    |     默认值    |
|:--------:|:-----------------------:|:-------------:|:-------------:|
| rowKey  | 表格行 key 的取值(必填)              | string                            | -        |
| columns                | 表格列的配置描述，具体项见下表(必填)    | [ColumnsType](https://ant.design/components/table-cn/#Column)[] |      -      |
| dataSource             | 数据数组(必填)                      | object[]                                                     |      []      |-
| attrs                  | Table 其他的的一些扩展属性，参考 [Table API](https://ant.design/components/table-cn/#API) 或 DTable | object                                                       |     -       |
| rowData                | 新增行 rowData更新新增一行数据        |     object                               |     -       |
| setData                | 保存数据和删除数据是会调用             | () = void         | () => null  |
| okRow                  | 编辑状态下点击确定调用                | () => void                    | () => null |
| deleteRow              | 在删除行时调用                       | () => void                       |    () => null       |
| form                   | useForm的form 可以控制表格内表单      |  form                     |      -      |
