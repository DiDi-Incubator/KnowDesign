---
category: 组件
type: 布局
title: Layout
subtitle: 
---

## 何时使用
 基础布局组件，包含顶导和左侧菜单

 
## API
|   参数   |          说明           |       类型    |     默认值    |
|:--------:|:-----------------------:|:-------------:|:-------------:|
| tenantProjectVisible | 是否显示选择项目            | boolean         | -            |
| children | 内容区的内容            | React.ReactNode         | -            |
| setCurrentProject | 顶部选择项目的回调            | any         | -            |
| projectList | 项目列表数据            | IProject[]         | -            |
| projectLoding | 项目加载loading            | boolean         | -            |
| currentProject | 当前选择的项目            | IProject         | -           |
| onMount |   页面加载完后的回调        | function         | -            |
| feConf | 顶导相关配置项，包含theme、logo、subTitle系统title、mode、right_links右侧链接          | object         | -            |
| showLeftMenu | 是否显示左侧菜单         | boolean         | false           |
| leftMenuProps | 左侧菜单配置         | object         | -            |


## IProject
|   参数   |          说明           |       类型    |     默认值    |
|:--------:|:-----------------------:|:-------------:|:-------------:|
| id | 项目id            | number         | -            |
| name | 项目名称          | string         | -            |
| ident | 项目编码           | string         | -            |

