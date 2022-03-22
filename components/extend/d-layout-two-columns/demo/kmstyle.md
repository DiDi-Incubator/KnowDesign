---
order: 0
reactRouter: react-router-dom
title: two-columns
---

## zh-CN

与 `react-router@6+` 结合使用，生成和路由绑定的导航。

## en-US

Used together with `react-router@6+`.

```jsx
import { DLayoutTwoColumns, Row } from '@didi/dcloud-design';
import { DotChartOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, IconFont } from '../../../index';

const Home = props => {
  return (
    <DLayoutTwoColumns.TwoColumnsStyleLayout
      style={{ height: 300, overflow: 'auto' }}
      headIcon={<IconFont type="icon-duojiqunguanli"/>}
      headQuickEntries={[
        { icon: <IconFont type="icon-duojiqunguanli"/>, txt: '多集群管理', isShowSider: false },
        { icon: <IconFont type="icon-xitongguanli"/>, txt: '系统管理', isShowSider: true },
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
      onClickQuickEntry={(qe) => {
        console.log('onClickQuickEntry out', qe)
      }}
      >
    </DLayoutTwoColumns.TwoColumnsStyleLayout>
  );
};

ReactDOM.render(
  <Home/>,
  mountNode,
);
```

<style>
</style>
