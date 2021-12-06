import React from 'react';
import { DatePicker } from 'antd';
import classNames from 'classnames';
import {
  RangePickerProps
 } from 'antd/es/date-picker';
import './style/index.less';

const { RangePicker } = DatePicker;

function DRangePicker(props: RangePickerProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-picker`;
  const dropdownPrefixCls = `${props.prefixCls || 'dantd'}-picker-dropdown-range`;
  const collapseCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: true,
  });
  const dropdownCls = classNames({
    [dropdownPrefixCls]: true,
    [`${props.dropdownClassName}`]: true,
  });

  return (
    <RangePicker
      {...props}
      className={collapseCls}
      dropdownClassName={dropdownCls}
    />
  )
};

export default DRangePicker;