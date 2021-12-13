import React, { useEffect, useState } from 'react';
import './style/index.less';

// import './assets/iconfont-es/iconfont.js';
import Layout, { LayoutProps } from '../../basic/layout';
import Input from '../../basic/input';
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

export interface IHeaderProps extends LayoutProps {
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  siderCollapsed?: boolean;
  changeSiderCollapsed?: any;
}

const { Header } = Layout;

const renderLeftEle = ({ siderCollapsed, changeSiderCollapsed }) => {

  return (
    <>
      {React.createElement(siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: changeSiderCollapsed,
      })}
      <Input className="search" prefix={<SearchOutlined />}
      />
    </>
  );
}

const DHeader = (props: IHeaderProps) => {
  const { leftElement, rightElement, prefixCls, siderCollapsed, changeSiderCollapsed } = props;

  const cPrefixCls = `${prefixCls ?? ''}-layout`;

  return (
    <Header className={`${cPrefixCls}-header`}>
      <div className={`${cPrefixCls}-header-left`}>
        {leftElement ? leftElement : renderLeftEle({ siderCollapsed, changeSiderCollapsed })}
      </div>
      <div className={`${cPrefixCls}-header-right`}>
        {rightElement ? rightElement : null}
      </div>
    </Header>
  );
}

export default DHeader;
