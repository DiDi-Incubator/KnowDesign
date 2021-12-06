---
order: 6
title:
  zh-CN: 常用列表样式
  en-US: list
---

## zh-CN

haveMore 设置显示多少项，其余隐藏。moreText 自定义设置查看更多的文本。Item添加level属性可设置级别

## en-US

Havemore sets how many items to show and the rest to hide. MoreText Custom Settings to view moreText. Item adds the Level property to set the level

```jsx
import { useState } from 'react';
import { Descriptions, message,  Typography } from 'dcloud-design';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import StatusIcon from '../StatusIcon';
const { Paragraph } = Typography;

const tags = [{
  title: '标签样式1',
  href: 'http://www.didiglobal.com'
},{
  title: '标签样式2',
  href: 'http://www.didiglobal.com'
},{
  title: '标签样式3',
  href: 'http://www.didiglobal.com'
}]

const Demo = () => {
  const [editableStr, setEditableStr] = useState('83523');
  return <Descriptions title="常用列表" column={2} haveMore={12} moreText="查看更多">
    <Descriptions.Item label="服务名称">通过引入DAMA数据管理知识体系设计理念</Descriptions.Item>
    <Descriptions.Item label="访问量">404</Descriptions.Item>
    <Descriptions.Item label="服务类型">电力发电</Descriptions.Item>
    <Descriptions.Item label="资源类型">数据集</Descriptions.Item>
    <Descriptions.Item label="技术类型">MapReduce</Descriptions.Item>
    <Descriptions.Item label="状态">
      <StatusIcon /> &nbsp;&nbsp;未上线
    </Descriptions.Item>
    <Descriptions.Item label="发布人">root</Descriptions.Item>
    <Descriptions.Item label="标签" tags={tags} />
    <Descriptions.Item label="级别" level={1} />
    <Descriptions.Item label="模块ID">
      <Paragraph editable={{ onChange: setEditableStr }} className="blueContent">{editableStr}</Paragraph>
    </Descriptions.Item>
    <Descriptions.Item label="模块ID">
      <CopyToClipboard text={83523} onCopy={() => message.success("复制成功！")}>
        <span className="blueContent">83523<CopyOutlined /></span>
      </CopyToClipboard>
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2020-03-09 11:40:22</Descriptions.Item>
    <Descriptions.Item label="最近更新" span={2}>
      2 months ago (2020-11-06 15:40:13)
    </Descriptions.Item>
    <Descriptions.Item label="创建时间" span={2}>2021-06-17 11:40:22</Descriptions.Item>
    <Descriptions.Item label="最近更新" span={2}>
      1 months ago (2020-11-06 15:40:13)
    </Descriptions.Item>
  </Descriptions>
}

ReactDOM.render(
  <Demo/>,
  mountNode,
);
```
```css
  .blueContent{
    color: #2F81F9;
    cursor: pointer;
  }
```


