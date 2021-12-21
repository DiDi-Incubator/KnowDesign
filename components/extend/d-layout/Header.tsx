import React, { useEffect, useState } from 'react';
import './style/index.less';

// import './assets/iconfont-es/iconfont.js';
import Layout, { LayoutProps } from '../../basic/layout';
import Input from '../../basic/input';
import { BellOutlined, DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, QrcodeOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Badge from '../../basic/badge';
import Dropdown from '../../basic/dropdown';
import Menu from '../../basic/menu';

export interface IHeaderProps extends LayoutProps {
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  siderCollapsed?: boolean;
  changeSiderCollapsed?: any;
}

const { Header } = Layout;

const renderLeftEle = ({ siderCollapsed, changeSiderCollapsed }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item icon={<DownOutlined />} disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Input className="search" prefix={<SearchOutlined style={{ fontSize: 16 }} />} />
      <span>
        <Dropdown overlay={menu}>
          <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <>Mega Menu</><DownOutlined />
          </span>
        </Dropdown>
      </span>
    </>
  );
}

const renderRightEle = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          个人信息
        </a>
      </Menu.Item>
      <Menu.Item icon={<DownOutlined />} disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          修改密码
        </a>
      </Menu.Item>
      <Menu.Item disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          密码管理
        </a>
      </Menu.Item>
      <Menu.Item danger>退出登录</Menu.Item>
    </Menu>
  );
  return (
    <>
      <QrcodeOutlined className="icon" />
      <Badge count={5} size="small">
        <BellOutlined className="icon tada-icon" />
      </Badge>
      <span>
        <Dropdown overlay={menu}>
          <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <>Henry </><DownOutlined />
          </span>
        </Dropdown>
      </span>
      <SettingOutlined spin className="icon" />
    </>
  );
}

const DHeader = (props: IHeaderProps) => {
  const { leftElement, rightElement, prefixCls, siderCollapsed, changeSiderCollapsed } = props;

  const cPrefixCls = `${prefixCls ?? ''}-layout`;

  return (
    <Header className={`${cPrefixCls}-header ${siderCollapsed ? 'collapsed' : ''}`}>
      <div className={`${cPrefixCls}-header-left`}>
        {leftElement ? leftElement : renderLeftEle({ siderCollapsed, changeSiderCollapsed })}
      </div>
      <div className={`${cPrefixCls}-header-right`}>
        {rightElement ? rightElement : renderRightEle()}
      </div>
    </Header>
  );
}

export default DHeader;
