---
order: 0
title: 基本
---

``` tsx
import React from "react";
import { HashMenu } from "@didi/dcloud-design";
import { IMenuItem } from '../index.tsx'; 
export enum TAB_LIST_KEY {
  baseInfo = "baseInfo",
  mapping = "mapping",
  setting = "setting",
}

export const TAB_LIST = [
  {
    name: "基本信息",
    key: TAB_LIST_KEY.baseInfo,
    content: <span>基本信息</span>,
  },
  {
    name: "Mapping信息",
    key: TAB_LIST_KEY.mapping,
    content: <span>Mapping信息</span>,
  },
  {
    name: "Setting信息",
    key: TAB_LIST_KEY.setting,
    content:  <span>Setting信息</span>,
  },
];

const menuMap = new Map<string, IMenuItem>();

TAB_LIST.forEach((d) => {
  return menuMap.set(d.key, d);
});
 const MENU_MAP = menuMap;


ReactDOM.render(
    <HashMenu
      TAB_LIST={TAB_LIST}
      MENU_MAP={MENU_MAP}
    />,
    mountNode
)

```