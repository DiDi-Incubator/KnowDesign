import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Select, Menu, Row, Col } from '@didi/dcloud-design';
import githubImg from './github.png';
import * as utils from '../utils';


const { Option } = Select;

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    // intl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
    };
  }

  componentDidMount() {
    const { intl, router } = this.props;
    router.listen(this.handleHideMenu);
  }

  onMenuVisibleChange = (visible) => {
    this.setState({
      menuVisible: visible,
    });
  };

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  };

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  /**
   * 切换版本
   */
  handleVersionChange = (url) => {
    const currentUrl = window.location.href;
    const currentPathname = window.location.pathname;
    window.location.href = currentUrl
      .replace(window.location.origin, url)
      .replace(currentPathname, utils.getLocalizedPathname(currentPathname));
  };

  /**
   * 改变语言
   */
  handleLangChange = () => {
    const {
      location: { pathname },
    } = this.props;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'zh-CN' : 'en-US');
    }

    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname)),
      );
  };

  render() {
    const { menuVisible } = this.state;
    const { location, themeConfig } = this.props;

    const { siteName, logo: logoImg } = themeConfig;
    const menuMode = 'horizontal';
    const module = location.pathname
      .replace(/(^\/|\/$)/g, '')
      .split('/')
      .slice(0, -1)
      .join('/');
    let activeMenuItem = module || 'home';
    if (activeMenuItem === 'components' || location.pathname === 'changelog') {
      activeMenuItem = 'docs';
    }
    const {
      intl: { locale },
    } = this.props;
    const isZhCN = locale === 'zh-CN';

    const headerClassName = classNames({
      clearfix: true,
    });

    const menu = [
      <Menu
        className="menu-site"
        mode={menuMode}
        selectedKeys={[activeMenuItem]}
        id="nav"
        key="nav"
      >
        <Menu.Item key="docs">
          <Link to={utils.getLocalizedPathname('/docs/overview', isZhCN)}>
            <FormattedMessage id="app.header.menu.documentation" />
          </Link>
        </Menu.Item>
        <Menu.Item key="components/basic">
          <Link to={utils.getLocalizedPathname('/components/basic/overview/', isZhCN)}>
            <FormattedMessage id="app.header.menu.components" />
          </Link>
        </Menu.Item>
        <Menu.Item key="components/extend">
          <Link to={utils.getLocalizedPathname('/components/extend/overview/', isZhCN)}>
            <FormattedMessage id="app.header.menu.components.extend" />
          </Link>
        </Menu.Item>
        <Menu.Item key="components/common-pages">
          <Link to={utils.getLocalizedPathname('/components/common-pages/overview/', isZhCN)}>
            <FormattedMessage id="app.header.menu.components.commonpages" />
          </Link>
        </Menu.Item>
        <Menu.Item key="components/utils">
          <Link to={utils.getLocalizedPathname('/components/utils/overview/', isZhCN)}>
            <FormattedMessage id="app.header.menu.components.utils" />
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="components/hook">
          <Link to={utils.getLocalizedPathname('/components/hook/overview/', isZhCN)}>
            <FormattedMessage id="app.header.menu.components.hook" />
          </Link>
        </Menu.Item> */}
      </Menu>,
    ];

    // @TODO: 支持多语言
    const searchPlaceholder = locale === 'zh-CN' ? '搜索' : 'Search';
    return (
      <header id="header" className={headerClassName}>
        <Row>
          <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24}>
            <Link to={utils.getLocalizedPathname('/', isZhCN)} id="logo">
              <img alt="logo" src={logoImg} />
              <span>{siteName}</span>
            </Link>
          </Col>
          <Col xxl={18} xl={17} lg={16} md={16} sm={0} xs={0}>
            {menu}
          </Col>
          <Col xxl={2} xl={2} lg={2} md={2} sm={0} xs={0}>
            <a
              style={{
                display: 'block',
                lineHeight: '60px',
                textAlign: 'center',
              }}
              href="https://git.xiaojukeji.com/bigdata-cloud/dcloud-design"
              target="_blank"
              rel="noreferrer"
            >
              <img width="25" alt="github" src={githubImg} />
            </a>
          </Col>
        </Row>
      </header>
    );
  }
}

export default injectIntl(Header);
