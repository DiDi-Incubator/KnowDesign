import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

// //Import Scrollbar
import SimpleBar from 'simplebar-react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { hasRealChildren, isAbsolutePath, normalizeMenuConf } from '../utils';

export interface ISiderMenuProps extends RouteComponentProps {
  menuConf: any;
  permissionPoints?: any;
  systemKey: string;
  siderCollapsed?: boolean;
  changeSiderCollapsed?: any;
  logoIcon?: any;
}

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

const SidebarContent = (props: ISiderMenuProps) => {
  const ref = useRef();
  const intl = useIntl();
  const currSysMenuConf = _.get(props.menuConf, 'children');
  const normalizedMenuConf = normalizeMenuConf(currSysMenuConf);

  const renderNavMenuItems = (navs: MenuConfItem[], prefix: string) => {
    const { permissionPoints } = props;

    const permissionedNavs = _.filter(navs, (nav) => {
      if (nav.permissionPoint && !permissionPoints?.[nav.permissionPoint]) {
        return false;
      }
      return true;
    });

    return _.map(permissionedNavs, (nav, index) => {
      const icon = nav.icon ? <i className={`bx iconfont ${nav.icon}`}></i> : null;

      const linkProps = {} as { target: string; href: string; to: { pathname?: string; search?: string } };
      let link;

      if (_.isArray(nav.children) && hasRealChildren(nav.children)) {
        const menuKey = nav.name;

        return (
          <li key={menuKey as string}>
            <Link to="/#" className="has-arrow" aria-expanded="false">
              {icon}
              <span>{intl.formatMessage({ id: `${prefix}.${nav.name}` })}</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              {renderNavMenuItems(nav.children, `${prefix}.${nav.name}`)}
            </ul>
          </li>
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
        linkProps.to = {
          pathname: nav.to,
        };

        link = <Link to={linkProps.to}>{intl.formatMessage({ id: `${prefix}.${nav.name}` })}</Link>;
      }

      return <li key={nav.to}>{link}</li>;
    });
  };

  const menus = renderNavMenuItems(normalizedMenuConf, `menu.${props.systemKey}`);

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu('#side-menu');
      let matchingMenuItem = null;
      const ul = document.getElementById('side-menu');
      const items = ul.getElementsByTagName('a');

      for (let i = 0; i < items.length; ++i) {
        if (`/${props.systemKey}${pathName}` === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    console.log((ref.current as any).recalculate, '(ref.current as any).recalculate');
    if (typeof (ref?.current as any)?.recalculate === 'function') {
      (ref.current as any).recalculate();
    }
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        (ref.current as any).getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add('active');
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.childNodes[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {menus}
          </ul>
        </div>
      </SimpleBar>
    </>
  );
};

export default withRouter(SidebarContent);
