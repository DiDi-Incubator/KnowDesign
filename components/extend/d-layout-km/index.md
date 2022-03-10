---
category: 组件
type: 布局
title: DLayoutKM
subtitle: 自定义布局KM
cols: 1
# cover: https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg
---

协助进行页面级整体布局。

## 组件概述

- `Layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` 或 `Layout` 本身，可以放在任何父容器中。
- `Header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。

## API
```jsx
<Layout>
</Layout>
```


### Layout

布局容器。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器 className | string | - |

### Layout.Sider

侧边栏。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| breakpoint | 触发响应式布局的[断点](/components/grid/#Col) | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `xxl` | - |

#### breakpoint width

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
```

<style>
</style>

