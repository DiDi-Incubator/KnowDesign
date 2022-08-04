---
category: 拓展组件
type: 布局
title: DProLayout
subtitle: 顶导通栏
cols: 1
# cover: https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg
---

顶导通栏的布局组件，基于Layout基础组件做了二次封装

## 组件概述

- `DProLayout`：布局容器，其下可嵌套 `Header` `Sider` `Content` 或 `Layout` 本身，可以放在任何父容器中。
- `Header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。

## API
```jsx
<DProLayout.Container>
  <DProLayout.Header></DProLayout.Header>
  <DProLayout.Sider></DProLayout.Sider>
  <DProLayout.Content></DProLayout.Content>
</DProLayout.Container>
```

### DProLayout.Header

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| username | 用于显示用户名 | string | - |
| quickEntries | 快捷入口 | Array<{ icon: JSX.Element, txt: string, isShowSider?: boolean, ident?: string, active?: boolean }> | [] |
| isFixed | 是否吸顶，如设置为true，通过sticky实现 | boolean | false |
| userDropMenuItems | 用户头像得到焦点时下拉内容 | Array<Menu.Item> | [] |
| onClickQuickEntry | 点击快捷入口时的回调 | (qe: QuickEntry) => void | - |
| onChangeLanguage | 切换语言时的回调 | (language: string) => void | - |
| onClickMain | 点击logo部分的回调 | Function | - |

### DProLayout.Sider

基于DLayout/MenuNav实现

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| systemKey | 用于DLayout/MenuNav的入参 | string | - |
| systemName | 用于DLayout/MenuNav的入参 | string | - |
| menuConf | 用于DLayout/MenuNav的入参 | - | - |
| permissionPoints | 用于DLayout/MenuNav的入参 | {[key: string]: any} \| Function | - |

### DProLayout.Content

对Antd的Layout.Content做了二次封装

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 自定义样式 | any | - |

### DProLayout.Container

布局容器，里面对DProLayout.Header部分做了一些封装，因此一部分参数是直接传给了DProLayout.Header

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| username | 用于DProLayout.Header的username入参 |
| headQuickEntries | 用于DProLayout.Header的quickEntries入参 |
| headIsFixed | 用于DProLayout.Header的isFixed入参 |
| headUserDropMenuItems | 用于DProLayout.Header的userDropMenuItems入参 |
| onMount | 组件挂载完后执行的回调 | (customProps: any) => void | - |
| onClickQuickEntry | 用于DProLayout.Header的onClickQuickEntry入参
| onClickMain | 用于DProLayout.Header的onClickMain入参
| onChangeLanguage | 用于DProLayout.Header的onChangeLanguage入参

<style>
</style>

