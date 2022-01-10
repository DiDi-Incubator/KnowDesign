import React, { useEffect } from 'react';

// Layout Related Components
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import '../style/skote/theme.less';
import '../../icon-project/iconfont.css';
import { changeBodyAttribute, changeTopbarTheme } from '../utils';
import { layoutTypes, topBarThemeTypes } from '../config';

interface IProps {
  siderContent?: JSX.Element;
  sidebarTheme: 'dark' | 'light';
  siderbarNavLogo?: any;
  siderbarNavTitle?: any;
  layout?: layoutTypes;
  children: JSX.Element;
  noHeader?: boolean;
  noSider?: boolean;
  noFooter?: boolean;
  changeCollpsed?: any;
  headerLeftContent?: any;
  systemKey?: string;
  leftMenus: any;
  defaultSideCollpsed?: boolean;
  userDropDowMenu?: any;
  msgDropDowMenu?: any;
  headerLeftEventType?: string;
  logo?: any;
  actionAfterSetHeader?: any;
  needMsgIcon?: boolean;
  needSettingsIcon?: boolean;
  getUserInfo?: (params?: any) => Promise<string>;
  getMsgInfo?: (params?: any) => Promise<string>;
}

const Layout = (props: IProps) => {
  const [layout, setLayout] = React.useState<string>(props.layout || layoutTypes.VERTICAL);
  const [topbarTheme, setTopbarTheme] = React.useState<string>(props.layout || topBarThemeTypes.LIGHT);
  useEffect(() => {
    changeBodyAttribute('data-sidebar', props.sidebarTheme);
  }, []);

  const changeLayout = (layout) => {
    setLayout(layout);
    try {
      if (layout === 'horizontal') {
        changeTopbarTheme('dark');
        document.body.removeAttribute('data-sidebar');
        document.body.removeAttribute('data-sidebar-image');
        document.body.removeAttribute('data-sidebar-size');
      } else {
        changeTopbarTheme('light');
        changeBodyAttribute('data-sidebar', 'dark');
      }
      changeBodyAttribute('data-layout', layout);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeTopbarTheme = (topbarTheme) => {
    changeTopbarTheme(topbarTheme);
    setTopbarTheme(topbarTheme);
  };

  return (
    <>
      <div id="layout-wrapper">
        {!props.noHeader ? (
          <Header
            headerLeftContent={props.headerLeftContent}
            layoutType={layout}
            topbarTheme={topbarTheme}
            changeLayout={changeLayout}
            changeTopbarTheme={onChangeTopbarTheme}
            userDropDowMenu={props.userDropDowMenu}
            msgDropDowMenu={props.msgDropDowMenu}
            getUserInfo={props.getUserInfo}
            getMsgInfo={props.getMsgInfo}
            logo={props.logo}
            needMsgIcon={props.needMsgIcon}
            needSettingsIcon={props.needSettingsIcon}
            actionAfterSetHeader={props.actionAfterSetHeader}
            headerLeftEventType={props.headerLeftEventType}
          />
        ) : null}
        {!props.noSider && layout === layoutTypes.VERTICAL ? (
          <Sidebar
            systemKey={props.systemKey}
            leftMenus={props.leftMenus}
            changeCollpsed={props.changeCollpsed}
            title={props.siderbarNavTitle}
            theme={props.sidebarTheme}
            defaultSideCollpsed={props.defaultSideCollpsed}
          >
            {props.siderContent}
          </Sidebar>
        ) : null}
        <Content>{props.children}</Content>
        {!props.noFooter ? <Footer /> : null}
      </div>
    </>
  );
};

export default Layout;
