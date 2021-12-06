import React from 'react';
import { Collapse, CollapseProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';

const { Panel } = Collapse;

export interface DCollapseProps {
  children: any;
}

function DCollapse(props: DCollapseProps & CollapseProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-collapse`;
  const collapseCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: !!props.className,
  });

  return (
    <Collapse 
      {...props}
      className={collapseCls}
    >
      {props.children}
    </Collapse>
  )
};

DCollapse.Panel = Panel;
export default DCollapse;
