---
order: 10
title:
  zh-CN: 服务树2
  en-US: Server Tree Two
---

## zh-CN

服务树2。

## en-US


```tsx
import { Tree } from 'dcloud-design';
import {
  CaretDownOutlined,
  FolderOpenTwoTone,
  FolderTwoTone,
  FundTwoTone
} from '@ant-design/icons';

const { DirectoryTree } = Tree

const treeData = [
  {
    title: "一级标题",
    key: '0-0',
    icon: ({expanded}) => (expanded ? <FolderOpenTwoTone /> : <FolderTwoTone />),
    children: [
      {
        title: "二级标题",
        key: '0-0-0',
        icon: ({expanded}) => (expanded ? <FolderOpenTwoTone /> : <FolderTwoTone />),
        children: [
          {
            title: "三级标题",
            key: '0-0-0-0', 
            icon: <FundTwoTone/>
          },
          {
            title: "三级标题",
            key: '0-0-0-2', 
            icon: <FundTwoTone/>
        },
        ],
      },
      {
        title: "二级标题",
        key: '0-0-1',
        icon: ({expanded}) => (expanded ? <FolderOpenTwoTone /> : <FolderTwoTone />),
        children: [
          {
            title: "三级标题",
            key: '0-0-1-0',
            icon: <FundTwoTone/>
          },
          {
            title: "三级标题",
            key: '0-0-1-1',
            icon: <FundTwoTone/>
          },
        ],
      },
      {
        title: "二级标题",
        key: '0-0-2',
        icon: ({expanded}) => (expanded ? <FolderOpenTwoTone /> : <FolderTwoTone />),
        children: [
          {
            title: "三级标题",
            key: '0-0-2-0',
            icon: <FundTwoTone/>
          },
          {
            title: "三级标题",
            key: '0-0-2-1',
            icon: <FundTwoTone/>
          },
        ],
      },
    ],
  },
  {
    title: "一级标题",
    key: '0-1',
    icon: ({expanded}) => (expanded ? <FolderOpenTwoTone /> : <FolderTwoTone />),
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: ({expanded}) => (expanded ? <FolderOpenTwoTone /> : <FolderTwoTone />),
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
    <DirectoryTree
      // showLine={{ showLeafIcon: false }}
      showIcon={true}
      // switcherIcon={<CaretDownOutlined/>}
      defaultExpandedKeys={['0-0-1']}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```
