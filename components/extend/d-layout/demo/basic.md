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
        <DLayout.Header prefixCls="dcd">Header</DLayout.Header>
        <DLayout.Content>Content</DLayout.Content>
        <DLayout.Footer>Footer</DLayout.Footer>
      </DLayout>
    </DLayout>
  </>,
  mountNode,
);
```
