---
order: 0
title: 基本结构
---

```jsx
import { DLayout } from 'dcloud-design';

ReactDOM.render(
  <>
    <DLayout>
      <DLayout.Sider prefixCls="dcd">Sider</DLayout.Sider>
      <DLayout>
        <DLayout.Header prefixCls="dcd"/>
        <DLayout.Content>Content</DLayout.Content>
        <DLayout.Footer>Footer</DLayout.Footer>
      </DLayout>
    </DLayout>
  </>,
  mountNode,
);
```
<style>
#components-extend-d-layout-demo-basic .code-box-demo {
  text-align: center;
}
#components-extend-d-layout-demo-basic .ant-layout {
  height: 520px
}
</style>