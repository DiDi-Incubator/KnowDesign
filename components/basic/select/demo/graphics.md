---
order: 26
title:
  zh-CN: 图形选择器
  en-US: Graphics
---

## zh-CN


## en-US


```jsx
import { Select } from 'dcloud-design';
import  {
  ZhihuOutlined,
  WeiboOutlined,
  YoutubeOutlined,
  GithubOutlined } from '@ant-design/icons';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <Select
    style={{ width: '100%' }}
    placeholder="select one country"
    defaultValue="Github"
    onChange={handleChange}
  >
    <Option value="Github" label="Github">
      <div className="demo-option-label-item">
        <GithubOutlined />
        Github
      </div>
    </Option>
    <Option value="Youtube" label="Youtube">
      <div className="demo-option-label-item">
        <YoutubeOutlined />
        Youtube
      </div>
    </Option>
    <Option value="Weibo" label="微博">
      <div className="demo-option-label-item">
        <WeiboOutlined />
        微博
      </div>
    </Option>
    <Option value="Zhihu" label="知乎">
      <div className="demo-option-label-item">
        <ZhihuOutlined />
        知乎
      </div>
    </Option>
  </Select>,
  mountNode,
);
```

```css
.demo-option-label-item > span {
  margin-right: 6px;
}
```
