---
order: 0
title:
  zh-CN: 路由守卫
  en-US: Route-Guard
---

## zh-CN

路由守卫组件使用

## en-US

The simplest usage for short messages.

```tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useLocation, useHistory, useParams } from 'react-router-dom';
import RouteGuard from '../index';
const pageRoutes = [
  {
    path: '/',
    component: ()=><></>,
    noSider: true,
  }
];
const Demo: React.FC = ()=>{
  useEffect(()=>{
    console.log('useEffect');
  },[]);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <RouteGuard routeList={pageRoutes} />
          <Route render={() => <span>switch route</span>} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode);
```

<style>
.code-box-demo .ant-alert {
  margin-bottom: 16px;
}
</style>
