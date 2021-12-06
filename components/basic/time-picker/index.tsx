import React from 'react';
import { TimePicker } from "antd";
import {
  TimePickerProps,
  TimePickerLocale,
  TimeRangePickerProps
} from 'antd/es/time-picker';
import classNames from 'classnames';
import DRangePicker from './RangePicker';
import './style/index.less';

export type DTimePickerProps = TimePickerProps;
export type DTimePickerLocale = TimePickerLocale;
export type DTimeRangePickerProps = TimeRangePickerProps;

function DTimePicker(props: TimePickerProps) {
const prefixCls = `${props.prefixCls || 'dantd'}-picker-time`;
const dropdownPrefixCls = `${props.prefixCls || 'dantd'}-picker-time-dropdown`;
  const collapseCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: true,
  });
  const dropdownCls = classNames({
    [dropdownPrefixCls]: true,
    [`${props.popupClassName}`]: true,
  });

  return (
    <TimePicker
      {...props}
      className={collapseCls}
      popupClassName={dropdownCls}
    />
  )
};

DTimePicker.RangePicker = DRangePicker;

export default DTimePicker;
