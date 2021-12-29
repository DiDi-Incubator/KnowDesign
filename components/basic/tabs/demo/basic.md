---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

默认选中第一项。

## en-US

Default activate first tab.

```jsx
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Demo = () => (<>
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
  <br/>
  <Tabs className="slider-tabs" defaultActiveKey="1"  onChange={callback}>
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
  <br/>
  <Tabs defaultActiveKey="1" className="vcard-tabs" tabPosition="left">
    {[...Array.from({ length: 5 }, (v, i) => i)].map(i => (
      <TabPane tab={`Tab-${i}`} key={i} disabled={i === 2}>
        Content of tab {i}
      </TabPane>
    ))}
  </Tabs>
  </>
);

ReactDOM.render(<Demo />, mountNode);
```
