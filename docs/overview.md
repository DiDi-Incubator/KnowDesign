---
order: 0
title: Know Design
---

`Know Design` 一个基于 [Antd-v4](https://ant.design/) 所封装的全量增强组件库，基于内部toB中后台系统应用场景和风格化基础上实践而来， 包含增强的基础组件、场景化的业务组件、通用页面、开发工具库；帮助ToB业务开发者实现快速开发和风格统一，提高开发效率；

## ✨ 特性

- 📦 。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- 🌈 赋能业务开发，提供业务常用，而 `Antd` 没有提供的组件。

## 安装
使用 npm 或者 yarn 安装
```
$ npm install knowdesign
```

```
$ yarn add knowdesign
```

## 示例

```jsx
import { EmptyLine } from 'KnowDesign';

ReactDOM.render(<EmptyLine />, mountNode);
```

## 按需加载
[knowdesign]()的JS代码默认支持基于 ES modules 的 tree shaking；编译模块为CJS时，配合babel-plugin-import实现按需加载


## TypeScript
[knowdesign]()使用TypeScript进行书写并提供完整的定义文件。（不需要额外引入@types/antd）

