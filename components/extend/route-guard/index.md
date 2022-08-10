---
category: 业务组件
cols: 1
type: 布局
title: RouteGuard
subtitle: 路由守卫
---

####  何时使用

路由守卫，在路由切换时提供一些回调和处理方法，提供原声路由和缓存路由两种

#### API

| 属性               | 说明                                          | 类型                                 | 默认值   |
| -----------       | --------------------------------------------- | ----------------------------------- | ------- |
| routeList         | 渲染路由的数据                                  | routeItemType[]                     |         |
| beforeEach        | 进入页面的回调                                  | (props: any) => Promise < Boolean >, props 组件的参数, 返回 true 执行重定向， 重定向到当前元素中 redirect 中路径 |         |
| switchCacheRouter | 路由切换的毁掉，只有 routerType 为 cache 时 生效  | (props: any) => {}, props 组件的参数   |        |
| afterEmit         | 定时器调用时间                                  | (props: any) => {}, props 组件的参数   |        |
| routeType         | 路由的类型                                     |  routeType                            |        |

**routeItemType**

| 属性         | 说明                                        | 类型       |
| ----------- | ------------------------------------------  | --------- |
| path        | 路由路径                                      | string    |
| component   | 对应路由路径展示的组件                          | ComponentType   |
| cacheKey   | 缓存路由的 key 值，routeType 为 cache 时使用     | string   |
| redirect   | beforeEach 返回 true 重定向到的地址             | string   |
| pathRule   | 路径规则函数，用于判断使用缓存路由还是普通路由       | function |
| attr       |  额外的属性                                    | object   |
**routeType**

| 属性         | 说明           | 类型       |
| ----------- | -------------- | --------- |
| cache       | 使用 keep-alive | string    |
| default     | 使用默认路由     | string   |





