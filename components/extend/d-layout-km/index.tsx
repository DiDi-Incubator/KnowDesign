import React from 'react';
import DHeader from "./Header";
import DSider from "./Sider"
import DContent from "./Content";
import './style/index.less';

interface IProps {
  style: any,
  children: JSX.Element | null
}

const DLayoutKM = (props: IProps) => {
  return <div className='dcd-layout-km' style={props.style}>
    {props.children}
  </div>
};

DLayoutKM.Header = DHeader;
DLayoutKM.Content = DContent;
DLayoutKM.Sider = DSider;

export default DLayoutKM;
