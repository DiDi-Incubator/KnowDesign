---
category: 业务组件
type: 数据展示
title: D-Table
subtitle: 表格
---

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## API

| 参数                   | 说明                                                                                                                                                                      | 类型                                                                | 默认值     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------- |
| showHeader             | 是否显示顶部操作区                                                                                                                                                        | boolean                                                             | true       |
| paginationProps        | 分页器，参考[配置项](https://ant.design/components/table-cn/#pagination)或 [pagination](https://ant.design/components/pagination-cn/) 文档，设为 false 时不展示和进行分页 | object                                                              | -          |
| noPagination           | 是否隐藏分页                                                                                                                                                              | boolean                                                             | false      |
| rowKey                 | 表格行 key 的取值，可以是字符串或一个函数(必填)                                                                                                                           | string \|function(record): string                                   | key        |
| columns                | 表格列的配置描述，具体项见下表(必填)                                                                                                                                      | [ColumnsType](https://ant.design/components/table-cn/#Column)[]     |            |
| dataSource             | 数据数组(必填)                                                                                                                                                            | object[]                                                            |            |
| loading                | 页面是否加载中                                                                                                                                                            | boolean \| [Spin Props](https://ant.design/components/spin-cn/#API) | false      |
| attrs                  | Table 其他的的一些扩展属性，参考 [Table API](https://ant.design/components/table-cn/#API)                                                                                 | object                                                              |            |
| reloadData             | 点击刷新图标后执行的函数                                                                                                                                                  | (params?: object) => any                                            |            |
| getOpBtns              | 需要显示的功能按钮                                                                                                                                                        | (params?: object) => ITableBtn[];                                   | () => null |
| getJsxElement          | 自定义的 JSX 元素                                                                                                                                                         | (params?: object) => JSX.Element                                    | () => null |
| tableHeaderSearchInput | 如果存在显示搜索框                                                                                                                                                        | ISearchInput                                                        |            |
| searchInputRightBtns   | 搜索框左侧的按钮集合                                                                                                                                                      | ITableBtn[]                                                         | []         |
| attrs                  | 其他的 table 属性                                                                                                                                                         | any                                                                 | -          |

## ITableBtn

| 参数       | 说明                                                      | 类型                                                            | 默认值 |
| ---------- | --------------------------------------------------------- | --------------------------------------------------------------- | ------ |
| clickFunc  | 点击回调                                                  | () => void                                                      | -      |
| type       | 按钮类型                                                  | primary \| ghost \| dashed \| link \| text \| default \| custom | -      |
|customFormItem|自定义按钮元素|JSX.Element|-|
| label      | 按钮中显示的文字                                          | string \|JSX.Element                                            |        |
| className  | 按钮类名                       | string                                                          |        |
| noRefresh  | 如果为 false 返回带有点击事件、loading 和 disabled 的按钮 | boolean                                                         |        |
| disabled   | 如果 noRefresh 为 false 时生效，是否禁用按钮              | boolean                                                         |        |
| loading    | 如果 noRefresh 为 false 时生效，是否开启 loading 效果     | boolean                                                         |        |

## ISearchInput

| 参数          | 说明                                               | 类型                    | 默认值       |
| ------------- | -------------------------------------------------- | ----------------------- | ------------ |
| searchTrigger | 触发搜索的方式                                     | change \| blur \| enter | -            |
| submit        | 点击搜索图标、清除图标，或按下回车键时的回调(必填) | (params?: any) => any   |              |
| text          | 搜索框描述                                         | string                  |              |
| placeholder   | 属性提供可描述输入字段预期值的提示信息             | string                  | 请输入关键字 |
