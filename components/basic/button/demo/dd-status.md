---
order: 1.1
title:
  zh-CN: 状态按钮
  en-US: Status Icon
---

## zh-CN

通过设置`className`为`ant-btn-success`、`ant-btn-secondary`实现success、secondary状态按钮

## en-US



```jsx
import { Button, Tooltip } from '@didi/dcloud-design';
import { SearchOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';

ReactDOM.render(
  <>
    <Button type="primary" shape="circle" className="ant-btn-success">
      A
    </Button>
    <Button className="ant-btn-success">
      default-success
    </Button>
    <Button type="primary" className="ant-btn-success">
      primary-success
    </Button>
    <br />
    <Tooltip title="search">
      <Button shape="circle" icon={<SearchOutlined />}  className="ant-btn-success"/>
    </Tooltip>
    <Button icon={<SearchOutlined />} className="ant-btn-success">Search</Button>
    <Tooltip title="search">
      <Button type="dashed" shape="circle" icon={<SearchOutlined />} className="ant-btn-success" />
    </Tooltip>
    <Button type="dashed" icon={<ReloadOutlined />} className="ant-btn-success">
      Search
    </Button>
    <Button icon={<SearchOutlined />} href="https://www.google.com" className="ant-btn-success"/>
    <Tooltip title="edit">
      <Button type="text" className="ant-btn-success" icon={<EditOutlined />}/>
    </Tooltip>
    <Button className="ant-btn-success">
      Search
      <SearchOutlined />
    </Button>
    <Button type="text" className="ant-btn-success" icon={<ReloadOutlined />}>刷新</Button>
    <br />
    <br />
    <Button type="primary" shape="circle" className="ant-btn-secondary">
      A
    </Button>
    <Button className="ant-btn-secondary">
      default-secondary
    </Button>
    <Button type="primary" className="ant-btn-secondary">
      primary-secondary
    </Button>
    <br />
    <Tooltip title="search">
      <Button shape="circle" icon={<SearchOutlined />}  className="ant-btn-secondary"/>
    </Tooltip>
    <Button icon={<SearchOutlined />} className="ant-btn-secondary">Search</Button>
    <Tooltip title="search">
      <Button type="dashed" shape="circle" icon={<SearchOutlined />} className="ant-btn-secondary" />
    </Tooltip>
    <Button type="dashed" icon={<SearchOutlined />} className="ant-btn-secondary">
      Search
    </Button>
    <Button icon={<SearchOutlined />} href="https://www.google.com" className="ant-btn-secondary"/>
    <Tooltip title="edit">
      <Button type="text" className="ant-btn-secondary" icon={<EditOutlined />}/>
    </Tooltip>
    <Button className="ant-btn-secondary">
      Search
      <SearchOutlined />
    </Button>
    
  </>,
  mountNode,
);
```
