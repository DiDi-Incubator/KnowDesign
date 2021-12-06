import React from 'react';
import { Transfer, TransferProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';

export interface DTransferProps {
  children: any;
}


function DTransfer(props: TransferProps<any> & DTransferProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-transfer`;
  const transferCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: !!props.className,
  });

  return (
    <Transfer
      className={transferCls}
      {...props}
    >
      {props.children}
    </Transfer>
  )
};

export default DTransfer;
