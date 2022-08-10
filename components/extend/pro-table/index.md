---
category: 业务组件
type: 数据展示
title: ProTable
subtitle: 增强表格
cols: 1
---

## 何时使用
基于 DTable 和 DQueryForm进行封装，快速生成表格页面


## API
| 参数                   | 说明                                                                                                                                                                      | 类型                                                                | 默认值     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------- |
| showQueryForm             | 是否显示筛选项                                                                                                                                                        | boolean                                                             | false      |
|tableProps|table的配置|[ITableExtendProps](#ITableExtendProps)|-|
|queryFormProps|筛选项的配置|[IQueryFormProps](#IQueryFormProps)|-|


####  ITableExtendProps
| 参数                   | 说明                                                                                                                                                                      | 类型                                                                | 默认值     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------- |
| showHeader             | 是否显示顶部操作区                                                                                                                                                        | boolean                                                             | true       |
| paginationProps        | 分页器，参考[配置项](https://ant.design/components/table-cn/#pagination)或 [pagination](https://ant.design/components/pagination-cn/) 文档，设为 false 时不展示和进行分页 | object                                                              | -          |
| noPagination           | 是否隐藏分页                                                                                                                                                              | boolean                                                             | false      |
| rowKey                 | 表格行 key 的取值，可以是字符串或一个函数(必填)                                                                                                                           | string \|function(record): string                                   | key        |
| columns                | 表格列的配置描述，具体项见下表(必填)                                                                                                                                      | [ITableColumnsType](#ITableColumnsType)[]     |            |
| dataSource             | 数据数组(必填)                                                                                                                                                            | object[]                                                            |            |
| loading                | 页面是否加载中                                                                                                                                                            | boolean \| [Spin Props](https://ant.design/components/spin-cn/#API) | false      |
| attrs                  | Table 其他的的一些扩展属性，参考 [Table API](https://ant.design/components/table-cn/#API)                                                                                 | object                                                              |            |
| reloadData             | 点击刷新图标后执行的函数                                                                                                                                                  | (params?: object) => any                                            |            |
| getOpBtns              | 需要显示的功能按钮                                                                                                                                                        | (params?: object) => ITableBtn[];                                   | () => null |
| getJsxElement          | 自定义的 JSX 元素                                                                                                                                                         | (params?: object) => JSX.Element                                    | () => null |
| tableHeaderSearchInput | 如果存在显示搜索框                                                                                                                                                        | ISearchInput                                                        |            |
| searchInputRightBtns   | 搜索框左侧的按钮集合                                                                                                                                                      | ITableBtn[]                                                         | []         |
| isCustomPg | 展示自定义分页器样式 | boolean | true |
| pgSelectComponentText | 自定义分页器选择展示多少条下拉左侧展示文案 | string | '' |
| selectComponentIcon | 自定义分页下拉框Icon | string | 'icon-xiala' |
| tableScreen | 控制queryForm按钮的显示隐藏 | boolean | false |
| tableCustomColumns | 表格自定义列按钮的显示隐藏 | boolean | false |
| tableId | 表格自定义列进行本地持久化的唯一标识 | string | null | 
| emptyTextStyle | 空状态的样式 | React.CSSProperties \| any  | { height: '200px' } | 
| customRenderSearch | 自定义搜索框 | (params?: any) => JSX.Element | null | 


##### ITableColumnsType

| 参数          | 说明                                               | 类型                    | 默认值       |
| ------------- | -------------------------------------------------- | ----------------------- | ------------ |
| dataIndex | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径  | string \| string[] | - | 
| title | 列头显示文字  | ReactNode | ({ sortOrder, sortColumn, filters }) => ReactNode | 
| lineClampOne | 文本展示1行且超出隐藏，如果是自定义render，内容Tooltip需要自行处理  | boolean | false | 
| lineClampTwo | 文本展示2行且超出隐藏，如果是自定义render，内容Tooltip需要自行处理  | boolean | false | 
| filterTitle | 开启表头自定义列控制  | boolean | false | 
| titleIconType | 表头自定义列的Icon  | string | 'icon-shezhi1' | 
| needTooltip | 是否需要提供Tooltip展示  | boolean | false | 
| tooltipPlace | Tooltip 展示的位置 | 'top'\| 'left'\| 'right'\| 'bottom'\| 'topLeft'\| 'topRight'\| 'bottomLeft'\| 'bottomRight'\| 'leftTop'\| 'leftBottom'\| 'rightTop' \| 'rightBottom' | 'bottomLeft' | 
| tooltipNode | 自定义Tooltip  | JSX.Element | - | 

更多属性请查看 [`ColumnsType`](https://ant.design/components/table-cn/#Column)


##### ITableBtn

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

##### ISearchInput

| 参数          | 说明                                               | 类型                    | 默认值       |
| ------------- | -------------------------------------------------- | ----------------------- | ------------ |
| searchTrigger | 触发搜索的方式                                     | change \| blur \| enter | -            |
| submit        | 点击搜索图标、清除图标，或按下回车键时的回调(必填) | (params?: any) => any   |              |
| text          | 搜索框描述                                         | string                  |              |
| placeholder   | 属性提供可描述输入字段预期值的提示信息             | string                  | 请输入关键字 |
| width | 搜索框宽度 | `Property.Width<string | number>` | 200 | 
| searchInputType | 为`search`时，采用d-search-input组件 | search \| null | search | 
| searchAttr | searchInputType为`search`时的其他属性 | {\[propName: string\]: any;} | {} | 

#### IQueryFormProps


| 参数       | 说明           | 类型                | 默认值 |
| :--------- | :------------- | :------------------ | :----- |
| columns | 表单列的配置描述，具体项见下表（必填） | [ColumnProps](#ColumnProps) | []     |
| initialValues | 表单默认值，只有初始化时生效 | object | -     |
| searchText | 搜索按钮的文案 | string \| React.ReactNode | 查询     |
| resetText | 重置按钮的文案 | string \| React.ReactNode | 重置     |
| mode      | `FormItem` 的标题展示模式，`full`是占满整行，左对齐； `align` 会根据标题右对齐 | `['full', 'align']`              | `'full'`     |
| colMode      | `FormItem` 的展示模式，`grid`是等分的栅格布局； `style` 会根据会对每个 `Col` 增加固定 `300px` 的宽度，也可以通过 `Column.colStyle` 自定义宽度等样式 | `['grid', 'style']`              | `'grid'`     |
| showOptionBtns | 是否展示右下角的「查询」「重置」按钮，以及「展开」「收起」 | boolean | true      |
| showCollapseButton | 是否展示右下角的「展开」「收起」 | boolean | true     |
| onChange | 表单的值改变时触发的回调 | Function(values, form) | - |
| onSearch | 点击查询按钮的回调 | Function(values, form) | - |
| onReset | 点击重置按钮的回调 | Function(form) | - |
| isResetClearAll | 点击重置时，是清空form里面的值，还是根据 `initialValue` 重置 | boolean | false     |
| getFormInstance | 只用来获取Form实例的回调 | Function(form) | - |
| defaultCollapse | 是否默认「展开」 | boolean | true     |
| colConfig | Col 布局配置 | `{lg:number;md:number;xxl:number;xl:number;sm:number;xs:number}` | `{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6}` |
| antConfig | 使用 `Antd ConfigProvider` 进行的全局配置，需要通过这个属性传进来 | [ConfigProviderProps](https://github.com/ant-design/ant-design/blob/master/components/config-provider/index.tsx) | - |

#### ColumnProps

表单列的配置描述，目前支持 `['input', 'select', 'custom']` 这三种。

| 参数       | 说明           | 类型                | 默认值 |
| :--------- | :------------- | :------------------ | :----- |
| type      | 动态表单组件的类型，内置 `input`, `select`；也可以自定义  | `['input', 'select', 'custom']`              | -      |
| title      | 标题    | string              |  -      |
| dataIndex      | form表单的唯一标识，不可以重复   | string              |  -      |
| placeholder | 占位文案，默认会根据 `title` 自动生成 | string | -     |
| isInputPressEnterCallSearch | 输入框按回车的时候，触发搜索 | boolean | -     |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked' | string | 'value'    |
| required | 是否对参数进行必填校验 | boolean | true      |
| colStyle | `colMode='style'` 时，可以设置单个 `Column` 的样式| `React.CSSProperties` | -      |
| columnStyleHideNumber | `colMode='style'` 时，收起时默认只展示一项，可以设置展示多项| number | 1      |
| formItemLayout | 表单的Layout | `{labelCol:{xs:{span:number},sm:{span:number},md:{span:number},lg:{span:number},xl:{span:number},xxl:{span:number}},wrapperCol:{xs:{span:number},sm:{span:number},md:{span:number},lg:{span:number},xl:{span:number},xxl:{span:number}}}` | `{labelCol:{xs:{span:5},sm:{span:5},md:{span:7},lg:{span:7},xl:{span:8},xxl:{span:8},},wrapperCol:{xs:{span:19},sm:{span:19},md:{span:17},lg:{span:17},xl:{span:16},xxl:{span:16},},}`     |
| rules | 自定义表单项的校验规则 | `object[]` | -      |
| size | 表单项的 `size` 属性 | `large` \| `default` \| `small` | `default`   |
| componentProps | `type="input|select"` 时，可以通过该属性 ant 组件的Props | any | -      |
| component | `type="custom"` 时，可以通过该属性传递 `React.ReactNode` |  React.ReactNode | -      |
| selectMode | `type="select"` 时的 `mode` 属性 | `default` \| `multiple` | `default`      |
| options | `type="select"` 时，通过该属性设置下拉选项 | {title: string;value: string;}[] | []      |