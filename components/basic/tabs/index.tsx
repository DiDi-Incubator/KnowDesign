import React from 'react';
import { Tabs, TabsProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';

const { TabPane } = Tabs;
function DTabs(props: TabsProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-tabs`;
  const alertCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: true,
  });

  return <Tabs className={alertCls} {...props}>
    {props.children}
  </Tabs>
}
DTabs.TabPane = TabPane;
export default DTabs;