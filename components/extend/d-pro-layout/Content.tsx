import { Layout } from 'knowdesign';
import React from 'react';
import { defaultPrefix } from './commonDefine';

const { Content } = Layout;

export default (props: { style?: any; children: any }) => {
  return (
    <Content className={`${defaultPrefix}-content`} style={{ ...(props.style || {}) }}>
      {props.children}
    </Content>
  );
};
