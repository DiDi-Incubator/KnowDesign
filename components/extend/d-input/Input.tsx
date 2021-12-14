import React from 'react';
import {Input, InputProps} from 'antd';
import DSearch from './search';

const DInput = (props: InputProps) => {
  return <Input className={'dantd-Input'} {...props}/>
};

DInput.Search = DSearch;

export default DInput;
