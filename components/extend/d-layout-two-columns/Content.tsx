import { Layout } from '../../index';
import React from 'react'

const { Content } = Layout;

export default (props: {
  style?: any;
  children: any;
}) => {
  const cPrefixCls = `dcd-layout-two-columns`;
  return <Content className={`${cPrefixCls}-content`} style={{ ...(props.style || {}) }}>
    {props.children}
  </Content>
}
