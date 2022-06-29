import * as React from 'react';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

import Input from '../input';

export interface TransferSearchProps {
  prefixCls?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLElement>) => void;
  handleClear?: () => void;
  value?: string;
  disabled?: boolean;
  fixPlace?: 'left' | 'right' | string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export default function Search(props: TransferSearchProps) {
  const { placeholder = '', value, prefixCls, disabled, onChange, handleClear, fixPlace='left', prefix, suffix } = props;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (e.target.value === '') {
        handleClear?.();
      }
    },
    [onChange],
  );

  return (
    <Input
      placeholder={placeholder}
      className={prefixCls}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      allowClear
      prefix={prefix ? prefix : fixPlace==='left' && <SearchOutlined />}
      suffix={suffix ? suffix : fixPlace==='right' &&  <SearchOutlined />}
    />
  );
}
