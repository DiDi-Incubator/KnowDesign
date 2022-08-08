---
category: 业务组件
type: 数据展示
title: ProDescription
cols: 1
subtitle: 
---

## API
### BasisInfo
|参数|说明|类型|默认值|
|:---|:---|:---|:---|
|title|详情列表的标题| string \| ReactNode |-|
|titleStyle|列表标题行内样式|React.CSSProperties|-|
|dataSource|详情数据(必填)|any|-|
|config|展示项的配置(必填)|[optionItemType](#optionItemType)[]|-|
|labelWidth|lable的宽度|string \| number|80|
|labelStyle|lable行内样式|React.CSSProperties|-|
|needColon| 是否需要 ':' 符号|boolean|false|
|xl| 屏幕分24格，屏幕宽度小于1920的时候一行占的格数 |number|8|
|xxl| 屏幕分24格，屏幕宽度大于等于1920的时候一行占的格数 |number|6|
|getBasisInfoConfig| 获取详情列表展示的配置 |(data: any, config: [optionItemType](#optionItemType)[]) => [optionItemType](#optionItemType)[]|-|


### optionItemType
|参数|说明|类型|默认值|
|:---|:---|:---|:---|
|label|必填项|string \| ReactNode|-|
|key|单条详情的key值|React.CSSProperties|-|
|copy| 是否展示复制图标 |boolean|false|
|span| 单条详情所占行数 |number|1|
|customType| 自定义配置显示内容，提供展示tag | [BASIS_TYPE](#BASIS_TYPE) | - |
|labelStyle|可自定义单个lable的行内样式|React.CSSProperties|-|
|render|可以自定义渲染的内容和逻辑|(ct: any) => any;(ct为当前详情的内容)|-|
