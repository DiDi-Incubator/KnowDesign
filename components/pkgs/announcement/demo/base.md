---
order: 0
cols: 1
title: 简单示例
---

滚动通知公告

``` tsx
import { Announcement } from '@didi/d1-packages';

const messages = ['今日特价9.9', '今日秒杀商品666']

ReactDOM.render(
  <>
    <Announcement messages={messages} />
  </>,
  mountNode,
);
```


