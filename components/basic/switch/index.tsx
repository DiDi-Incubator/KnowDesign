import React from 'react';
import { Switch, SwitchProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';

function DSwitch(props: SwitchProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-switch`;
  const switchCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: !!props.className,
  });

  return (
    <Switch
      className={switchCls}
      {...props}
    />
  )
};
export default DSwitch;
