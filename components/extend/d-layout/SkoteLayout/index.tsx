import React, { useEffect } from 'react';

// Layout Related Components
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import '../assets/scss/theme.scss';
import '../assets/fonts/iconfont.css';
import '../assets/fonts/iconfont.js';
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
            headerLeftContent="我的工作台"
            layoutType={layout}
            topbarTheme={topbarTheme}
            changeLayout={changeLayout}
            changeTopbarTheme={onChangeTopbarTheme}
          />
        ) : null}
        {!props.noSider && layout === layoutTypes.VERTICAL ? (
          <Sidebar changeCollpsed={props.changeCollpsed} title={props.siderbarNavTitle} theme={props.sidebarTheme}>
            {props.siderContent}
          </Sidebar>
        ) : null}
        <Content>
          <div>test</div>
        </Content>
        {!props.noFooter ? <Footer /> : null}
      </div>
    </>
  );
};

export default Layout;
