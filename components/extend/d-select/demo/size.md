---
order: 1
title:
  zh-CN: 三种大小
  en-US: Three sizes of Input
---

## zh-CN

三种大小的选择框,（大、默认、小），高度分别为 `42px`、`36px` 和 `27px`。


```jsx
import { DSelect } from 'dcloud-design';

function handleChange(value) {
  console.log(`selected ${value}`);
}

const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];

ReactDOM.render(
  <>
    默认 <DSelect style={{ width: '100%' }} onChange={handleChange} options={options}/>
    <br />
    <br />
    大 <DSelect style={{ width: '100%' }} onChange={handleChange} options={options} size="large"/>
    <br />
    <br />
    小 <DSelect style={{ width: '100%' }} onChange={handleChange} options={options} size="small"/>
    <br />
    <br />
    禁用 <DSelect style={{ width: '100%' }} onChange={handleChange} options={options} disabled />
  </>,
  mountNode,
);
```
