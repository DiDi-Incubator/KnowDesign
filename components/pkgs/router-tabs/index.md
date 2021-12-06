---
category: 组件
type: 导航
title: RouterTabs
subtitle: 
---
## 何时使用 
顶部历史菜单切换，避免打开多个浏览器Tab页面，可自由进行切换

## API
|   参数   |          说明           |       类型    |     默认值    |
|:--------:|:-----------------------:|:-------------:|:-------------:|
| tabList | 菜单列表数据            | ITab[]         | -            |
| dealPathname | 当前地址栏路径            | (pathname: string) => string         | -            |
| siderMenuCollapsed | 左侧菜单是否折叠            | boolean         | -            |
| siderMenuCollapsed | 左侧菜单是否折叠            | boolean         | -            |
| intlZhCN | 待补充            | any         | -            |
| systemKey | 当前子系统的key值            | any         | -            |


## ITab
|   参数   |          说明           |       类型    |     默认值    |
|:--------:|:-----------------------:|:-------------:|:-------------:|
| label | 名称            | string        | -            |
| href | 跳转路径            | string        | -            |
| key | 唯一key值            | string        | -            |
| show | 当前显示的菜单内容           | boolean         | -            |