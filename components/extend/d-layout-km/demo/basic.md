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
  return (
    <DLayoutKM>
      <DLayoutKM.Header />
      <Row>
        <DLayoutKM.Sider></DLayoutKM.Sider>
        <DLayoutKM.Content></DLayoutKM.Content>
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
