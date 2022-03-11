---
order: 1002
title:
  zh-CN: 设置指定类名
  en-US: Sets the specified class name
---

## zh-CN

通过给Pagination增加className实现的样式.

## en-US

Add style to Pagination by adding a className implementation.

```jsx
import { Pagination,Select } from '@didi/dcloud-design';

const MiniSelect = props => {
  return <>
    <span>每页显示</span>
    <Select  bordered={false} {...props} ></Select>
  </>
};
MiniSelect.Option = Select.Option;

ReactDOM.render(<Pagination 
  className={'ant-pagination-custom'}
  locale={{
     items_per_page: '条',
  }}
  selectComponentClass={MiniSelect} 
  buildOptionText={(value) => `${value}`}
  total={500} 
  showTitle={true}
  />, mountNode);
```
