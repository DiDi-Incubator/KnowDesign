---
order: 1.1
title:
  zh-CN: 状态按钮
  en-US: Status Icon
---

## zh-CN

通过设置`className`为`dcloud-btn-success`、`dcloud-btn-secondary`实现 success、secondary 状态按钮

## en-US

```jsx
import { Button, Tooltip } from 'knowdesign';
import { SearchOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';

ReactDOM.render(
  <>
    <Button type="primary" shape="circle" className="dcloud-btn-success">
      A
    </Button>
    <Button className="dcloud-btn-success">default-success</Button>
    <Button type="primary" className="dcloud-btn-success">
      primary-success
    </Button>
    <br />
    <Tooltip title="search">
      <Button shape="circle" icon={<SearchOutlined />} className="dcloud-btn-success" />
    </Tooltip>
    <Button icon={<SearchOutlined />} className="dcloud-btn-success">
      Search
    </Button>
    <Tooltip title="search">
      <Button
        type="dashed"
        shape="circle"
        icon={<SearchOutlined />}
        className="dcloud-btn-success"
      />
    </Tooltip>
    <Button type="dashed" icon={<ReloadOutlined />} className="dcloud-btn-success">
      Search
    </Button>
    <Button
      icon={<SearchOutlined />}
      href="https://www.google.com"
      className="dcloud-btn-success"
    />
    <Tooltip title="edit">
      <Button type="text" className="dcloud-btn-success" icon={<EditOutlined />} />
    </Tooltip>
    <Button className="dcloud-btn-success">
      Search
      <SearchOutlined />
    </Button>
    <Button type="text" className="dcloud-btn-success" icon={<ReloadOutlined />}>
      刷新
    </Button>
    <br />
    <br />
    <Button type="primary" shape="circle" className="dcloud-btn-secondary">
      A
    </Button>
    <Button className="dcloud-btn-secondary">default-secondary</Button>
    <Button type="primary" className="dcloud-btn-secondary">
      primary-secondary
    </Button>
    <br />
    <Tooltip title="search">
      <Button shape="circle" icon={<SearchOutlined />} className="dcloud-btn-secondary" />
    </Tooltip>
    <Button icon={<SearchOutlined />} className="dcloud-btn-secondary">
      Search
    </Button>
    <Tooltip title="search">
      <Button
        type="dashed"
        shape="circle"
        icon={<SearchOutlined />}
        className="dcloud-btn-secondary"
      />
    </Tooltip>
    <Button type="dashed" icon={<SearchOutlined />} className="dcloud-btn-secondary">
      Search
    </Button>
    <Button
      icon={<SearchOutlined />}
      href="https://www.google.com"
      className="dcloud-btn-secondary"
    />
    <Tooltip title="edit">
      <Button type="text" className="dcloud-btn-secondary" icon={<EditOutlined />} />
    </Tooltip>
    <Button className="dcloud-btn-secondary">
      Search
      <SearchOutlined />
    </Button>
  </>,
  mountNode,
);
```
