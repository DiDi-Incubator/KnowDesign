import React, { useEffect, useState } from 'react';
import Layout, { SiderProps } from '../../basic/layout';

export interface ISiderProps extends SiderProps {

}

const { Sider } = Layout;

const DSider = (props: ISiderProps) => {
  const { prefixCls, collapsible, collapsed, collapsedWidth, width, theme } = props;
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

    </Sider>
  );
}

export default DSider;
