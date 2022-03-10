import React, { CSSProperties } from 'react';
import _ from 'lodash';
import { MenuMode } from 'rc-menu/lib/interface';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import './style/menu.less';
// import Menu, { MenuProps } from "../../basic/menu";
import { Menu, MenuProps, IconFont } from '../../index';
import { hasRealChildren, isAbsolutePath, normalizeMenuConf } from './utils';
// import { IconFont } from '../..';

export interface MenuConfItem {
  key?: string;
  name?: string | React.ReactNode;
  path?: string;
  icon?: string;
  type?: 'group';
  component?: React.ReactNode;
  children?: MenuConfItem[];
  visible?: boolean;
  rootVisible?: boolean;
  networkopsVisible?: boolean;
  to?: string;
  divider?: boolean;
  target?: string;
  permissionPoint?: string;
  isAbsolutePath?: boolean;
}
export interface IMenuNavProps extends MenuProps {
  menuMode?: MenuMode;
  menuStyle?: CSSProperties;
  menuClassName?: string;
  menuConf: any;
  permissionPoints?: any;
  systemKey: string;
  systemName?: string;
  isroot?: boolean;
  siderCollapsed: boolean;
  logoIcon?: any;
  changeSiderCollapsed?: any;
  cPrefixCls?: string;
  iconFontSize?: number;
}

const { Item: MenuItem, Divider: MenuDivider, SubMenu } = Menu;

const MenuNav = (props: IMenuNavProps) => {
  const {
    menuStyle,
    siderCollapsed = false,
    theme,
    menuConf,
    systemKey,
    isroot,
    iconFontSize = 21,
    cPrefixCls = 'dcd-layout',
    menuMode = 'inline',
  } = props;
  const currSysMenuConf = _.get(menuConf, 'children');
  const normalizedMenuConf = normalizeMenuConf(currSysMenuConf);
  let defaultOpenKeys: string[] = [];
  let selectedKeys: string[] = [];
  const intl = useIntl();

  const isActive = (path?: string) => {
    const location = useLocation();
    return !!matchPath(location.pathname, path);
  };
  const renderNavMenuItems = (navs: MenuConfItem[], prefix: string, firstLevel = false) => {
    const { permissionPoints } = props;

    const permissionedNavs = _.filter(navs, (nav) => {
      if (!isroot && nav.rootVisible) {
        return false;
      }
      if (nav.permissionPoint && !permissionPoints?.[nav.permissionPoint]) {
        return false;
      }
      return true;
    });

    return _.map(permissionedNavs, (nav, index) => {
      if (nav.divider) {
        return <MenuDivider key={index} />;
      }
      // const icon = nav.icon ? <i className={`iconfont ${nav.icon}`}></i> : null;

      const icon = nav.icon ? (
        <span className="anticon nav-menu-icon">
          <IconFont type={nav.icon} style={{ fontSize: iconFontSize, fill: '#fff' }} />
        </span>
      ) : null;

      const linkProps = {} as { target: string; href: string; to: { pathname?: string; search?: string } };
      let link;

      if (_.isArray(nav.children) && hasRealChildren(nav.children)) {
        const menuKey = nav.name;
        if (isActive(nav.to)) {
          defaultOpenKeys = _.union(defaultOpenKeys, [menuKey]) as any;
        }

        return (
          <SubMenu
            key={menuKey as any}
            icon={icon}
            title={intl.formatMessage({ id: `${prefix}.${nav.name}` })}
            popupClassName={`${cPrefixCls}-menu-popup`}
          >
            {siderCollapsed ? (
              <MenuItem key={nav.to} className="submenu-title">
                <span>{intl.formatMessage({ id: `${prefix}.${nav.name}` })}</span>
              </MenuItem>
            ) : null}
            {renderNavMenuItems(nav.children, `${prefix}.${nav.name}`)}
          </SubMenu>
        );
      }

      if (nav.target) {
        linkProps.target = nav.target;
      }

      if (nav.to && (isAbsolutePath(nav.to) || nav.isAbsolutePath)) {
        linkProps.href = nav.to;
        link = (
          <a {...linkProps}>
            {icon}
            <span className="menu-name">{intl.formatMessage({ id: `${prefix}.${nav.name}` })}</span>
          </a>
        );
      } else {
        if (nav.to && isActive(nav.to)) selectedKeys = [nav.to];

        linkProps.to = {
          pathname: nav.to,
        };

        link = (
          <Link to={linkProps.to}>
            {firstLevel ? (
              <div className="single-item">
                <span className="anticon nav-menu-icon">
                  <IconFont type={nav.icon} style={{ fontSize: iconFontSize, fill: '#fff' }} />
                </span>
                <span className="menu-name">{intl.formatMessage({ id: `${prefix}.${nav.name}` })}</span>
              </div>
            ) : (
              <span className="menu-name">{intl.formatMessage({ id: `${prefix}.${nav.name}` })}</span>
            )}
          </Link>
        );
      }

      return <MenuItem key={nav.to}>{link}</MenuItem>;
    });
  };

  const menus = renderNavMenuItems(normalizedMenuConf, `menu.${systemKey}`, true);

  return (
    <div className={`${cPrefixCls}-sider-menu`} id="left-sider-menu">
      <Menu
        defaultOpenKeys={siderCollapsed ? [] : defaultOpenKeys}
        selectedKeys={selectedKeys}
        theme={theme || 'dark'}
        mode={menuMode}
        style={menuStyle}
        inlineCollapsed={siderCollapsed}
      >
        {menus}
      </Menu>
    </div>
  );
};

export default MenuNav;
