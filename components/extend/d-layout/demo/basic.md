---
order: 0
reactRouter: react-router-dom
iframe: 500
title: basic
---

## zh-CN

与 `react-router@6+` 结合使用，生成和路由绑定的导航。

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
    }, {
      name: 'kafka',
      path: 'kafka',
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
      <DLayout.Sider 
        width={180} 
        systemKey={systemKey} 
        systemName="Agent" 
        menuConf={leftMenus} 
        trigger={null} 
        collapsed={collapsed} 
        prefixCls="dcd"
        changeSiderCollapsed={onchange} 
      />
      <DLayout>
        <DLayout.Header leftElement={<><span>我的工作台</span></>} siderCollapsed={collapsed} prefixCls="dcd" />
        <DLayout.Content prefixCls="dcd">
        <div style={{height: '600px'}}>Content</div>
        </DLayout.Content>
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

<style>
   #components-extend-d-layout-demo-react-router .code-box-demo {
    text-align: center;
  }
  #components-extend-d-layout-demo-react-router .ant-layout {
    height: 520px
  }
</style>
