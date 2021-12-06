import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import { BaseButtonProps } from 'antd/es/button/button';

const ButtonTypes = ["primary-standard", "secondary", "secondary-standard", "no-border"]; // 主要/标准按钮、次要按钮、次要/标准按钮、无边框
type ButtonType = typeof ButtonTypes[number];

interface btnProps extends BaseButtonProps{
  prefixCls?: string;
  customtype?: ButtonType;
}

const DButton = (props: btnProps) => {
  const prefixCls = `${props.prefixCls || 'dantd'}-button`;
  const buttonCls = classNames({
    [`${prefixCls}-standard`]: props.customtype === ButtonTypes[0],
    [`${prefixCls}-secondary`]: props.customtype === ButtonTypes[1],
    [`${prefixCls}-secondary-standard`]: props.customtype === ButtonTypes[2],
    [`${prefixCls}-no-border`]: props.customtype === ButtonTypes[3],
  });
  return (
    <span className={prefixCls}>
      <Button className={buttonCls} {...props}/>
    </span>
  )
}

export default DButton;
