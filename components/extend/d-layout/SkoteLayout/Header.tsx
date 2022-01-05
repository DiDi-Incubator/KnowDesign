import React, { useState } from 'react';

import { DownOutlined, GithubOutlined } from '@ant-design/icons';
import RightSidebar from './RightSidebar';
import { toggleFullscreen } from '../utils';
import Drawer from "../../../basic/drawer";
import Badge from "../../../basic/badge";
import Dropdown from "../../../basic/dropdown";

interface IProps {
  changeSidebarType?: any;
  headerLeftContent?: any;
  showRightSidebar?: any;
  showRightSidebarAction?: any;
  logoLight?: any;
  logo?: any;
  username?: string;
  userDropDowMenu?: any;
  msgCount?: number;
  msgDropDowMenu?: any;
  layoutType?: any;
  changeLayout?: any;
  topbarTheme?: any;
  changeTopbarTheme?: any;
}

const Header = (props: IProps) => {
  const [open, setOpen] = useState(false);

  const toggleTopDrawer = () => {
    setOpen(!open);
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="d-navbar-left">{props.headerLeftContent || ''}</div>
          </div>
          <div className="d-flex">
            <div className="dropdown d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item"
                data-toggle="fullscreen"
              >
                <i className="iconfont icon-quanju" />
              </button>
            </div>

            <div className="dropdown d-inline-block">
              <Dropdown overlay={props.msgDropDowMenu || <></>} className="header-item">
                <Badge count={props.msgCount} size="small" className="btn header-item noti-item">
                  <i className="iconfont icon-tongzhi tada-icon" />
                </Badge>
              </Dropdown>
            </div>
            <div className="dropdown d-inline-block">
              <Dropdown overlay={props.userDropDowMenu || <></>} className="header-item user-item">
                <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  <GithubOutlined className="avatar" />
                  <span className="account">{props.username || ''} </span>
                  <DownOutlined />
                </span>
              </Dropdown>
            </div>

            <div onClick={toggleTopDrawer} className="dropdown d-inline-block">
              <button type="button" className="header-item setting right-bar-toggle ">
                <i className="iconfont icon-shezhi" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <Drawer visible={open} closable={false} className="react-drawer-drawer" onClose={onDrawerClose}>
        <RightSidebar
          layoutType={props.layoutType}
          onClose={onDrawerClose}
          changeLayout={props.changeLayout}
          changeTopbarTheme={props.changeTopbarTheme}
          topbarTheme={props.topbarTheme}
        />
      </Drawer>
    </>
  );
};

export default Header;
