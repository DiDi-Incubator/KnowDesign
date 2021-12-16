---
order: 2
title:
  zh-CN: 多选
  en-US: multiple selection
---

## zh-CN

多选，从已有条目中选择。

## en-US

Multiple selection, selecting from existing items.

```jsx
import { Select, Tag } from 'antd';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={'green'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}

ReactDOM.render(
  <>
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      tagRender={tagRender}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
      maxTagCount={'responsive'}
    >
      {children}
    </Select>
  </>,
  mountNode,
);
```
