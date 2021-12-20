import React, { CSSProperties } from 'react';
import _ from 'lodash';
import { MenuMode } from 'rc-menu/lib/interface';
import { Link, matchPath, useLocation } from 'react-router-dom';
import './style/menu.less'
import Menu, { MenuProps } from '../../basic/menu';
import { hasRealChildren, isAbsolutePath, normalizeMenuConf } from './utils';

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
  isroot?: boolean,
  collapsed?: boolean
};


const { Item: MenuItem, Divider: MenuDivider, SubMenu } = Menu;

const MenuNav = (props: IMenuNavProps) => {
  const { prefixCls, menuStyle, menuMode = 'inline', collapsed, menuClassName, theme, menuConf, systemKey, isroot } = props;
  const currSysMenuConf = _.get(menuConf, 'children');
  const normalizedMenuConf = normalizeMenuConf(currSysMenuConf);
  let defaultOpenKeys: string[] = [];
  let selectedKeys: string[] = [];
  console.log(currSysMenuConf, normalizedMenuConf, 'normalizedMenuConf')
  const isActive = (path?: string) => {
    return false;
    //
    // console.log(useLocation, 'useLocation---')
    // let location = useLocation();
    // return !!matchPath(location.pathname, path);
  }
  const renderNavMenuItems = (navs: MenuConfItem[], prefix: string) => {
    const { collapsed, permissionPoints } = props;

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
        <span className="anticon">
          <svg aria-hidden="true">
            <use xlinkHref={nav.icon}></use>
          </svg>
        </span> : null;

      const linkProps = {} as { target: string, href: string, to: { pathname?: string, search?: string } };
      let link;

      if (_.isArray(nav.children) && hasRealChildren(nav.children)) {
        const menuKey = nav.name;
        if (isActive(nav.to)) {
          defaultOpenKeys = _.union(defaultOpenKeys, [menuKey]) as any;
        }

        console.log(icon, 'icon')
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
    <Menu
      defaultOpenKeys={collapsed ? [] : []}
      selectedKeys={selectedKeys}
      theme={theme}
      mode={menuMode}
      style={menuStyle}
      className="left-sider-menu"
    >
      {menus}
    </Menu>
  )
};

export default MenuNav;
