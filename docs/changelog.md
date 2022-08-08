---
order: 201
title: 更新日志
toc: false
timeline: true
---

#### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---
## v4.1.6

`2020-9-8`
- 💄 ui走查, 组件部分还原
- 🐞 修复 `DCode` height属性不支持string


## v4.1.5

`2020-8-31`
- 🐞 修复 `Descriptions` 1个的时候，不渲染
- 🐞 修复 `DDataTable` 表头筛选靠右显示无法与按钮在一行
- 🐞 修复 `DTable` 表头筛选框搜索按钮添加点击事件


## v4.1.4

`2020-8-23`
- 💄 统一自建组件前缀 `D` 并合并同名组件 
  - `BasicButton` 更名为 [`DButton`](/components/extend/d-button/)
  - `BasicFormItem` 更名为 [`DFormItem`](/components/extend/d-form-items/)
  - `BasicTable` 更名为 [`DTable`](/components/extend/d-table/)
  - `BasicCard` 更名为 [`DCard`](/components/extend/d-card/)
  - `Code` 更名为 [`DCode`](/components/extend/d-code/)
  - `QueryForm` 更名为 [`DQueryForm`](/components/extend/d-query-form/)
  - `DDescriptions` 与 `Descriptions` 合并展示 [`Descriptions & DDescriptions`](/components/basic/descriptions/)
  - `BasicDataTable` 更名为 [`DDataTable`](/components/extend/d-data-table/)
  - `ColorSelect` 更名为 [`DColorSelect`](/components/extend/d-color-select/)
  - `DTag` 与 `Tag` 合并展示 [`Tag & DTag`](/components/basic/tag/)
  - `BaiscButton` 更名为 [`DButton`](/components/extend/d-button/)


## v4.1.1

`2020-07-22`
- 💄 ui还原 `DatePicker` 日期选择框
- 🐞 修改 `message`, `descriptions` 类型修改


## v4.0.18

`2020-07-01`
- 💄 ui还原 `empty` 空状态
- 💄 ui还原 `Radio` 单选框
- 💄 ui还原 `Checkbox` 多选框
- 💄 ui还原 `Slider` 滑块输入条
- 🐞 修改 `Switch` 样式错误，并与`BasicSwitch` 合并


## v4.0.15 & v4.0.16 & v4.0.17

`2020-06-23`
- 💄 支持国际化
- 💄 导出 `locale-provider`
- 💄 ui还原 `tabs` 标签页
- 🐞 修改 `message` 导出报错


## v4.0.14

`2020-06-19`
- 🐞 修改 `message` 导出报错
- 💄 ui还原 `Descript` 描述
- 引入 `hoist-non-react-statics` 绑定静态组件


## v4.0.12

`2020-06-11`
- 🐞 修改 `row` `grid` 导出报错
- 🐞 修改 `message` 图标打包找不到
- 🆕 迁移新增 `Menu` 导航菜单
- 🆕 迁移新增 `Switch` 开关
- 🆕 迁移新增 `TreeSelect` 树选择
- 🆕 迁移新增 `Form` 表单
- 💄 ui还原 `Input` 文本框
- 💄 ui还原 `InputNumber` 数字文本框


## v4.0.11

`2020-06-09`
- 🐞 修改 `react-dnd react/jsx-runtime` 找不到报错
- 🛠 替换过渡期方案 `from 'antd'` to  `from '@didi/dcloud-design'`
- 🆕 迁移新增 `Transfer` 穿梭框
- 🆕 迁移新增 `Upload` 上传
- 💄 ui还原 `Pagination ` 分页
- 💄 ui还原 `Steps ` 步骤条
- 💄 ui还原 `Message` 全局提示
- 💄 ui还原 `Modal` 对话框
- 💄 ui还原 `Popconfirm` 气泡确认框


## v4.0.10

`2020-05-31`
- 🐞 修改 `Table` 变量报错
- 🛠 优化动态卡片 `BasicCard` 
- 🆕 迁移新增 `Avatar` 头像
- 🆕 迁移新增 `BackTop` 回到顶部
- 🆕 迁移新增 `Calendar` 日历
- 🆕 迁移新增 `Carousel` 走马灯
- 🆕 迁移新增 `Comment` 评论
- 🆕 迁移新增 `DatePicker` 日期选择框
- 🆕 迁移新增 `Input` 输入框
- 🆕 迁移新增 `InputNumber` 数字输入框
- 🆕 迁移新增 `Mentions` 提及
- 🆕 迁移新增 `Message` 全局提示
- 🆕 迁移新增 `Modal` 对话框
- 🆕 迁移新增 `Select` 下拉框
- 🆕 迁移新增 `Slider` 滑动输入条
- 🆕 迁移新增 `Spin` 加载中
- 🆕 迁移新增 `Skeleton` 骨架屏
- 🆕 迁移新增 `TimePicker` 时间选择框
- 🆕 迁移新增 `Radio` 单选框
- 🆕 迁移新增 `Rate` 评分
- 💄 ui还原 `BasicTag` 标签


