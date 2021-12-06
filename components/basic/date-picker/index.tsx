import React from 'react';
import { DatePicker } from 'antd';
import {
  DatePickerProps,
  MonthPickerProps,
  WeekPickerProps,
  RangePickerProps
 } from 'antd/es/date-picker';
import classNames from 'classnames';
import DRangePicker from './RangePicker';
import './style/index.less';

function DDatePicker(props: DatePickerProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-picker`;
  const dropdownPrefixCls = `${props.prefixCls || 'dantd'}-picker-dropdown`;
  const collapseCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: true,
  });
  const dropdownCls = classNames({
    [dropdownPrefixCls]: true,
    [`${props.dropdownClassName}`]: true,
  });

  return (
    <DatePicker
      {...props}
      className={collapseCls}
      dropdownClassName={dropdownCls}
    />
  )
};

export type DDatePickerProps = DatePickerProps;
export type DMonthPickerProps = MonthPickerProps;
export type DWeekPickerProps = WeekPickerProps;
export type DRangePickerProps = RangePickerProps;

DDatePicker.RangePicker = DRangePicker;

export default DDatePicker;
