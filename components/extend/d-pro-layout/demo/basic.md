---
order: 0
reactRouter: react-router-dom
title: basic
---

## zh-CN

常规使用方式

## en-US

common use style.

```jsx
import { BrowserRouter, Route, Routes, Link, Switch } from 'react-router-dom';
import { DProLayout, Row, Menu } from '@didi/dcloud-design';
import { IntlProvider } from "react-intl";
import { DotChartOutlined } from '@ant-design/icons';

const systemKey = 'demo';
const usersLocale = "zh-CN";

const intlMessages = {
  "zh-CN": {
  [`menu`]: 'KnowStreaming',
  [`menu.${systemKey}`]: '多集群管理',
  [`menu.${systemKey}.cluster`]: 'Cluster',
  [`menu.${systemKey}.cluster.overview`]: 'Overview',
  [`menu.${systemKey}.cluster.balance`]: 'Load Rebalance',
  [`menu.${systemKey}.consumer-group`]: 'Consumer',
  [`menu.${systemKey}.broker`]: 'Broker',
  [`menu.${systemKey}.broker.controller-changelog`]: 'Controller',
  [`menu.${systemKey}.jobs`]: 'Job',
  ['sider.footer.hide']: '收起',
  }
}

const Home = (props) => {
  return (
    <DProLayout.Container
      style={{ height: 800, overflow: 'auto' }}
      headIcon={<DotChartOutlined/>}
      headQuickEntries={[
        { icon: <DotChartOutlined/>, txt: '多集群管理', isShowSider: false },
        { icon: <DotChartOutlined/>, txt: '系统管理', isShowSider: true },
      ]}
      headIsFixed={false}
      username='admin'
      headUserDropMenuItems={[
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
      ]}>
      <div id="sub-system" style={{ display: 'flex' }}>
        <DProLayout.Sider 
          width={200}
          theme={'light'}
          systemKey='demo' 
          prefixCls={'dcd-two-columns'}
          menuConf={{
          name: 'demo',
          icon: 'icon-jiqun',
          path: `cluster/1`,
          children: [
            {
              name: 'cluster',
              path: 'cluster',
              icon: 'icon-Cluster',
              children: [
                {
                  name: 'overview',
                  path: '',
                  icon: '#icon-luoji',
                },
                {
                  name: 'balance',
                  path: 'balance',
                  icon: '#icon-luoji',
                },
              ],
            },
            {
              name: 'consumer-group',
              path: 'consumers',
              icon: 'icon-ConsumerGroups',
            },
            {
              name: 'broker',
              path: 'broker',
              icon: 'icon-Brokers',
              children: [
                {
                  name: 'controller-changelog',
                  path: 'controller-changelog',
                  icon: '#icon-jiqun1',
                },
              ],
            },
            {
              name: 'jobs',
              path: 'jobs',
              icon: 'icon-Jobs',
            },
          ],
        }}/>
        <DProLayout.Content>
          <div style={{ height: 100 }}>content</div>
        </DProLayout.Content>
      </div>
    </DProLayout.Container>
  );
};

ReactDOM.render(
  <IntlProvider locale={usersLocale} messages={intlMessages[usersLocale]}>
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  </IntlProvider>,
  // <Home/>,
  mountNode,
);
```

<style>
</style>
