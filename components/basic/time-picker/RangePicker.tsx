import React from 'react';
import { TimePicker } from 'antd';
import classNames from 'classnames';
import {
  TimeRangePickerProps
 } from 'antd/es/time-picker';
import './style/index.less';

const { RangePicker } = TimePicker;

function DRangePicker(props: TimeRangePickerProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-picker-time`;
  const dropdownPrefixCls = `${props.prefixCls || 'dantd'}-picker-time-dropdown-range`;
  const collapseCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: true,
  });
  const dropdownCls = classNames({
    [dropdownPrefixCls]: true,
    [`${props.popupClassName}`]: true,
  });

  return (
    <RangePicker
      {...props}
      className={collapseCls}
      popupClassName={dropdownCls}
    />
  )
};

export default DRangePicker;