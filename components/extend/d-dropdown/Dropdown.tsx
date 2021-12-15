import React from 'react';
import {Dropdown, DropDownProps} from 'antd';

const DDropdown = (props: DropDownProps) => {
  return <Dropdown className={'dantd-dropdown'} {...props}/>
};

export default DDropdown;
