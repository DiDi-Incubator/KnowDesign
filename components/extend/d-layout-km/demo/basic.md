---
order: 0
reactRouter: react-router-dom
title: basic
---

## zh-CN

与 `react-router@6+` 结合使用，生成和路由绑定的导航。

## en-US

Used together with `react-router@6+`.

```jsx
import { BrowserRouter, Route, Routes, Link, Switch } from 'react-router-dom';
import { DLayoutKM, Row } from '@didi/dcloud-design';
import { IntlProvider } from "react-intl";
import { DotChartOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from '../../../index';
import { EventBus } from '../../../utils'

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

const Home = props => {
  const eventBus = new EventBus();
  return (
    <DLayoutKM style={{ height: 300, overflow: 'auto' }}>
      <DLayoutKM.Header
        icon={<DotChartOutlined/>}
        quickEntries={[
          { icon: <DotChartOutlined/>, txt: '多集群管理', isShowSider: false },
          { icon: <DotChartOutlined/>, txt: '系统管理', isShowSider: true },
        ]}
        isFixed={false}
        userDropMenuItems={[
          <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        </Menu.Item>,
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item
          </a>
        </Menu.Item>
        ]}
        eventBus={eventBus}
      ></DLayoutKM.Header>
      <Row>
        <DLayoutKM.Sider eventBus={eventBus}></DLayoutKM.Sider>
        <DLayoutKM.Content>
          <div style={{ height: 100 }}>content</div>
          <div style={{ height: 100 }}>content</div>
          <div style={{ height: 100 }}>content</div>
          <div style={{ height: 100 }}>content</div>
          <div style={{ height: 100 }}>content</div>
          <div style={{ height: 100 }}>content</div>
          <div style={{ height: 100 }}>content</div>
          <div style={{ height: 100 }}>content</div>
          <div style={{ height: 100 }}>content</div>
        </DLayoutKM.Content>
      </Row>
    </DLayoutKM>
  );
};

ReactDOM.render(
  // <IntlProvider locale={usersLocale} messages={intlMessages[usersLocale]}>
  //   <BrowserRouter>
  //     <Home/>
  //   </BrowserRouter>
  // </IntlProvider>,
  <Home/>,
  mountNode,
);
```

<style>
</style>
