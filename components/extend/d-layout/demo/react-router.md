---
order: 1
reactRouter: react-router-dom
iframe: 500
title:
  zh-CN: react-router V6
  en-US: react-router V6
---

## zh-CN

与 `react-router@6+` 结合使用，生成和路由绑定的面包屑。

## en-US

Used together with `react-router@6+`.

```jsx
import { BrowserRouter, Route, Routes, Link, useLocation, Switch } from 'react-router-dom';
import { DLayout } from 'dcloud-design';
const systemKey = 'demo';

const leftMenus = {
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

const Home = props => {
 const [collapsed, setCollapsed] = React.useState(false);

  const onchange = () => {
    setCollapsed(!collapsed)
  }
  return (
    <DLayout>
      <DLayout.Sider trigger={null} collapsed={collapsed} prefixCls="dcd">
        <DLayout.MenuNav systemKey={systemKey} menuConf={leftMenus} />
      </DLayout.Sider>
      <DLayout>
        <DLayout.Header prefixCls="dcd" siderCollapsed={collapsed} changeSiderCollapsed={onchange} />
        <DLayout.Content>
        Content
        </DLayout.Content>
        <DLayout.Footer>Footer</DLayout.Footer>
      </DLayout>
    </DLayout>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Home/>
  </BrowserRouter>,
  mountNode,
);
```

```css
.demo {
  margin: 16px;
}
.demo-nav {
  height: 30px;
  margin-bottom: 16px;
  line-height: 30px;
  background: #f8f8f8;
}
.demo-nav a {
  padding: 0 8px;
  line-height: 30px;
}
.app-list {
  margin-top: 16px;
}
```

<style>
   #components-extend-d-layout-demo-react-router .code-box-demo {
    text-align: center;
  }
  #components-extend-d-layout-demo-react-router .ant-layout {
    height: 520px
  }
  #components-extend-d-layout-demo-react-router .menu-title {
    height: 70px;
    vertical-align: middle;
    line-height: 70px;
    font-size: 24px;
    color: #fff;
  }
  #components-extend-d-layout-demo-react-router .ant-menu-inline {
    border: none;
  }
  #components-extend-d-layout-demo-react-router .ant-menu-sub.ant-menu-inline {
    background: none;
    color: #a6b0cf;
  }
  #components-extend-d-layout-demo-react-router .ant-menu-item-selected {
    background: none;
    color: #a6b0cf;
  }
  #components-extend-d-layout-demo-react-router .ant-menu-submenu-selected {
    color: #a6b0cf;
  }
  #components-extend-d-layout-demo-react-router .ant-menu-submenu-title {
    color: #a6b0cf;
  }
  #components-extend-d-layout-demo-react-router .ant-menu-sub.ant-menu-inline .ant-menu-item-group-title {
    color: #6a7187;
  }
#components-extend-d-layout-demo-react-router .ant-menu-inline .ant-menu-selected::after, .ant-menu-inline .ant-menu-item-selected::after {
  opacity: 0;
}
</style>
