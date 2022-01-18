import React, { useState, useMemo, useEffect } from 'react';
import { Select, SelectProps, IconFont } from '../../index';
const { Option } = Select;
import './style/index.less';

import {
  DownOutlined
} from '@ant-design/icons';

interface serachResItem {
  key: string;
  searchName: string;
}

export interface ISearchInputProps<VT> extends SelectProps<VT> {
  onSearch?: (value: string) => unknown;
  onSelect?: (value: any, option: any) => void;
  serachRes?: serachResItem[];
  searchVal?: string;
}

const SearchSelect: React.FC<ISearchInputProps<any>> = ({
  onSearch,
  onSelect,
  serachRes = [],
  searchVal,
  ...props
}) => {
  const [value, setValue] = useState<string>(null);
  const [searchValue, setsearchValue] = useState<string>('');
  const [options, setOptions] = useState(null);
  useEffect(() => {
    setValue(searchVal);
  }, [searchVal])

  useEffect(() => {
    const options = serachRes.map(item => {
      const index = item.searchName.indexOf(searchValue);
      const beforeStr = item.searchName.substr(0, index);
      const afterStr = item.searchName.substr(index + searchValue.length);
      const searchName =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.searchName}</span>
        );
      return <Option key={item.key} value={item.key} data={item}>{searchName}</Option>
    });
    setOptions(options);
  }, [serachRes])

  const handleChange = (val, option) => {
    console.log('handleChange');
    setValue(val);
    onSelect && onSelect(val, option);
  };

  const handleSearch = (val) => {
    console.log('handleSearch');
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
