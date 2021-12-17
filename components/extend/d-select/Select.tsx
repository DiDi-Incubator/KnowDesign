import React from 'react';
import {Select, SelectProps} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
const { Option } = Select;

const DSelect = (props: SelectProps<any>) => {
  return <Select suffixIcon={<CaretDownOutlined />} dropdownClassName={'dantd-select-dropdown'} className={'dantd-select'} {...props}/>
};
DSelect.Option = Option;
export default DSelect;
