import React, { useEffect, useState } from 'react';

import { DownOutlined, GithubOutlined } from '@ant-design/icons';
import RightSidebar from './RightSidebar';
import { toggleFullscreen } from '../utils';
import Drawer from "../../../basic/drawer";
import Badge from "../../../basic/badge";
import Dropdown from "../../../basic/dropdown";
import { eventBus } from '../../../pkgs/app-container';

interface IProps {
  headerLeftContent?: any;
  headerLeftEventType?: string;
  logo?: any;
  userDropDowMenu?: any;
  msgDropDowMenu?: any;
  layoutType?: any;
  changeLayout?: any;
  topbarTheme?: any;
  changeTopbarTheme?: any;
  needMsgIcon?: boolean;
  needSettingsIcon?: boolean;
  actionAfterSetHeader?: any;
  getUserInfo?: (params?: any) => Promise<string>;
  getMsgInfo?: (params?: any) => Promise<string>;
}

const Header = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const [headerLeftContent, setHeaderLeftContent] = useState(props.headerLeftContent);
  const [username, setUsername] = useState('');
  const [msgCount, setMsgCount] = useState(0);

  useEffect(() => {
    props.getUserInfo &&
      props.getUserInfo().then((res) => {
        setUsername(res);
      });

    props.getMsgInfo &&
      props.getMsgInfo().then((res) => {
        setMsgCount(res?.length);
      });
  }, []);

  const toggleTopDrawer = () => {
    setOpen(!open);
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    eventBus.on(props.headerLeftEventType || 'renderheaderLeft', (args) => {
      const content = Array.isArray(args) ? args[0] : args;
      setHeaderLeftContent(content);
    });
    props.actionAfterSetHeader && props.actionAfterSetHeader();
  }, []);

  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="d-navbar-left">{headerLeftContent || ''}</div>
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

            {props.needMsgIcon ? (
              <div className="dropdown d-inline-block">
                <Dropdown overlay={props.msgDropDowMenu || <></>} className={`header-item ${msgCount ? 'tada-icon' : ''}`}>
                  <Badge count={msgCount} size="small" className="btn header-item noti-item">
                    <i className="iconfont icon-tongzhi" />
                  </Badge>
                </Dropdown>
              </div>
            ) : null}
            <div className="dropdown d-inline-block">
              <Dropdown overlay={props.userDropDowMenu || <></>} className="header-item user-item">
                <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  <GithubOutlined className="avatar" />
                  <span className="account">{username || ''} </span>
                  <DownOutlined />
                </span>
              </Dropdown>
            </div>

            {props.needSettingsIcon ? (
              <div onClick={toggleTopDrawer} className="dropdown d-inline-block">
                <button type="button" className="header-item setting right-bar-toggle ">
                  <i className="iconfont icon-shezhi" />
                </button>
              </div>
            ) : null}
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
