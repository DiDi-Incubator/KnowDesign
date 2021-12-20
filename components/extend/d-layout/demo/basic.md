---
order: 0
title: 基本结构
---

```jsx
import { DLayout, Menu } from 'dcloud-design';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const MenuList = () => {
  const handleClick = e => {
    console.log('click ', e);
  };

  return (
    <>
    <div className="menu-title"> Agent </div>
    <Menu
      onClick={handleClick}
      style={{ height: '100%', background: 'none', color: '#a6b0cf' }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <Menu.ItemGroup key="g1" title="Item 1">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Item 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
    </>
  )
}

const BasicDemo = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const onchange = () => {
    setCollapsed(!collapsed)
  }
  return (
     <DLayout>
      <DLayout.Sider trigger={null} collapsed={collapsed} prefixCls="dcd"><MenuList/></DLayout.Sider>
      <DLayout>
        <DLayout.Header prefixCls="dcd" siderCollapsed={collapsed} changeSiderCollapsed={onchange} />
        <DLayout.Content>
        Content
        </DLayout.Content>
        <DLayout.Footer>Footer</DLayout.Footer>
      </DLayout>
    </DLayout>
  );
}
ReactDOM.render(
      <BasicDemo />
,
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
  #components-extend-d-layout-demo-basic .menu-title {
    height: 70px;
    vertical-align: middle;
    line-height: 70px;
    font-size: 24px;
    color: #fff;
  }
  #components-extend-d-layout-demo-basic .ant-menu-inline {
    border: none;
  }
  #components-extend-d-layout-demo-basic .ant-menu-sub.ant-menu-inline {
    background: none;
    color: #a6b0cf;
  }
  #components-extend-d-layout-demo-basic .ant-menu-item-selected {
    background: none;
    color: #a6b0cf;
  }
  #components-extend-d-layout-demo-basic .ant-menu-submenu-selected {
    color: #a6b0cf;
  }
  #components-extend-d-layout-demo-basic .ant-menu-submenu-title {
    color: #a6b0cf;
  }
  #components-extend-d-layout-demo-basic .ant-menu-sub.ant-menu-inline .ant-menu-item-group-title {
    color: #6a7187;
  }
#components-extend-d-layout-demo-basic .ant-menu-inline .ant-menu-selected::after, .ant-menu-inline .ant-menu-item-selected::after {
  opacity: 0;
}
</style>
