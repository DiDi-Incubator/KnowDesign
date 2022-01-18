---
order: 7
title:
  zh-CN: 预设状态的标签
  en-US: Status Tag
---

## zh-CN

预设五种状态颜色，可以通过设置 `color` 为 `success`、 `processing`、`error`、`default`、`warning` 来代表不同的状态。

其他三种状态色，可以通过设置`className`为`ant-tag-primary`、`ant-tag-info`、`ant-tag-dark`
##### 预设6种状态反色标签：
可以通过设置`className`为`ant-tag-primary-inverse`、`ant-tag-success-inverse`、`ant-tag-info-inverse`、`ant-tag-error-inverse`、`ant-tag-warning-inverse`、`ant-tag-dark-inverse`
## en-US

We preset five different colors, you can set color property such as `success`,`processing`,`error`,`default` and `warning` to indicate specific status.

```jsx
import { Tag, Divider } from '@didi/dcloud-design';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

ReactDOM.render(
  <>
    <Divider orientation="left">Without icon</Divider>
    <div>
      <Tag className="ant-tag-primary">primary</Tag>
      <Tag color="success" closable>success</Tag>
      <Tag color="processing">processing</Tag>
      <Tag color="error">error</Tag>
      <Tag color="warning">warning</Tag>
      <Tag className="ant-tag-dark">dark</Tag>
      <Tag color="default">default</Tag>
    </div>
    <Divider orientation="left">With icon</Divider>
    <div>
      <Tag icon={<CheckCircleOutlined />} color="success">
        success
      </Tag>
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
      <Tag icon={<CloseCircleOutlined />} color="error">
        error
      </Tag>
      <Tag icon={<ExclamationCircleOutlined />} color="warning">
        warning
      </Tag>
      <Tag icon={<ClockCircleOutlined />} color="default">
        waiting
      </Tag>
      <Tag icon={<MinusCircleOutlined />} color="default">
        stop
      </Tag>
    </div>
    <Divider orientation="left">Status Inverse</Divider>
    <div>
      <Tag className="ant-tag-primary-inverse">primary</Tag>
      <Tag className="ant-tag-success-inverse">success</Tag>
      <Tag className="ant-tag-info-inverse">info</Tag>
      <Tag className="ant-tag-error-inverse">error</Tag>
      <Tag className="ant-tag-warning-inverse">warning</Tag>
      <Tag className="ant-tag-dark-inverse">dark</Tag>
    </div>
  </>,
  mountNode,
);
```
