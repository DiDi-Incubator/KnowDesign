import React, { useEffect, useState } from "react";
import "./style/index.less";

import Layout, { LayoutProps } from "../../basic/layout";
import Input from "../../basic/input";
import {
  BellOutlined,
  DownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  GithubOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
// import Badge from "../../basic/badge";
// import Dropdown from "../../basic/dropdown";
// import Menu from "../../basic/menu";

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
          <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <>Mega Menu</>
            <DownOutlined />
          </span>
        </Dropdown>
      </span>
    </>
  );
};

const renderRightEle = () => {
  const doc = document as any;
  const fullscreenStatus = doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement;
  const [isFullscreen, setIsFullscreen] = React.useState(fullscreenStatus);

  const toggleFullscreen = () => {
    if (!doc.fullscreenElement && /* alternative standard method */ !doc.mozFullScreenElement && !doc.webkitFullscreenElement) {
      // current working methods
      if (doc.documentElement.requestFullscreen) {
        doc.documentElement.requestFullscreen();
      } else if (doc.documentElement.mozRequestFullScreen) {
        doc.documentElement.mozRequestFullScreen();
      } else if (doc.documentElement.webkitRequestFullscreen) {
        doc.documentElement.webkitRequestFullscreen((Element as any).ALLOW_KEYBOARD_INPUT);
      }
      setIsFullscreen(true);
    } else {
      if (doc.cancelFullScreen) {
        doc.cancelFullScreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen();
      }
      setIsFullscreen(false);
    }
  };

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
      {React.createElement(isFullscreen ? FullscreenExitOutlined : FullscreenOutlined, {
        className: "icon",
        onClick: toggleFullscreen,
      })}
      <Badge count={5} size="small">
        <BellOutlined className="icon tada-icon" />
      </Badge>
      <span className="avatar">
        <Dropdown overlay={menu} className="avatar-dropdown">
          <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <GithubOutlined />
            <span className="account">Henry </span>
            <DownOutlined style={{ marginLeft: 5 }} />
          </span>
        </Dropdown>
      </span>
      <SettingOutlined spin className="icon" style={{ marginLeft: 13 }} />
    </>
  );
};

const DHeader = (props: IHeaderProps) => {
  const { leftElement, rightElement, prefixCls, siderCollapsed, changeSiderCollapsed } = props;

  const cPrefixCls = `${prefixCls ?? ""}-layout`;

  return (
    <Header className={`${cPrefixCls}-header ${siderCollapsed ? "collapsed" : ""}`}>
      <div className={`${cPrefixCls}-header-left`}>
        {leftElement ? leftElement : renderLeftEle({ siderCollapsed, changeSiderCollapsed })}
      </div>
      <div className={`${cPrefixCls}-header-right`}>{rightElement ? rightElement : renderRightEle()}</div>
    </Header>
  );
};

export default DHeader;
