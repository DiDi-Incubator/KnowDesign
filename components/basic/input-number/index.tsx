import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';


function DInputNumber(props: InputNumberProps) {
  const {
    className,
    prefixCls,
  } = props;
  const dPrefixCls = `${prefixCls || 'dantd'}-input-number`;
  
  const inputNumberCls = classNames({
    [dPrefixCls]: true,
    [`${className}`]: !!className,
  });

  return (
    <InputNumber 
      {...props}
      className={inputNumberCls}
    />
  )
};

export default DInputNumber;