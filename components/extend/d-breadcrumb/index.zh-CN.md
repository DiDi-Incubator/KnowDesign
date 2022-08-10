---
category: 业务组件
subtitle: 面包屑
type: 布局
title: DKSBreadcrumb
cover: https://gw.alipayobjects.com/zos/alicdn/9Ltop8JwH/Breadcrumb.svg
---

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## API

### Breadcrumb

| 参数        | 说明         | 类型      | 默认值 | 版本 |
| ----------- | ------------ | --------- | ------ | ---- |
| breadcrumbs | 导航数组     | Array     | -      |      |
| prefixCls   | 样式前缀     | string    | dcd-ks |      |
| separator   | 分隔符自定义 | ReactNode | `/`    |      |

### Breadcrumb.Separator

| 参数     | 说明           | 类型      | 默认值 | 版本 |
| -------- | -------------- | --------- | ------ | ---- |
| children | 要显示的分隔符 | ReactNode | `/`    |      |

> 注意：在使用 `Breadcrumb.Separator` 时，其父组件的分隔符必须设置为 `separator=""`，否则会出现父组件默认的分隔符。

