import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { Row, Col, Menu, Affix } from '../../../../components';
import {
  ExportOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import classNames from 'classnames';
import get from 'lodash/get';

import Article from './Article';
import PrevAndNext from './PrevAndNext';
import ComponentDoc from './ComponentDoc';
import ComponentOverview from './ComponentOverview';
import * as utils from '../utils';

const { SubMenu } = Menu;

/**
 * 返回当前地址匹配的菜单项
 * @param {Props} props - 注入了 route 参数的 props
 * @param {string} props.params.children
 */
function getActiveMenuItem(props) {
  const { children } = props.params;
  return (
    (children && children.replace('-cn', '')) || props.location.pathname.replace(/(^\/|-cn$)/g, '')
  );
}

// 将 components、docs/react、changelog 视为 module，需要从这些 module 中读取 md 数据
const MODULES = [
  'components',
  'docs',
];
/**
 *
 * @param {Props} props - 注入了 route 参数的 props
 * @param {string} props.location.pathname - 当前访问地址的 pathname
 * @return {Array<>}
 */
function getModuleData(props) {
  const { pathname } = props.location;
  const moduleName = /^\/?components/.test(pathname) ? 'components' : 'docs';
  const moduleData = [
    ...props.picked.docs,
    ...props.picked.components,
  ];
  return moduleData;
}

/**
 * 将文件名转换为 url pathname
 * @param {string} filename - 文件名
 * @return {string}
 */
function fileNameToPath(filename) {
  const snippets = filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').split('/');
  return snippets[snippets.length - 1];
}

/**
 * 获取侧边栏应该打开的菜单项 key 值
 * @param {Props} nextProps
 * @return {Array<MenuKey>}
 */
const getSideBarOpenKeys = nextProps => {
  const { themeConfig } = nextProps;
  const { pathname } = nextProps.location;
  const { categoryOrder, typeOrder } = themeConfig;
  const locale = utils.isEnUS(pathname) ? 'en-US': 'zh-CN';
  const moduleData = getModuleData(nextProps);
  const shouldOpenKeys = utils
    .getMenuItems(moduleData, locale, categoryOrder, typeOrder)
    .map(m => (m.title && m.title[locale]) || m.title);
  return shouldOpenKeys;
};

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openKeys: undefined,
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.openKeys) {
      return {
        ...state,
        openKeys: getSideBarOpenKeys(props),
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { location: prevLocation = {} } = prevProps || {};
    if (!prevProps || prevLocation.pathname !== location.pathname) {
      this.bindScroller();
    }
    if (!window.location.hash && prevLocation.pathname !== location.pathname) {
      document.documentElement.scrollTop = 0;
    }
    // when subMenu not equal
    if (get(this.props, 'route.path') !== get(prevProps, 'route.path')) {
      // reset menu OpenKeys
      this.handleMenuOpenChange();
    }
    setTimeout(() => {
      if (!window.location.hash) {
        return;
      }
      const element = document.getElementById(
        decodeURIComponent(window.location.hash.replace('#', '')),
      );
      if (element && document.documentElement.scrollTop === 0) {
        element.scrollIntoView();
      }
    }, 0);
  }

  componentWillUnmount() {
    this.scroller.disable();
  }

  getMenuItems(footerNavIcons = {}) {
    const { themeConfig, intl: {locale} } = this.props;
    const moduleData = getModuleData(this.props);
    const menuItems = utils.getMenuItems(
      moduleData,
      locale,
      themeConfig.categoryOrder,
      themeConfig.typeOrder,
    );
    // console.info('comp:getMenuItems', menuItems, moduleData, themeConfig, this.props);
    return menuItems.map(menuItem => {
      if (menuItem.children) {
        return (
          <SubMenu title={<h4>{menuItem.title}</h4>} key={menuItem.title}>
            {menuItem.children.map(child => {
              if (child.type === 'type') {
                return (
                  <Menu.ItemGroup title={child.title} key={child.title}>
                    {child.children
                      .sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
                      .map(leaf => this.generateMenuItem(false, leaf, footerNavIcons))}
                  </Menu.ItemGroup>
                );
              }
              return this.generateMenuItem(false, child, footerNavIcons);
            })}
          </SubMenu>
        );
      }
      return this.generateMenuItem(true, menuItem, footerNavIcons);
    });
  }

  getFooterNav(menuItems, activeMenuItem) {
    const menuItemsList = this.flattenMenu(menuItems);
    let activeMenuItemIndex = -1;
    menuItemsList.forEach((menuItem, i) => {
      if (menuItem && menuItem.key === activeMenuItem) {
        activeMenuItemIndex = i;
      }
    });
    const prev = menuItemsList[activeMenuItemIndex - 1];
    const next = menuItemsList[activeMenuItemIndex + 1];
    return { prev, next };
  }

  handleMenuOpenChange = openKeys => {
    this.setState({ openKeys });
  };

  bindScroller() {
    if (this.scroller) {
      this.scroller.disable();
    }
    require('intersection-observer'); // eslint-disable-line
    const scrollama = require('scrollama'); // eslint-disable-line
    this.scroller = scrollama();
    this.scroller
      .setup({
        step: '.markdown > h2, .code-box', // required
        offset: 0,
      })
      .onStepEnter(({ element }) => {
        [].forEach.call(document.querySelectorAll('.toc-affix li a'), node => {
          node.className = ''; // eslint-disable-line
        });
        const currentNode = document.querySelectorAll(`.toc-affix li a[href="#${element.id}"]`)[0];
        if (currentNode) {
          currentNode.className = 'current';
        }
      });
  }

  generateMenuItem(isTop, item, { before = null, after = null }) {
    const {
      intl: { locale },
    } = this.props;
    const key = fileNameToPath(item.filename);
    if (!item.title) {
      return null;
    }
    const title = item.title[locale] || item.title;
    const text = isTop
      ? title
      : [
          <span key="english">{title}</span>,
          <span className="chinese" key="chinese">
            {item.subtitle}
          </span>,
        ];
    const { disabled } = item;
    /* 
      * 通过filename导出url
      * @param components/extend/basic-form-items/index.md
      * return components/extend/basic-form-items/
    */
    const url = item.filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').toLowerCase();
    const child = !item.link ? (
      <Link
        to={utils.getLocalizedPathname(
          /^components/.test(url) ? `${url}/` : url,
          locale === 'zh-CN',
        )}
        disabled={disabled}
      >
        {before}
        {text}
        {after}
      </Link>
    ) : (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        disabled={disabled}
        className="menu-item-link-outside"
      >
        {before}
        {text} <ExportOutlined />
        {after}
      </a>
    );

    return (
      <Menu.Item key={key.toLowerCase()} disabled={disabled}>
        {child}
      </Menu.Item>
    );
  }

  flattenMenu(menu) {
    if (!menu) {
      return null;
    }
    if (menu.type && menu.type.isMenuItem) {
      return menu;
    }
    if (Array.isArray(menu)) {
      return menu.reduce((acc, item) => acc.concat(this.flattenMenu(item)), []);
    }
    return this.flattenMenu((menu.props && menu.props.children) || menu.children);
  }

  renderMainContent() {
    const { localizedPageData, demos, location } = this.props;
    if (location.pathname.includes('docs/overview')) {
      return (
        <ComponentOverview
          {...this.props}
          doc={localizedPageData}
          componentsData={getModuleData(this.props).filter(
            ({ meta }) => meta.category === 'Components',
          )}
        />
      );
    }
    if (demos) {
      return (
        <>
          <ComponentDoc 
            {...this.props} 
            doc={localizedPageData} 
            demos={this.props.demos} 
          />
        </>
      );
    }
    return (
      <>
        <Article {...this.props} content={localizedPageData} />
      </>
    );
  }

  render() {
    const { props } = this;
    const { openKeys } = this.state;
    const activeMenuItem = getActiveMenuItem(props);
    const menuItems = this.getMenuItems();
    const menuItemsForFooterNav = this.getMenuItems({
      before: <LeftOutlined  className="footer-nav-icon-before"  />,
      after: <RightOutlined className="footer-nav-icon-after"  />,
    });
    const { prev, next } = this.getFooterNav(menuItemsForFooterNav, activeMenuItem);
    const { localizedPageData } = props;
    const mainContainerClass = classNames('main-container', {
      'main-container-component': !!props.demos,
    });
    const menuChild = (
      <Menu
        inlineIndent="40"
        className="aside-container menu-site"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={[activeMenuItem]}
        onOpenChange={this.handleMenuOpenChange}
      >
        {menuItems}
      </Menu>
    );

    return (
      <div className="main-wrapper">
        <Row>
          <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} className="main-menu">
            <Affix>
              <section className="main-menu-inner">{menuChild}</section>
            </Affix>
          </Col>
          <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
            <section className={mainContainerClass}>
              {this.renderMainContent()}
            </section>
            <PrevAndNext prev={prev} next={next} />
          </Col>
        </Row>
      </div>
    );
  }

}

export default injectIntl(MainContent);

