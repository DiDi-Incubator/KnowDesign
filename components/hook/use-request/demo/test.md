---
order: 1
title: 高级使用
---


测试下功能

```jsx
import react, { useState } from "react";
import { Input, Button, useRequest } from 'dcloud-design';

const PhotoExhibition = () => {
  const [sort, setSort] = useState("汽车");

  const {
    loading: imgLoading,
    data: imgData,
    run,
    cancel,
  } = useRequest(
    {
      url: `https://api.uomg.com/api/rand.img1?sort=${sort}&format=json`,
    },
    {
      manual: true,
      debounceWait: 2000,
      onSuccess: (result) => {
        console.log(result, "onSuccess");
      },
      onError: (error) => {
        console.log(error, "onError");
      },
      onFinally: (result) => {
        console.log(result, "onFinally");
      },
    }
  );

  return (
    <>
      <Input
        type="text"
        value={sort}
        onChange={(value) => setSort(value)}
      />
      <br />
      <br />
      <Button
        onClick={() => {
          run({
            url: `https://api.uomg.com/api/rand.img1?sort=${sort}&format=json`,
          });
        }}
      >
        search
      </Button>
      <Button onClick={cancel}>取消加载</Button>
      <br />
      <br />
      {imgLoading ? "加载中..." : <img style={{width: 800}} src={imgData?.imgurl} alt="汽车" />}
    </>
  );
};

ReactDOM.render(
  <PhotoExhibition />,
  mountNode,
);
```
