---
order: 100
title:
  zh-CN: 实心、small、自定义颜色
  en-US: Solid
---

## zh-CN

实心的单选框。

## en-US

The simplest use.

```jsx
import Radio from '../radio.tsx';

ReactDOM.render(
  <div>
  <Radio.Group>
    <Radio value='0'>默认</Radio>
    <Radio value='1' className='custom-radio-primary'>默认</Radio>
    <Radio value='2' className='custom-radio-success'>默认</Radio>
    <Radio value='3' className='custom-radio-info'>默认</Radio>
    <Radio value='4' className='custom-radio-warning'>默认</Radio>
    <Radio value='5' className='custom-radio-error'>默认</Radio>
  </Radio.Group>
  <hr/>
  <Radio.Group>
    <Radio value='0' className='solid'>实心</Radio>
    <Radio value='1' className='solid custom-radio-primary'>实心</Radio>
    <Radio value='2' className='solid custom-radio-success'>实心</Radio>
    <Radio value='3' className='solid custom-radio-info'>实心</Radio>
    <Radio value='4' className='solid custom-radio-warning'>实心</Radio>
    <Radio value='5' className='solid custom-radio-error'>实心</Radio>
  </Radio.Group>
  <hr/>
  <Radio.Group>
    <Radio value='2' className='small'>线条小尺寸</Radio>
    <Radio value='3' className='small custom-radio-primary'>线条小尺寸primary</Radio>
    <Radio value='4' className='small custom-radio-success'>线条小尺寸success</Radio>
    <Radio value='5' className='small custom-radio-info'>线条小尺寸info</Radio>
    <Radio value='6' className='small custom-radio-warning'>线条小尺寸warning</Radio>
    <Radio value='7' className='small custom-radio-error'>线条小尺寸error</Radio>
  </Radio.Group>
  <hr/>
  <Radio.Group>
    <Radio value='8' className='solid small'>实心小尺寸normal</Radio>
    <Radio value='9' className='solid small custom-radio-primary'>实心小尺寸primary</Radio>
    <Radio value='10' className='solid small custom-radio-success'>实心小尺寸success</Radio>
    <Radio value='11' className='solid small custom-radio-info'>实心小尺寸info</Radio>
    <Radio value='12' className='solid small custom-radio-warning'>实心小尺寸warning</Radio>
    <Radio value='13' className='solid small custom-radio-error'>实心小尺寸error</Radio>
  </Radio.Group>
</div>, mountNode);
```
