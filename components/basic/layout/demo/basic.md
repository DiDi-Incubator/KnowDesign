---
order: 0
title:
  zh-CN: 基本结构
  en-US: Basic Structure
---

## zh-CN

典型的页面布局。

## en-US

Classic page layouts.

```jsx
import { Layout } from 'knowdesign';

const { Header, Footer, Sider, Content } = Layout;

ReactDOM.render(
  <>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>

    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>

    <Layout>
      <Header>Header</Header>
      <Layout>
        <Content>Content</Content>
        <Sider>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>

    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </>,
  mountNode,
);
```

<style>
#components-basic-layout-demo-basic .code-box-demo {
  text-align: center;
}
#components-basic-layout-demo-basic .dcloud-layout-header,
#components-basic-layout-demo-basic .dcloud-layout-footer {
  color: #fff;
  background: #7dbcea;
}
[data-theme="dark"] #components-basic-layout-demo-basic .dcloud-layout-header {
  background: #6aa0c7;
}
[data-theme="dark"] #components-basic-layout-demo-basic .dcloud-layout-footer {
  background: #6aa0c7;
}
#components-basic-layout-demo-basic .dcloud-layout-footer {
  line-height: 1.5;
}
#components-basic-layout-demo-basic .dcloud-layout-sider {
  color: #fff;
  line-height: 120px;
  background: #3ba0e9;
}
[data-theme="dark"] #components-basic-layout-demo-basic .dcloud-layout-sider {
  background: #3499ec;
}
#components-basic-layout-demo-basic .dcloud-layout-content {
  min-height: 120px;
  color: #fff;
  line-height: 120px;
  background: rgba(16, 142, 233, 1);
}
[data-theme="dark"] #components-basic-layout-demo-basic .dcloud-layout-content {
  background: #107bcb;
}
#components-basic-layout-demo-basic > .code-box-demo > .dcloud-layout + .dcloud-layout {
  margin-top: 48px;
}
</style>
