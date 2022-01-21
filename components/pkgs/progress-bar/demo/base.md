---
order: 0
title: 基本
---

``` tsx
import React from "react";
import { Button, Space } from "@didi/dcloud-design";
import { ProgressBar } from "@didi/dcloud-design";

const Demo =  () => {
  return (
    <Space>
      <Button type="primary" onClick={() => ProgressBar.start()}>
        启动
      </Button>
      <Button onClick={() => ProgressBar.done()}>结束</Button>
    </Space>
  );
};

ReactDOM.render(
    <Demo />,
    mountNode
)

```
