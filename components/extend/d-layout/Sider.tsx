import React from 'react';
import { Layout } from 'knowdesign';
import { SiderProps } from '../../basic/layout';
import MenuNav, { MenuConfItem } from './MenuNav';

export interface ISiderProps extends SiderProps {
  systemKey: string;
  systemName?: string;
  changeSiderCollapsed?: any;
  menuConf: MenuConfItem[];
  logoIcon?: any;
}

const { Sider } = Layout;

const DSider = (props: ISiderProps) => {
  const {
    logoIcon,
    prefixCls,
    collapsible = true,
    collapsed,
    collapsedWidth,
    width,
    theme,
    menuConf,
    systemKey,
    systemName,
    changeSiderCollapsed,
  } = props;
  const cPrefixCls = `${prefixCls}-layout`;

  return (
    <Sider
      theme={theme}
      width={180}
      collapsedWidth={collapsedWidth}
      className={`${cPrefixCls}-sider`}
      trigger={null}
      collapsible={collapsible}
      collapsed={collapsed}
    >
      <MenuNav
        cPrefixCls={cPrefixCls}
        logoIcon={logoIcon}
        systemKey={systemKey}
        systemName={systemName}
        menuConf={menuConf}
        siderCollapsed={collapsed}
        changeSiderCollapsed={changeSiderCollapsed}
      />
    </Sider>
  );
};

export default DSider;
