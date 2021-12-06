---
category: Components
type: Data Display
title: Descriptions & DDescriptions
cols: 1
---

Display multiple read-only fields in groups.

## When To Use

Commonly displayed on the details page.

## API

### Descriptions

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Whether to display the border | boolean | false |  |
| colon | Change default props `colon` value of Descriptions.Item | boolean | true |  |
| column | The number of `DescriptionItems` in a row,could be a number or a object like `{ xs: 8, sm: 16, md: 24}`,(Only set `bordered={true}` to take effect) | number | 3 |  |
| contentStyle | Customize label style | CSSProperties | - | 4.10.0 |
| extra | The action area of the description list, placed at the top-right | ReactNode | - | 4.5.0 |
| labelStyle | Customize label style | CSSProperties | - | 4.10.0 |
| layout | Define description layout | `horizontal` \| `vertical` | `horizontal` |  |
| size | Set the size of the list. Can be set to `middle`,`small`, or not filled | `default` \| `middle` \| `small` | - |  |
| title | The title of the description list, placed at the top | ReactNode | - |  |
| haveMore | The description list is displayed in the item to see more | number | -1 | - |
| moreText | Customize to view more text | ReactNode | more | - |

### DescriptionItem

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| contentStyle | Customize label style | CSSProperties | - | 4.9.0 |
| label | The description of the content | ReactNode | - |  |
| labelStyle | Customize label style | CSSProperties | - | 4.9.0 |
| span | The number of columns included | number | 1 |  |
| level | level | ILevel | - |  |
| tags | tag | ITags[] | - |  |

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
| title      | The title           | string              | -      |
| titleStyle      | Heading styles           | string              | -      |
| titleWidth      | The width of the title          | React.CSSProperties              |  -      |
| titleAlign      | Title alignment           | `['left', 'right']`              |  `'right'`     |
| dataSource | Information that needs to be presented | Descriptions.Item[] | -      |
| itemTitleStyle | Customize the style of the detail heading | React.CSSProperties | -      |
| itemContentStyle | Custom styles for details content | React.CSSProperties | -      |
| bordered | Do you need borders | boolean | false |
| style | Customize the style of the component container | React.CSSProperties | - |
| showColon | Whether to display the colon after the title | boolean | false |

### DDescriptionItem

| 参数    | 说明     | 类型               | 默认值 |
| :------ | :------- | :----------------- | :----- |
| title   | Details of the title | string \| number \| React.ReactNode             | -      |
| content | The details information | string \| number \| React.ReactNode | -      |
| mainTitle | Detail subheading | string \| number \| React.ReactNode | -      |

> The number of span Description.Item. Span={2} takes up the width of two DescriptionItems. When both `style` and `labelStyle`(or `contentStyle`) configured, both of them will work. And next one will overwrite first when conflict.
