import React from 'react';
import {InputNumber, InputNumberProps} from 'antd';

const DInputNumber = (props: InputNumberProps) => {
  return <InputNumber className={'dantd-input-number'} {...props}/>
};

export default DInputNumber;
