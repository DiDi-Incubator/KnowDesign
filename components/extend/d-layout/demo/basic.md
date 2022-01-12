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
import { BrowserRouter, Route, Routes, Link, Switch } from 'react-router-dom';
import { DLayout } from 'dcloud-design';
import { IntlProvider } from "react-intl";

const systemKey = 'demo';
const usersLocale = "zh-CN";

const intlMessages = {
  "zh-CN": {
  [`menu`]: 'Agent',
  [`menu.${systemKey}`]: '我的工作台',
  [`menu.${systemKey}.cluster`]: 'Agent中心',
  [`menu.${systemKey}.cluster.physics`]: 'Agent版本',
  [`menu.${systemKey}.cluster.logic`]: 'Agent管理',
  [`menu.${systemKey}.cluster.edition`]: 'Agent采集',
  [`menu.${systemKey}.kafka`]: 'Kafka管理',
  [`menu.${systemKey}.kafka.physics`]: '物理集群',
  [`menu.${systemKey}.kafka.logic`]: '逻辑集群',
  [`menu.${systemKey}.kafka.edition`]: '逻辑集群',
  }
}

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
        systemKey={systemKey} 
        systemName="Agent" 
        menuConf={leftMenus} 
        trigger={null} 
        collapsed={collapsed} 
        prefixCls="dcd"
        logoIcon={null}
        changeSiderCollapsed={onchange} 
      />
      <DLayout>
        <DLayout.Header leftElement={<span>我的工作台</span>} siderCollapsed={collapsed} prefixCls="dcd" />
        <DLayout.Content prefixCls="dcd" collapsed={collapsed}>
          <div>Content</div>
        </DLayout.Content>
      </DLayout>
    </DLayout>
  );
};

ReactDOM.render(
  <IntlProvider locale={usersLocale} messages={intlMessages[usersLocale]}>
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  </IntlProvider>,
  mountNode,
);
```

<style>
   #components-extend-d-layout-demo-react-router .code-box-demo {
    text-align: center;
  }
  #components-extend-d-layout-demo-react-router .ant-layout {
    height: 540px
  }
</style>
