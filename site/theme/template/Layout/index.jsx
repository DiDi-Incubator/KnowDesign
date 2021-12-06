import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import 'moment/locale/zh-cn';
import { ConfigProvider } from '../../../../components';
import zhCN from 'dcloud-design/locale/zh_CN';
import 'antd/dist/antd.css';
import Header from './Header';
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
export default class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isEnUS(pathname) ? enLocale : cnLocale;
    this.state = {
      appLocale,
    };
  }

  render() {
    const { appLocale } = this.state;
    console.log( appLocale, appLocale.locale === 'zh-CN' )
    const { children, ...restProps } = this.props;
    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages} >
        <ConfigProvider locale={appLocale.locale === 'zh-CN' ? zhCN : null}>
          <div className="page-wrapper">
            <Header {...restProps} />
            {children}
            <Footer {...restProps} />
          </div>
        </ConfigProvider>
      </IntlProvider>
    );
  }
}
