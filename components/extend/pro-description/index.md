---
category: 业务组件
type: 数据展示
title: ProDescription  描述列表
cols: 1
subtitle: 
---

## API
### BasisInfo
|参数|说明|类型|默认值|
|:---|:---|:---|:---|
|title|详情列表的标题| string \| ReactNode |-|
|dataSource|详情数据(必填)| { [name: string]: any } | - |  
|config|展示项的配置(必填)|[optionItemType](#optionItemType)[]|-|
|labelStyle|lable行内样式|React.CSSProperties|-|
|contentStyle|content行内样式|React.CSSProperties|-|
|needColon| 是否需要 ':' 符号|boolean|false|
|column| 屏幕分24格，屏幕宽度大于等于1920的时候一行占的格数 | {xxl: number,xl: number,lg: number,md: number,sm: number,xs: number} | {xxl: 3,xl: 2,lg: 2,md: 2,sm: 2,xs:1}|
| getBasisInfoConfig | 处理详情列表展示的配置并返回`如果传入的 dataSource对象 结构不复杂可以不传递getBasisInfoConfig处理函数，由默认的处理函数处理` | (data: { [name: string]: any }, config: [optionItemType](#optionItemType)[]) => [optionItemType](#optionItemType)[] | - |
| noDefaultTitle | 展示ProDescription定义的Title | boolean | true |


### optionItemType
|参数|说明|类型|默认值|
|:---|:---|:---|:---|
|label|必填项|string \| ReactNode|-|
|key|单条详情的key值|React.CSSProperties|-|
|copy| 是否展示复制图标 |boolean|false|
|span| 单条详情所占行数 |number|1|
|customType| 自定义配置显示内容，提供展示tag | [BASIS_TYPE](#BASIS_TYPE) | - |
|labelStyle|可自定义单个lable的行内样式|React.CSSProperties|-|
| renderCustom | 可以自定义渲染的内容和逻辑 | (ct: any) => any;(ct为当前详情的内容) | - |
| needTooltip | 是否需要Tooltip | boolean | - |
| tooltipPlace | Tooltip打开方式 | 'top'\| 'left'\| 'right'\| 'bottom'\| 'topLeft'\| 'topRight'\| 'bottomLeft'\| 'bottomRight'\| 'leftTop'\| 'leftBottom'\| 'rightTop'\| 'rightBottom' | 'bottomLeft' |
| ellipsis | renderCustom自定义渲染的时候是否开启超出隐藏 | boolean | true |
| invisible | 不展示当前条目 | boolean | false |

