---
category: 组件
type: 布局
cols: 1
title: HashMenu
subtitle: 
---

## 何时使用
Tab 切换组件，包含下面的内容区，切换时地址栏 hash 会发生变化

#### API

| 参数     | 说明                          | 类型                   | 默认值 |
| -------- | ----------------------------- | ---------------------- | ------ |
| TAB_LIST | tablist 数据                  | IMenuItem[]            |        |
| MENU_MAP | tab 和内容区的映射            | Map<string, IMenuItem> |        |
| theme    | 不传则原生 antd，传则灰低主题 | boolean                | -      |

##### IMenuItem

| 参数    | 说明         | 类型        | 默认值 |
| ------- | ------------ | ----------- | ------ |
| name    | tab 页的标题 | string      | -      |
| key     | tab 页的 key | string      | -      |
| content | taba 内容区  | JSX.Element | -      |
