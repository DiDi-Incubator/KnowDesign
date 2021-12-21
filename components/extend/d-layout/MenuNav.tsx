import React, { CSSProperties } from 'react';
import _ from 'lodash';
import { MenuMode } from 'rc-menu/lib/interface';
import { Link, matchPath, useLocation } from 'react-router-dom';
import './style/menu.less'
import Menu, { MenuProps } from '../../basic/menu';
import { hasRealChildren, isAbsolutePath, normalizeMenuConf } from './utils';
import { HeatMapOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

export interface MenuConfItem {
  key?: string,
  name?: string | React.ReactNode,
  path?: string,
  icon?: string,
  type?: 'group',
  component?: React.ReactNode,
  children?: MenuConfItem[],
  visible?: boolean,
  rootVisible?: boolean,
  networkopsVisible?: boolean,
  to?: string,
  divider?: boolean,
  target?: string,
  permissionPoint?: string,
  isAbsolutePath?: boolean,
}
export interface IMenuNavProps extends MenuProps {
  menuMode?: MenuMode;
  menuStyle?: CSSProperties;
  menuClassName?: string;
  menuConf: MenuConfItem[];
  permissionPoints?: any;
  systemKey: string;
  systemName: string;
  isroot?: boolean;
  siderCollapsed?: boolean;
  changeSiderCollapsed?: any;
  logoIcon?: any;
};


const { Item: MenuItem, Divider: MenuDivider, SubMenu } = Menu;

const MenuNav = (props: IMenuNavProps) => {
  const { logoIcon, menuStyle, menuMode = 'inline', siderCollapsed, changeSiderCollapsed, theme, menuConf, systemKey, isroot } = props;
  const currSysMenuConf = _.get(menuConf, 'children');
  const normalizedMenuConf = normalizeMenuConf(currSysMenuConf);
  let defaultOpenKeys: string[] = [];
  let selectedKeys: string[] = [];

  const isActive = (path?: string) => {
    return false;
    //
    // console.log(useLocation, 'useLocation---')
    // let location = useLocation();
    // return !!matchPath(location.pathname, path);
  }
  const renderNavMenuItems = (navs: MenuConfItem[], prefix: string) => {
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

      const icon = nav.icon ?
        <span className="nav-menu-icon">
          <MenuUnfoldOutlined style={{fontSize: 21}} />
          {/* <svg style={{ width: 21, height: 21 }} aria-hidden="true">
            <use xlinkHref={nav.icon}></use>
          </svg> */}
        </span> : null;

      const linkProps = {} as { target: string, href: string, to: { pathname?: string, search?: string } };
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
            title={`${prefix}.${nav.name}`}
          >
            {renderNavMenuItems(nav.children, `${prefix}.${nav.name}`)}
          </SubMenu>
        );
      }

      if (nav.target) {
        linkProps.target = nav.target;
      }

      if (
        nav.to
        && (
          isAbsolutePath(nav.to)
          || nav.isAbsolutePath
        )
      ) {
        linkProps.href = nav.to;
        link = (
          <a {...linkProps}>
            {icon}
            <span className="menu-name">{`${prefix}.${nav.name}`}</span>
          </a>
        );
      } else {
        if (nav.to && isActive(nav.to)) selectedKeys = [nav.to];

        linkProps.to = {
          pathname: nav.to,
        };

        link = (
          <Link to={linkProps.to}>
            <span className="menu-name">{`${prefix}.${nav.name}`}</span>
          </Link>
        );
      }

      return (
        <MenuItem
          key={nav.to}
        >
          {link}
        </MenuItem>
      );
    });
  }

  const menus = renderNavMenuItems(normalizedMenuConf, `menu.${systemKey}`);

  return (
    <div className="left-sider-menu">
      <div className={`menu-title ${siderCollapsed ? 'collapsed' : ''}`}>
        {
          !siderCollapsed ? <>
            <span className="menu-icon">
              <MenuUnfoldOutlined />
              <span className="title">{props.systemName}</span>

              {/* <svg style={{ width: 21, height: 21 }} aria-hidden="true">
                <use xlinkHref={''}></use>
              </svg> */}
            </span>
          </> : null
        }

        {React.createElement(siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: changeSiderCollapsed,
        })}
      </div>
      <Menu
        defaultOpenKeys={siderCollapsed ? [] : []}
        selectedKeys={selectedKeys}
        theme={theme}
        mode={menuMode}
        style={menuStyle}
      >
        {menus}
      </Menu>
    </div>
  )
};

export default MenuNav;
