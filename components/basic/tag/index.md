---
category: 组件
subtitle: 标签
type: 数据展示
title: Tag & DTag
cover: https://gw.alipayobjects.com/zos/alicdn/cH1BOLfxC/Tag.svg
---

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## API

### Tag

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| closable | 标签是否可以关闭（点击默认关闭） | boolean | false |  |
| closeIcon | 自定义关闭按钮 | ReactNode | - | 4.4.0 |
| color | 标签色 | string | - |  |
| icon | 设置图标 | ReactNode | - |  |
| visible | 是否显示标签 | boolean | true |  |
| onClose | 关闭时的回调（可通过 `e.preventdefault()` 来阻止默认行为） | (e) => void | - |  |

### Tag.CheckableTag

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 设置标签的选中状态 | boolean | false |
| onChange | 点击标签时触发的回调 | (checked) => void | - |
### DTag

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| closable | 标签是否可以关闭（点击默认关闭） | boolean | false |  |
| closeIcon | 自定义关闭按钮 | ReactNode | - | 4.4.0 |
| color | 标签色 | string | - |  |
| icon | 设置图标 | ReactNode | - |  |
| visible | 是否显示标签 | boolean | true |  |
| onClose | 关闭时的回调（可通过 `e.preventdefault()` 来阻止默认行为） | (e) => void | - |  |
| size |  组件的大小 | ['large', 'middle', 'small'] | 'middle' |
| level |  级别类型 | ['P0', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'] | 'P3' |
| theme |  主题色 | ['default', 'success', 'error', 'warning', 'info'] | '' |

### DTag.CheckableTag

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 设置标签的选中状态 | boolean | false |
| onChange | 点击标签时触发的回调 | (checked) => void | - |
