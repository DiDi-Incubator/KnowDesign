import React from 'react';
import {Input} from 'antd';
import { TextAreaProps } from 'antd/lib/input';

const { TextArea } = Input;


const DTextArea = (props: TextAreaProps) => {
  return <TextArea className={'dantd-input-text'} {...props}/>
};

export default DTextArea;
