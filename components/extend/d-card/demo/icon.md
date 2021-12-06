---
order: 2
title: 图标或图片
---

传参icon支持antd icon格式和自定义图片dom。


```jsx
import { DCard } from 'dcloud-design';
import {
  SmileTwoTone,
} from '@ant-design/icons';

const DExample: React.FC = () => { 
  return (
    <div>
      <DCard
        title="DCard"
        value="99.999%"
        icon={ <SmileTwoTone tyle={{cursor: 'pointer'}} />}
      />
    </div>
  );
}

ReactDOM.render(
  <div>
    <DExample />
  </div>,
  mountNode,
);
```
