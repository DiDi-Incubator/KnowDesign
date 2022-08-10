---
order: 3
title: 文本按钮(link链接按钮)
---


文本按钮为页面中视觉层级较低的按钮形式，可在页面中大面积的重复使用，在表格、表单页面应用较多。其中，文本按钮又分为功能文本按钮和文档文本按钮。

```jsx
import { DButton } from 'knowdesign';
import { QuestionCircleOutlined } from '@ant-design/icons';

ReactDOM.render(
  <>
    <DButton type="link" icon={<QuestionCircleOutlined />}>如何选择系统盘</DButton>
    <DButton type="link">a链接</DButton>
    <DButton type="text">文本按钮</DButton>
  </>,
  mountNode,
);
``
