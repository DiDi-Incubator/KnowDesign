---
order: 1
title:
  zh-CN: 独立使用
  en-US: Standalone
---

## zh-CN

不包裹任何元素即是独立使用，可自定样式展现。

> 在右上角的 badge 则限定为红色。

## en-US

Used in standalone when children is empty.

```jsx
import { Badge, Space, Switch } from 'dcloud-design';
import { ClockCircleOutlined } from '@ant-design/icons';

const Demo = () => {
  const [show, setShow] = React.useState(true);

  return (
    <Space>
      <Switch
        checked={show}
        onChange={() => {
          setShow(!show);
        }}
      />
      <Badge count={show ? 5 : 0} />
      <Badge count={show ? 25 : 0} />
      <Badge count={show ? 99 : 0} overflowCount={10}/>
      <Badge count={show ? <ClockCircleOutlined style={{ color: '#f5222d' }} /> : 0} />
      <Badge count={show ? 4 : 0} className="site-badge-count-4" />
      <Badge
        className="site-badge-count-109"
        count={show ? 109 : 0}
        style={{ backgroundColor: '#52c41a' }}
      />
    </Space>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

```css
.site-badge-count-4 .ant-badge-count {
  color: #999;
  background-color: #fff;
  box-shadow: 0 0 0 1px #d9d9d9 inset;
}
```

<style>
[data-theme="dark"] .site-badge-count-4 .ant-badge-count {
  background-color: #141414;
  box-shadow: 0 0 0 1px #434343 inset;
}
</style>
