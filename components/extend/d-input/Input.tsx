import React from 'react';
import {Input, InputProps} from 'antd';
import DSearch from './search';
import DTextArea from './textArea';


const DInput = (props: InputProps) => {
  return <Input className={'dantd-input'} {...props}/>
};

DInput.TextArea = DTextArea;
DInput.Search = DSearch;

export default DInput;
