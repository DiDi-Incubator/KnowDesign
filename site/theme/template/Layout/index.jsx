import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'knowdesign';
import zhCN from 'knowdesign/locale/zh_CN';
import 'antd/dist/antd.css';
import Header from './Header';
import SiteContext from './SiteContext';
import Footer from './Footer';
import * as utils from '../utils';
import enLocale from '../../en-US';
import cnLocale from '../../zh-CN';
import '../../static/style';
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('../../static/style');

  // Expose to iframe
  window.react = React;
  window['react-dom'] = ReactDOM;
  // eslint-disable-next-line global-require
  window.antd = require('antd');
}

const RESPONSIVE_MOBILE = 768;

export default class BasicLayout extends React.Component {
  static contextType = SiteContext;

  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isEnUS(pathname) ? enLocale : cnLocale;
    this.state = {
      appLocale,
    };
  }

  componentDidMount() {
    this.updateMobileMode();
    window.addEventListener('resize', this.updateMobileMode);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMobileMode);
  }

  updateMobileMode = () => {
    const { isMobile } = this.state;
    const newIsMobile = window.innerWidth < RESPONSIVE_MOBILE;
    if (isMobile !== newIsMobile) {
      this.setState({
        isMobile: newIsMobile,
      });
    }
  };

  render() {
    const { appLocale, isMobile } = this.state;
    const { children, ...restProps } = this.props;
    return (
      <SiteContext.Provider value={{ isMobile }}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages} >
          <ConfigProvider locale={appLocale.locale === 'zh-CN' ? zhCN : null} isMobile={isMobile}>
            <div className="page-wrapper">
              <Header {...restProps} />
              {children}
              <Footer {...restProps} />
            </div>
          </ConfigProvider>
        </IntlProvider>
      </SiteContext.Provider>
    );
  }
}
