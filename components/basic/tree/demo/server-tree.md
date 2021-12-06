---
order: 10
title:
  zh-CN: 服务树1
  en-US: Server Tree One
---

## zh-CN

服务树1。

## en-US


```tsx
import { Tree, Row, Col, Card, Typography, Tag, Space, Avatar } from 'dcloud-design';
import {
  CaretDownOutlined,
  FundTwoTone,
  FolderOutlined,
  FolderOpenOutlined,
  FileOutlined
} from '@ant-design/icons';

const treeAvatar = (text, color) => {
  return (<Avatar className="site-tree-avatar" style={{backgroundColor: `${color||'#2F81F9'}`}}>{text||'A'}</Avatar>)
}

const treeData = [
  {
    title: (
      <>
        {treeAvatar()}
        <span>一级标题</span>
      </>
    ),
    key: '0-0',
    icon: ({expanded}) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />),
    children: [
      {
        title: (
          <>
            {treeAvatar('B', '#FFAB0A')}
            <span>二级标题</span>
          </>
        ),
        key: '0-0-0',
        icon: ({expanded}) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />),
        children: [
          {
            title: (
              <>
                {treeAvatar('C', '#FB4E57')}
                <span>三级标题</span>
              </>
            ),
            key: '0-0-0-0', 
            icon: <FileOutlined/>
          },
          {
            title: (
              <>
                {treeAvatar('C', '#FB4E57')}
                <span>三级标题</span>
              </>
            ),
            key: '0-0-0-2', 
            icon: <FileOutlined/>
        },
        ],
      },
      {
        title: (
          <>
            {treeAvatar('B', '#FFAB0A')}
            <span>二级标题</span>
          </>
        ),
        key: '0-0-1',
        icon: ({expanded}) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />),
        children: [
          {
            title: (
              <>
                {treeAvatar('C', '#FB4E57')}
                <span>三级标题</span>
              </>
            ),
            key: '0-0-1-0',
            icon: <FileOutlined/>
          },
          {
            title: (
              <>
                {treeAvatar('C', '#FB4E57')}
                <span>三级标题</span>
              </>
            ),
            key: '0-0-1-1',
            icon: <FileOutlined/>
          },
        ],
      },
      {
        title: (
          <>
            {treeAvatar('B', '#FFAB0A')}
            <span>二级标题</span>
          </>
        ),
        key: '0-0-2',
        icon: ({expanded}) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />),
        children: [
          {
            title: (
              <>
                {treeAvatar('C', '#FB4E57')}
                <span>三级标题</span>
              </>
            ),
            key: '0-0-2-0',
            icon: <FileOutlined/> 
          },
          {
            title: (
              <>
                {treeAvatar('C', '#FB4E57')}
                <span>三级标题</span>
              </>
            ),
            key: '0-0-2-1',
            icon: <FileOutlined/>
          },
        ],
      },
    ],
  },
  {
    title: (
      <>
        {treeAvatar()}
        <span>一级标题</span>
      </>
    ),
    key: '0-1',
    icon: ({expanded}) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />),
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: ({expanded}) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />),
        children: [
          { title: 'leaf', key: '0-1-0-0', icon: <FundTwoTone/> },
          { title: 'leaf', key: '0-1-0-1', icon: <FundTwoTone/> },
        ],
      },
    ],
  },
];

const Demo = () => {
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys: React.Key[], info: any) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <Tree
      showLine={{ showLeafIcon: false }}
      showIcon={true}
      switcherIcon={<CaretDownOutlined/>}
      defaultExpandedKeys={['0-0-1']}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```

```css
.site-tree-avatar {
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 10px;
  margin-right: 8px;
  margin-bottom: 2px;
}
```