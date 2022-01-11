---
order: 0
title: 基础用法
---

ChartContainer示例

``` tsx
import React, { useState } from 'react';
import ChartContainer from '../index';
import { arrayMoveImmutable } from 'array-move';


const DragItem = (props) => {
  return (
    <div>{props.data.name}</div>
  )
}

const Containers = (): JSX.Element => {
    
  return (
      <>
        <ChartContainer 
          reloadModule={{
            reloadIconShow: true,
            lastTimeShow: true
          }}
          dragItemChildren={{
            dom: <DragItem></DragItem>
          }}>
          
        </ChartContainer>           
      </>
  )
}

ReactDOM.render(
  <div>
    <Containers />
  </div>,
  mountNode,
);
```

```css
.drag-sort-item {
  background: #4482D4;
  border: 1px solid #50A5F1;
  color: #fff;
}

```