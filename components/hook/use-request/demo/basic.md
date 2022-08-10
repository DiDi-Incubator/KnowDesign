---
order: 0
title: 基础用法
---


get网络请求


```jsx
import { useRequest } from 'knowdesign';

const Demo = () => {
  const { data: imgData } = useRequest(
    {
      url: `https://api.uomg.com/api/rand.img1?sort=汽车&format=json`,
    }
  );
    return (
    <>
      <img style={{width: 800}} src={imgData?.imgurl} alt="汽车" />
    </>
  );
} 

ReactDOM.render(
  <Demo />,
  mountNode,
);
```
