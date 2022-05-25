import React from 'react';
import DHeader, { IProps } from "./Header";
import DSider from "./Sider"
import DContent from "./Content";
import TwoColumnsStyleLayout, { ITwoColumnsStyleLayout } from "./TwoColumnsStyleLayout";
import './style/index.less';

interface IDLayoutProps {
  style?: any,
  children: JSX.Element | null
}

const DLayoutTwoColumns = (props: IDLayoutProps) => {
  return <div className='dcd-layout-two-columns' style={props.style}>
    {props.children}
  </div>
};

DLayoutTwoColumns.Header = DHeader;
DLayoutTwoColumns.Content = DContent;
DLayoutTwoColumns.Sider = DSider;
DLayoutTwoColumns.TwoColumnsStyleLayout = TwoColumnsStyleLayout;

export default DLayoutTwoColumns;
