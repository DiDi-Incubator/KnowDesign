import React from 'react';
import { Steps, StepsProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';

const { Step } = Steps;
interface DStepsProps {
  children?: any;
}
function DSteps(props: StepsProps & DStepsProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-steps`;
  const stepsCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: !!props.className,
  });
  return (
    <Steps
      className={stepsCls}
      {...props}
    >
      {props.children}
    </Steps>
  )
};

DSteps.Step = Step;

export default DSteps;
