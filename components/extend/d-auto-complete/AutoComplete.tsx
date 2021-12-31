import React from 'react';
import {AutoComplete, AutoCompleteProps} from 'antd';

const DAutoComplete = (props: AutoCompleteProps) => {
  return <AutoComplete dropdownClassName={'dantd-auto-complete-dropdown'} className={'dantd-auto-complete'} {...props}/>
};

export default DAutoComplete;