## v4.0.9

`2020-05-27`

- 🛠 优化 `Card` 和 `BasicCard` 
- 🆕 迁移新增 `Affix` 固钉
- 🆕 迁移新增 `Anchor` 锚点
- 🆕 迁移新增 `AutoComplete` 自动完成
- 🆕 迁移新增 `Breadcrumb` 面包屑
- 🆕 迁移新增 `Button` 按钮
- 🆕 迁移新增 `Cascader` 级联选择
- 🆕 迁移新增 `Checkbox` 多选框
- 🆕 迁移新增 `Divider` 分割线
- 🆕 迁移新增 `Drawer` 抽屉
- 🆕 迁移新增 `Dropdown` 下拉框
- 🆕 迁移新增 `Grid` `Row` `Col` 栅格
- 🆕 迁移新增 `Image` 图片
- 🆕 迁移新增 `Pagination` 分页
- 🆕 迁移新增 `PageHeader` 页头
- 🆕 迁移新增 `Result` 结果
- 🆕 迁移新增 `Space` 间距
- 🆕 迁移新增 `Statistic` 统计
- 🆕 迁移新增 `Steps` 步骤条
- 🆕 迁移新增 `Tab` 标签页
- 🆕 迁移新增 `Table` 表格
- 🆕 迁移新增 `Timeline` 时间轴
- 🆕 迁移新增 `Tooltip` 文字提示
- 🆕 迁移新增 `Typography` 排版
- 💄 ui还原 `DResult` 结果
- 💄 ui还原 `DButton` 基础按钮
- 🔥 迁移新增 & ui还原 `notification` 通知提醒框
- 🔥 迁移新增 & ui还原 `Alert` 警告提示
- 🆕 迁移新增 `config-provider` 全局化配置


## v4.0.8

`2020-05-08`

- 🆕 迁移新增 `BasicTable` 表格
- 🆕 迁移新增 `DataTable` 数据表格
- 🆕 新增 `Progress` 进度条组件
- 🆕 新增 `Tag` 标签组件
- 🆕 新增 `Tree` 树形控件
- 🆕 新增 `Card` 卡片组件
- 🆕 新增 `Badge` 徽标数
- 🆕 新增 `Empty` 空状态
- 🆕 新增 `Alert` 卡片组件
- 🆕 新增 `notification` 通知提醒框
- 🆕 新增 `List` 列表组件
- 🆕 新增 `Tabs` 标签页


## v4.0.7

`2020-04-16`

- 🆕 迁移新增 `Descriptions` 描述列表
- 🆕 迁移新增 `ColorSelect` 颜色选择器
- 🆕 迁移新增 `BasicFormItems` 动态表单
- 🆕 迁移新增 `BasicSwtich` 基础开关


## v4.0.7

`2020-04-09`

- 🆕 迁移新增 `QueryForm` 查询表单
- 🆕 迁移新增 `EmptyLine` 空行
- 🆕 迁移新增 `BasicCard` 数据表格

## v4.0.3

`2021-03-11`

参考 Antd，重构了样式部分，增加了前缀（`dantd`）的概念。

## v4.0.2

`2021-03-14`

使用 [bisheng](https://github.com/benjycui/bisheng) 重构了项目的文档部分，并优化了文档的编写，以及官网的样式。

## v4.0.1

`2021-03-12`

开始了这个项目，串通了开发，测试，打包，文档所有流程。

- 支持 TypeScript
- 支持 单元测试 Jest + @testing-library/react
- 支持 less
- 支持 eslint & prettier
- 支持 react-app-rewired
- 基于 [umijs/father](https://github.com/umijs/father) 完成打包，可使用 cjs、esm 和 umd 三种格式的引用
- 支持 mdx 文档

<!-- 
## v0.0.10
- 🐞 修改 `QueryForm` 下拉选择无法搜索的问题 
  - 排序：columnTitle：xxx,xxx
  - 过滤：columnTitle：升序
- 🐞 修改 `DataTable` `isQuerySearchOnChange=false` 搜索参数不准的问题
- 🐞 优化 `ColorSelect` 和 `Form` 结合的样式
- 🛠 优化 `BasicCard` 样式，以及 `echarts` demo
- 🆕 新增 `BasicCard` 卡片组件
- 🆕 新增 `useAsync` 接收一个 async 函数或返回 promise 的函数，返回状态，数据形状与 `useAsync` 相同。参考 [react-use](https://github.com/streamich/react-use/blob/master/docs/useAsyncFn.md)
```
  <Table
    columns={columns}
    dataSource={data}
    antConfig={{
      prefixCls: 'antdv3',
      locale: 'zh_CN',
    }}
  />-->
``` 