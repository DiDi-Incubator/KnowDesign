---
category: 组件
subtitle: 描述列表
type: 数据展示
title: Descriptions & DDescriptions
cols: 1
---

成组展示多个只读字段。

## 何时使用

常见于详情页的信息展示。

## API

### Descriptions

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false |  |
| colon | 配置 `Descriptions.Item` 的 `colon` 的默认值 | boolean | true |  |
| column | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number | 3 |  |
| contentStyle | 自定义内容样式 | CSSProperties | - | 4.10.0 |
| extra | 描述列表的操作区域，显示在右上方 | ReactNode | - | 4.5.0 |
| labelStyle | 自定义标签样式 | CSSProperties | - | 4.10.0 |
| layout | 描述布局 | `horizontal` \| `vertical` | `horizontal` |  |
| size | 设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效） | `default` \| `middle` \| `small` | - |  |
| title | 描述列表的标题，显示在最顶部 | ReactNode | - |  |
| haveMore | 描述列表在第几个Item项显示查看更多 | number | -1 | - |
| moreText | 自定义查看更多的文本 | ReactNode | 查看更多 | - |

### DescriptionItem

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| contentStyle | 自定义内容样式 | CSSProperties | - | 4.9.0 |
| label | 内容的描述 | ReactNode | - |  |
| labelStyle | 自定义标签样式 | CSSProperties | - | 4.9.0 |
| span | 包含列的数量 | number | 1 |  |
| level | 等级 | ILevel | - |  |
| tags | 标签 | ITags[] | - |  |

### ILevel

`1 | 2 | 3`
### ITags

    {
      title: string,
      href: string,
    }
### DDescriptions

| 参数       | 说明           | 类型                | 默认值 |
| :--------- | :------------- | :------------------ | :----- |
| title      | 标题           | string              | -      |
| titleStyle      | 标题           | string              | -      |
| titleWidth      | 自定义标题的样式           | React.CSSProperties              |  -      |
| titleAlign      | 标题对齐方式           | `['left', 'right']`              |  `'right'`     |
| dataSource | 需要展示的信息 | Descriptions.Item[] | -      |
| itemTitleStyle | 自定义详情标题的样式 | React.CSSProperties | -      |
| itemContentStyle | 自定义详情内容的样式 | React.CSSProperties | -      |
| bordered | 是否需要边框 | boolean | false |
| style | 自定义组件容器的样式 | React.CSSProperties | - |
| showColon | 是否展示标题后面的冒号 | boolean | false |

### DDescriptionItem

| 参数    | 说明     | 类型               | 默认值 |
| :------ | :------- | :----------------- | :----- |
| title   | 详情标题 | string \| number \| React.ReactNode             | -      |
| content | 详情信息 | string \| number \| React.ReactNode | -      |
| mainTitle | 详情小标题 | string \| number \| React.ReactNode | -      |

> span 是 Description.Item 的数量。 span={2} 会占用两个 DescriptionItem 的宽度。当同时配置 `style` 和 `labelStyle`（或 `contentStyle`）时，两者会同时作用。样式冲突时，后者会覆盖前者。
