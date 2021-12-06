---
order: 11
title: 列表
---

以列表的方式使用组件，并增加边框

```jsx
import { DDescriptions, Card, Typography, Badge, Row, Col } from 'dcloud-design';
const { Paragraph } = Typography;
export const data = [
  {
    title: '场景',
    content: '线上，美东 01 - us01',
  },
  {
    title: 'VIP',
    content: '192.168.0.0',
  },
  {
    title: 'VIP 端口',
    content: 1080,
  },
  {
    title: '映射关系',
    content: '1080 : 35002',
  },
  {
    title: '域名类型',
    content: '办公室内网域名',
  },
  {
    title: '域名地址',
    content: (
      <Paragraph copyable={{ text: 'http://xxx.com/' }}>
        <a rel="noopener noreferrer" target="_blank" href={'http://xxx.com/'}>
          {'http://xxx.com/'}
        </a>
      </Paragraph>
    ),
  },
  {
    title: '域名端口',
    content: 8080,
  },
];


ReactDOM.render(
  <Row gutter={18}>
    <Col span={6}>
      <DDescriptions titleWidth={50} bordered dataSource={data} />
    </Col>
    <Col span={6}>
      <DDescriptions titleWidth={50} bordered dataSource={data} />
    </Col>
    <Col span={6}>
      <DDescriptions titleWidth={50} bordered dataSource={data} />
    </Col>
    <Col span={6}>
      <DDescriptions titleWidth={50} bordered dataSource={data} />
    </Col>
  </Row>
, mountNode);
```
