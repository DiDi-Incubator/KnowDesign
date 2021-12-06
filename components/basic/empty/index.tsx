import React from 'react';
import { Empty, EmptyProps } from 'antd';
import classNames from 'classnames';
import hoistNonReactStatic from 'hoist-non-react-statics';
import DefaultEmptyImg from './empty';
import './style/index.less';


const dantdEmptyImg = <DefaultEmptyImg />;

function DEmpty(props: EmptyProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-empty`;
  const collapseCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: !!props.className,
  });

  return (
    <Empty 
      {...props}
      className={collapseCls}
    />
  )
};

DEmpty.PRESENTED_IMAGE_DANTD_DEFAULT = dantdEmptyImg;

hoistNonReactStatic(DEmpty, Empty);

export default DEmpty;