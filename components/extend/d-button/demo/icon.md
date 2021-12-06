---
order: 2
title: 图标按钮
---


图标按钮分为纯图标按钮和图标加文字两种表现形式，图标的使用可向用户表达按钮的含义，从而帮助用户提高按钮的识别性，纯图标按钮适用于高频且易理解的图标样式。

```jsx
import { DButton } from 'dcloud-design';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

ReactDOM.render(
  <>
    <DButton type="primary" icon={<PlusOutlined />}>
      图标按钮
    </DButton>
    <DButton customtype="standard"  icon={<PlusOutlined />} style={{marginLeft: 20}}>图标按钮</DButton>
    <br />
    <DButton type="primary" style={{marginTop: 10}} icon={<PlusOutlined />} />
    <br />
    <DButton customtype="no-border" style={{marginTop: 10}} icon={<EditOutlined style={{color: "#2F81F9"}}/>} />
    <br />
    <DButton customtype="no-border" style={{marginTop: 10}} icon={<EditOutlined />} />
  </>,
  mountNode,
);
``
