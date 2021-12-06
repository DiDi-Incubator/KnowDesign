---
order: 5
title:
  zh-CN: 多项隐藏
  en-US: hide items
---

## zh-CN

设置了 `haveMore` 后，规定显示几项，剩余隐藏。

## en-US

By specifying `haveMore` prop, display several items.

```jsx
import { Tooltip, Button } from 'dcloud-design';

ReactDOM.render(
    <Tooltip placement="bottomLeft" color="#fff" haveMore={4} title={
      <div>
        <Button className="limt-length">项目一</Button>
        <Button className="limt-length">项目二</Button>
        <Button className="limt-length">项目名称最长显示字符显示字符</Button>
        <Button className="limt-length">项目四</Button>
        <Button className="limt-length">项目五</Button>
        <Button className="limt-length">项目名称最长显示字符显示字符</Button>
        <Button className="limt-length">项目七</Button>
        <Button className="limt-length">项目八</Button>
        <Button className="limt-length">项目九</Button>
      </div>
    }>
      <span className="branch-normal-color">共9项</span>
    </Tooltip>,
  mountNode,
);
```
```css
  .branch-normal-color{
    color: #2F81F9;
    cursor: pointer;
  }
  .limt-length span{
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 20px;
  }
```
