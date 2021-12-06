import React from 'react';
import { Select, SelectProps } from 'antd';
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import classNames from 'classnames';
import './style/index.less';

const { SECRET_COMBOBOX_MODE_DO_NOT_USE, Option, OptGroup } = Select;
function DSelect(props: SelectProps<any>) {
  const prefixCls = `${props.prefixCls || 'dantd'}-select`;
  const dropdownPrefixCls = `${props.prefixCls || 'dantd'}-select-dropdown`;
  const collapseCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: true,
  });
  const dropdownCls = classNames({
    [dropdownPrefixCls]: true,
    [`${props.dropdownClassName}`]: true,
  });

  const suffixIcon = ({ open, showSearch }) => {

    let mergedSuffixIcon = null;
    if (props.suffixIcon !== undefined) {
      mergedSuffixIcon = props.suffixIcon;
    } else if (props.loading) {
      mergedSuffixIcon = <LoadingOutlined spin />;
    } else {
      const iconCls = `${prefixCls}-suffix`;
      if (open && showSearch) {
        mergedSuffixIcon =  <SearchOutlined className={iconCls} />;
      } else {
        mergedSuffixIcon = 
          <CaretDownOutlined
            className={iconCls}
            style={{
              transition: '0.3s all',
              transform: `rotate(${open ? 0.5 : 0}turn)`,
            }}
          />;
      }
    }
    return mergedSuffixIcon;
  }

  return (
    <Select
      {...props}
      className={collapseCls}
      dropdownClassName={dropdownCls}
      suffixIcon={ props.suffixIcon || suffixIcon }
    />
  )
};

DSelect.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
DSelect.Option = Option;
DSelect.OptGroup = OptGroup;

export default DSelect;
