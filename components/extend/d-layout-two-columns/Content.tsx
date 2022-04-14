import { Layout } from '../../index';
import React from 'react'

const { Content } = Layout;

export default (props) => {
  const cPrefixCls = `dcd-layout-two-columns`;
  return <Content className={`${cPrefixCls}-content`} style={{ maxHeight: '100%', overflow: 'auto' }}>
    {props.children}
  </Content>
}
