---
order: 100
title:
  zh-CN: 自定义颜色、small类型
  en-US: custom-style
---

## zh-CN

各种颜色的checkbox

## en-US

Basic usage of checkbox.

```jsx
import { Checkbox } from 'antd';

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

ReactDOM.render(<>
  <Checkbox.Group>
    <Checkbox>Checkbox</Checkbox>
    <Checkbox className='custom-checkbox-primary'>Checkbox</Checkbox>
    <Checkbox className='custom-checkbox-success'>Checkbox</Checkbox>
    <Checkbox className='custom-checkbox-info'>Checkbox</Checkbox>
    <Checkbox className='custom-checkbox-warning'>Checkbox</Checkbox>
    <Checkbox className='custom-checkbox-error'>Checkbox</Checkbox>
  </Checkbox.Group>
  <Checkbox.Group>
    <Checkbox className='small'>Checkbox</Checkbox>
    <Checkbox className='small custom-checkbox-primary'>Checkbox</Checkbox>
    <Checkbox className='small custom-checkbox-success'>Checkbox</Checkbox>
    <Checkbox className='small custom-checkbox-info'>Checkbox</Checkbox>
    <Checkbox className='small custom-checkbox-warning'>Checkbox</Checkbox>
    <Checkbox className='small custom-checkbox-error'>Checkbox</Checkbox>
  </Checkbox.Group>
  <Checkbox.Group>
    <Checkbox className='small' disabled>Checkbox</Checkbox>
    <Checkbox disabled>Checkbox</Checkbox>
  </Checkbox.Group>
  <Checkbox.Group value={['1', '2']}>
    <Checkbox value='1' className='small' disabled>Checkbox</Checkbox>
    <Checkbox value='2' disabled>Checkbox</Checkbox>
  </Checkbox.Group>
</>, mountNode);
```
