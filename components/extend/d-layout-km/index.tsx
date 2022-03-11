import React from 'react';
import DHeader, { IProps } from "./Header";
import DSider from "./Sider"
import DContent from "./Content";
import KMStyleLayout, { IKMStyleLayout } from "./KMStyleLayout";
import './style/index.less';

interface IDLayoutProps {
  style: any,
  children: JSX.Element | null
}

const DLayoutKM = (props: IDLayoutProps) => {
  return <div className='dcd-layout-km' style={props.style}>
    {props.children}
  </div>
};

DLayoutKM.Header = DHeader;
DLayoutKM.Content = DContent;
DLayoutKM.Sider = DSider;
DLayoutKM.KMStyleLayout = KMStyleLayout;

export default DLayoutKM;
