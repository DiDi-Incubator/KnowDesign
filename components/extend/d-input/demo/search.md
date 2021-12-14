---
order: 2
title: 搜索框
---

## zh-CN

带有搜索图标的输入框， 回车搜索。


```jsx
import { DInput } from 'dcloud-design';

const { Search } = DInput;

const onSearch = e => console.log(e, e.target.value);
ReactDOM.render(
  <>
   <Search placeholder="Search..." onPressEnter={onSearch}  />
  </>,
  mountNode,
);
```
