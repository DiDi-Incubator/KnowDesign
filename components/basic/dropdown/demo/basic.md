---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的下拉菜单。

## en-US

The most basic dropdown menu.

```jsx
import { Menu, Dropdown } from 'knowdesign';
import {
  HomeOutlined,
  LockOutlined,
  FolderOpenOutlined,
  LoginOutlined,
} from '@ant-design/icons';

const menu = (
  <Menu style={{width: 144, borderRadius: 4}}>
    <Menu.Item icon={<HomeOutlined />}>
      个人信息
    </Menu.Item>
    <Menu.Item icon={<LockOutlined />}>
      修改密码
    </Menu.Item>
    <Menu.Item icon={<FolderOpenOutlined />}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span>密钥管理</span>
        <span style={{width: 25, background: '#34C38F',textAlign: 'center',borderRadius: 10}}>10</span>
      </div> 
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item icon={<LoginOutlined style={{color: '#F46A6A'}}/>}>
      退出登录
    </Menu.Item>
  </Menu>
);

ReactDOM.render(
  <Dropdown trigger={['click']} overlay={menu} >
    <a onClick={e => e.preventDefault()}>
      click
    </a>
  </Dropdown>,
  mountNode,
);
```
