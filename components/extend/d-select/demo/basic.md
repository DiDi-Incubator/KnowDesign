---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

基本使用。

## en-US

Basic Usage.

```jsx
import { DSelect } from 'dcloud-design';

const { Option } = DSelect;

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <>
    <DSelect defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </DSelect>
    <DSelect defaultValue="lucy" style={{ width: 120 }} disabled>
      <Option value="lucy">Lucy</Option>
    </DSelect>
    <DSelect defaultValue="lucy" style={{ width: 120 }} loading>
      <Option value="lucy">Lucy</Option>
    </DSelect>
    <DSelect defaultValue="lucy" style={{ width: 120 }} allowClear>
      <Option value="lucy">Lucy</Option>
    </DSelect>
  </>,
  mountNode,
);
```
