import React from 'react';
import { Layout, LayoutProps } from '../../index';

export interface IContentProps extends LayoutProps {
  collapsed?: boolean;
}

const { Content } = Layout;

const DContent = (props: IContentProps) => {
  const { children, prefixCls, collapsed } = props;
  return (
    <Content className={`${prefixCls ? prefixCls + "-" : ""}layout-content ${collapsed ? "collapsed" : ""}`}>
      {children}
    </Content>
  );
}

export default DContent;
