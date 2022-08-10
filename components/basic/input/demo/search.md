---
order: 22
title: 搜索框
---

## zh-CN

定制化，需传入className\dantd-input-search，带有搜索图标的输入框， 回车搜索。


```jsx
import { Input, IconFont } from 'knowdesign';

const onSearch = e => console.log(e, e.target.value);
ReactDOM.render(
  <>
   <Input className={'dantd-input-search'} placeholder="Search..."  prefix={<IconFont type='icon-sousuo' style={{fontSize: 13}} />} onPressEnter={onSearch}/>
  </>,
  mountNode,
);
```
