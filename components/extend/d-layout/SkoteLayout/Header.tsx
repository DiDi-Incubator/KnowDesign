import React, { useState } from "react";
import {Drawer} from "antd";
import {Badge} from "antd";
import {Dropdown} from "antd";

import { DownOutlined, GithubOutlined } from "@ant-design/icons";
import RightSidebar from "./RightSidebar";
import { changeTopbarTheme, toggleFullscreen } from "../utils";

interface IProps {
  changeSidebarType?: any;
  headerLeftContent?: any;
  showRightSidebar?: any;
  showRightSidebarAction?: any;
  t?: any;
  logoLight?: any;
  logo?: any;
  userDropDowMenu?: any;
  changeLayout?: any;
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
            <div className="d-navbar-left">{props.headerLeftContent || ""}</div>
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
              <Badge count={5} size="small" className="btn header-item noti-item">
                <i className="iconfont icon-tongzhi tada-icon" />
              </Badge>
            </div>
            <div className="dropdown d-inline-block">
              <Dropdown overlay={props.userDropDowMenu || <></>} className="header-item user-item">
                <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  <GithubOutlined className="avatar" />
                  <span className="account">Henry </span>
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
      <Drawer visible={open} className="react-drawer-drawer" onClose={onDrawerClose}>
        <RightSidebar onClose={onDrawerClose} changeLayout={props.changeLayout} changeTopbarTheme={changeTopbarTheme} />
      </Drawer>
    </>
  );
};

export default Header;
