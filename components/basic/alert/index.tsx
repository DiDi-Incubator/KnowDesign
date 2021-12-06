import React from 'react';
import { Alert, AlertProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';

const { ErrorBoundary } = Alert;
interface DAlertProps {
  children?: any;
}
function DAlert(props: AlertProps & DAlertProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-alert`;
  const alertCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: true,
  });

  return (
    <Alert
      className={alertCls}
      {...props}
    >
      {props.children}
    </Alert>
  )
};
DAlert.ErrorBoundary = ErrorBoundary;
export default DAlert;