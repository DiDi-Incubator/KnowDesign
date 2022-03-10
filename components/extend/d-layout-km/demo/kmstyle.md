---
order: 0
reactRouter: react-router-dom
title: kmstyle
---

## zh-CN

与 `react-router@6+` 结合使用，生成和路由绑定的导航。

## en-US

Used together with `react-router@6+`.

```jsx
import { DLayoutKM, Row } from '@didi/dcloud-design';
import { DotChartOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from '../../../index';

const Home = props => {
  return (
    <DLayoutKM.KMStyleLayout
      style={{ height: 300, overflow: 'auto' }}
      headIcon={<DotChartOutlined/>}
      headQuickEntries={[
        { icon: <DotChartOutlined/>, txt: '多集群管理', isShowSider: false },
        { icon: <DotChartOutlined/>, txt: '系统管理', isShowSider: true },
      ]}
      headIsFixed={false}
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
      ]}
      >
    </DLayoutKM.KMStyleLayout>
  );
};

ReactDOM.render(
  <Home/>,
  mountNode,
);
```

<style>
</style>
