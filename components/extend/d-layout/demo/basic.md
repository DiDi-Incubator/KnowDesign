---
order: 0
title: 基本结构
---

```jsx
import { DLayout } from 'dcloud-design';
import { HashRouter, Route, Routes, Link, useLocation , Switch} from 'react-router-dom';

const systemKey = 'demo';

export const leftMenus = {
  name: `${systemKey}`,
  path: 'main',
  icon: '#icon-jiqun',
  children: [
    {
      name: 'cluster',
      path: 'cluster',
      icon: '#icon-jiqun1',
      children: [
        {
          name: 'physics',
          path: 'physics',
          icon: '#icon-luoji',
        }, {
          name: 'logic',
          path: 'logic',
          icon: '#icon-jiqun1',
        }, {
          name: 'edition',
          path: 'edition',
          icon: '#icon-jiqun1',
        }],
    },
  ],
};

const BasicDemo = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const onchange = () => {
    setCollapsed(!collapsed)
  }
  return (
     <DLayout>
      <DLayout.Sider trigger={null} collapsed={collapsed} prefixCls="dcd">sider</DLayout.Sider>
      <DLayout>
        <DLayout.Header prefixCls="dcd" siderCollapsed={collapsed} changeSiderCollapsed={onchange} />
        <DLayout.Content>
        </DLayout.Content>
        <DLayout.Footer>Footer</DLayout.Footer>
      </DLayout>
    </DLayout>
  );
}
ReactDOM.render(
  <>
    <BasicDemo />
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