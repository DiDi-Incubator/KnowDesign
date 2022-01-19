---
order: 0
title:
  zh-CN: 自定义颜色和方形switch
  en-US: Basic
---

## zh-CN

自定义颜色和方形switch

## en-US

The most basic usage.

```jsx
import { Switch } from '@didi/dcloud-design';

ReactDOM.render(<div>
  <div>
    <Switch style={{marginRight: 8}} defaultChecked />
    <Switch style={{marginRight: 8}} className='custom-switch-primary' defaultChecked />
    <Switch style={{marginRight: 8}} className='custom-switch-success' defaultChecked />
    <Switch style={{marginRight: 8}} className='custom-switch-info' defaultChecked />
    <Switch style={{marginRight: 8}} className='custom-switch-warning' defaultChecked />
    <Switch style={{marginRight: 8}} className='custom-switch-error' defaultChecked />
  </div>
  <div>
    <Switch style={{marginRight: 8}} className='square' defaultChecked />
    <Switch style={{marginRight: 8}} className='square custom-switch-primary' defaultChecked />
    <Switch style={{marginRight: 8}} className='square custom-switch-success' defaultChecked />
    <Switch style={{marginRight: 8}} className='square custom-switch-info' defaultChecked />
    <Switch style={{marginRight: 8}} className='square custom-switch-warning' defaultChecked />
    <Switch style={{marginRight: 8}} className='square custom-switch-error' defaultChecked />
  </div>
</div>, mountNode);
```

<style>
.code-box-demo .ant-switch {
  margin-bottom: 8px;
}
</style>
