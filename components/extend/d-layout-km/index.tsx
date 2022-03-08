import React from 'react';
import DHeader from "./Header";
import DSider from "./Sider"
import DContent from "./Content";
import './style/index.less';

const DLayoutKM = (props) => {
  return <div className='dcd-layout-km'>
    {props.children}
  </div>
};

DLayoutKM.Header = DHeader;
DLayoutKM.Content = DContent;
DLayoutKM.Sider = DSider;

export default DLayoutKM;
