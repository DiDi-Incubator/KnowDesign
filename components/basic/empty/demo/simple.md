---
order: 1
title:
  zh-CN: 选择图片
  en-US: Chose image
---

## zh-CN

可以通过设置 `image` 为 `Empty.PRESENTED_IMAGE_SIMPLE` `Empty.PRESENTED_IMAGE_DANTD_DEFAULT` 选择另一种风格的图片。

## en-US

You can choose another style of `image` by setting image to `Empty.PRESENTED_IMAGE_SIMPLE`.

```jsx
import { Empty } from 'dcloud-design';

ReactDOM.render(
  <>
    <Empty 
      image={Empty.PRESENTED_IMAGE_DANTD_DEFAULT} 
    />
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  </>, mountNode);
```
