import React from 'react';
import Layout, { SiderProps } from '../../basic/layout';
import MenuNav, { MenuConfItem } from './MenuNav';

export interface ISiderProps extends SiderProps {
  systemKey: string;
  systemName?: string;
  changeSiderCollapsed?: any;
  menuConf: MenuConfItem[]
  logoIcon?: any;
}

const { Sider } = Layout;

const DSider = (props: ISiderProps) => {
  const { logoIcon, prefixCls, collapsible = true, collapsed, collapsedWidth, width, theme, menuConf, systemKey, systemName, changeSiderCollapsed } = props;
  const cPrefixCls = `${prefixCls}-layout`;

  return (
    <Sider
      theme={theme}
      width={width}
      collapsedWidth={collapsedWidth}
      className={`${cPrefixCls}-sider`}
      trigger={null}
      collapsible={collapsible}
      collapsed={collapsed}
    >
      <MenuNav logoIcon={logoIcon} systemKey={systemKey} systemName={systemName} menuConf={menuConf} siderCollapsed={collapsed} changeSiderCollapsed={changeSiderCollapsed} />
    </Sider>
  );
}

export default DSider;
