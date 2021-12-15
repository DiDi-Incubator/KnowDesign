import React from 'react';
import {Input, InputProps} from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const DSearch = (props: InputProps) => {
  return <Input prefix={<SearchOutlined style={{fontSize: 13}} />} className={'dantd-input-search'} {...props}/>
};

export default DSearch;
