---
order: 11
title:
  zh-CN: 上一步和下一步
  en-US: Prev and next
---

## zh-CN

修改上一步和下一步为文字链接。

## en-US

Use text link for prev and next button.

```jsx
import { Pagination,Select } from 'antd';
const MiniSelect = props => <Select  bordered={false} {...props} />;
MiniSelect.Option = Select.Option;
function itemRender(current, type, originalElement) {

  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
}


ReactDOM.render(<Pagination 
  // pageSizeOptions={[10,20,30,40]} 
  selectComponentClass={MiniSelect} 
  buildOptionText={(value) => `${value}`}
  total={500} 
  showTitle={true}
  itemRender={itemRender} 
  />, mountNode);
```
