import React, { useState, useMemo } from 'react';
import { Select, SelectProps } from 'antd';
const { Option } = Select;
import { IconFont } from '../icon-project';
import './index.less';

import {
  DownOutlined
} from '@ant-design/icons';

interface serachResItem {
  title: string;
  value: string | number;
}

export interface ISearchInputProps<VT> extends SelectProps<VT> {
  onSearch?: (value: string) => unknown;
  onSelect?: (value: any) => void;
  serachRes?: serachResItem[];
}

const SearchSelect: React.FC<ISearchInputProps<any>> = ({
  onSearch,
  onSelect,
  serachRes = [],
  ...props
}) => {
  const [value, setValue] = useState<string>(null);
  const [searchValue, setsearchValue] = useState('');

  const options = useMemo(() => {
    setValue(null);
    
    return serachRes.map(item => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      return <Option key={item.value} value={item.value}>{title}</Option>
    });
  }, serachRes);

  const handleChange = (val) => {
    console.log('handleChange')
    setValue(val);
    onSelect(val);
  };

  const handleSearch = (val) => {
    console.log(val)
    setsearchValue(val);
    onSearch(val);
  };

  return (
    
    <>
      <Select
        showSearch
        className='dd-search-input'
        value={value}
        allowClear={true}
        defaultActiveFirstOption={false}
        showArrow={true}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        suffixIcon={<IconFont type="icon-sousuo"/>}
        {...props}
        
      >
        {options}
      </Select>
    </>
  );
};

export default SearchSelect;
