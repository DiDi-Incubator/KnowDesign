import * as React from 'react';
import { Select } from '../../index';
import { IconFont } from '../icon-project';
interface MiniSelectInterface extends React.FC<any> {
  Option: typeof Select.Option;
}

const CustomSelect: MiniSelectInterface = props => {
  return <>
    <span>每页显示</span>
    <Select bordered={false} suffixIcon={<IconFont type='icon-xiala' />} {...props} />
  </>
};

CustomSelect.Option = Select.Option;

export default CustomSelect;