import React, { useState } from 'react';
import { Input, InputProps, IconFont } from '../../index';
import './index.less';
interface ISearchInputProps extends InputProps {
  onSearch?: (value: string) => unknown;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  onSearch,
  ...props
}) => {
  const [value, setValue] = useState<string>('');
  return (
    <Input
      className='dd-search-input'
      prefix={<IconFont type="icon-sousuo" onClick={() => {
        onSearch && onSearch(value);
      }}/>}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSearch && onSearch(e.target.value);
      }}
      onPressEnter={(e) => {
        onSearch && onSearch(value);
      }}
      {...props}
    />
  );
};

export default SearchInput;
