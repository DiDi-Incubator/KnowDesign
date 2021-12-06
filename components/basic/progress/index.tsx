
import React from 'react';
import { Progress, ProgressProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';


export interface DProgressProps {
  title?: string;
}

function DProgress(props: ProgressProps & DProgressProps) {
  const {
    title,
    className,
    prefixCls,
  } = props;
  const dPrefixCls = `${prefixCls || 'dantd'}-progress`;
  
  const progressCls = classNames({
    [dPrefixCls]: true,
    [`${className}`]: !!className,
  });

  return (
    <>
      {title && <div className={`${dPrefixCls}-title`}>{title}</div>}
      <Progress 
        {...props}
        className={progressCls}
      />
    </>
  )
};

export default DProgress;
