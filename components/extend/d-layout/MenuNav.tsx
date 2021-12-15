import React, { CSSProperties } from 'react';
import _ from 'lodash';
import queryString from 'query-string';
import { MenuMode } from 'rc-menu/lib/interface';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { Link, matchPath, RouteComponentProps, withRouter } from 'react-router-dom';

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
  permissionPoints: any;
  systemKey: string;
  isroot?: boolean,
  collapsed?: boolean
};


const { Item: MenuItem, Divider: MenuDivider, SubMenu, ItemGroup } = Menu;

const MenuNav = (props: IMenuNavProps & RouteComponentProps & WrappedComponentProps) => {
  const { prefixCls, menuStyle, menuMode = 'inline', collapsed, menuClassName, theme, menuConf, systemKey, isroot } = props;
  const currSysMenuConf = _.get(menuConf, 'children');
  const normalizedMenuConf = normalizeMenuConf(currSysMenuConf);
  let defaultOpenKeys: string[] = [];
  let selectedKeys: string[] = [];

  const isActive = (path?: string) => {
    console.log(matchPath, '----')
    // const { location } = props;
    // return !!matchPath(location.pathname, { path })

    return false;
    // return !!useRouteMatch(path);
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
        <svg className={`${prefixCls}-layout-sider-menu-icon`} aria-hidden="true">
          <use xlinkHref={nav.icon}></use>
        </svg> : null;

      const linkProps = {} as { target: string, href: string, to: { pathname?: string, search?: string } };
      let link;

      if (_.isArray(nav.children) && hasRealChildren(nav.children)) {
        const menuKey = nav.name;
        if (isActive(nav.to)) {
          defaultOpenKeys = _.union(defaultOpenKeys, [menuKey]) as any;
        }

        if (nav.type === 'group') {
          return (
            <ItemGroup
              key={menuKey as any}
              title={
                collapsed ? '/' : props.intl.formatMessage({ id: `${prefix}.${nav.name}` })
              }
            >
              {renderNavMenuItems(nav.children, `${prefix}.${nav.name}`)}
            </ItemGroup>
          );
        }

        return (
          <SubMenu
            key={menuKey as any}
            title={(
              <>
                {icon}
                <span className="menu-name">{<FormattedMessage id={`${prefix}.${nav.name}`} />}</span>
              </>
            )}
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
            <span className="menu-name">{<FormattedMessage id={`${prefix}.${nav.name}`} />}</span>
          </a>
        );
      } else {
        if (nav.to && isActive(nav.to)) selectedKeys = [nav.to];

        linkProps.to = {
          pathname: nav.to,
        };

        link = (
          <Link to={linkProps.to}>
            {icon}
            <span className="menu-name">{<FormattedMessage id={`${prefix}.${nav.name}`} />}</span>
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
      className={menuClassName}
    >
      {menus}
    </Menu>
  )
};

export default withRouter(injectIntl(MenuNav));
