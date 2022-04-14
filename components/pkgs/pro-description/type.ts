import React, { ReactNode } from 'react';

export enum BASIS_TYPE {
  default = 'default',
  /* 展示标签 */
  tag = 'tag',
  /* 展示内容高亮 */
  highlight = 'highlight',
  /* 是否可编辑 */
  edit = 'edit',
}

type ColSpanType = number | string;

type FlexType = number | 'none' | 'auto' | string;

interface ColSize {
  flex?: FlexType;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}

interface containerType extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  grid?: ColSpanType | ColSpanType[];
  fluid?: ColSpanType;
  flex?: FlexType | FlexType[];
  awd?: boolean | number[];
  rwd?: boolean;
  xl?: ColSpanType | ColSize | ColSpanType[] | ColSize[];
  xxl?: ColSpanType | ColSize | ColSpanType[] | ColSize[];
  wrap?: boolean;
  gutter?: number;
}

export interface optionItemType {
  label: string | ReactNode;
  key?: string | number;
  /* 内容 */
  content?: any;
  /* 是否支持复制 */
  copy?: boolean;
  /* 单条详情所占行数，默认是一行 */
  span?: number;
  /* 自定义配置显示内容，提供展示tag */
  customType?: BASIS_TYPE | string;
  /* 可自定义lable的行内样式 */
  labelStyle?: React.CSSProperties;
  /**
   * @renderCustom 可以自定义渲染的内容，展示的逻辑，customType为custom时
   * @ct 当前详情的内容
   */
  renderCustom?: (ct: any) => any;
  /* 编辑自定义提交事件 */
  onSubmit?: (value: any) => any;
  /* 编辑自定义校验 */
  validator?: (v, c) => any;
  /* 编辑校验是否是必填 */
  required?: boolean;
  invisible?: boolean;
}

export interface propsType {
  /* 是否有标题 */
  title?: string | ReactNode;
  /* 详情数据 */
  // optionList: optionItemType[];
  dataSource: any;
  /* 需要显示的配置 */
  config: optionItemType[];
  /* lable的宽度，默认80px,可自定义 */
  labelWidth?: string;
  /* 可自定义lable的行内样式 */
  labelStyle?: React.CSSProperties | any;
  /* 可自定义内容的行内样式 */
  contentStyle?: React.CSSProperties | any;
  /* 需要 ':' 符号, 默认不显示 */
  needColon?: boolean;
  /* 标题样式 */
  titleStyle?: React.CSSProperties | any;
  /* 屏幕宽度小于1920的时候一行展示几条 */
  xl?: number;
  /* 屏幕宽度大于1920的时候一行展示几条 */
  xxl?: number;
  /**
   * @param data 详情数据
   * @param config 需要显示的配置
   */
  getBasisInfoConfig?: (data: any, config: optionItemType[]) => optionItemType[];
  /* 布局container配置 */
  containerLayout?: containerType;
  /* description样式 */
  descriptionStyle?: React.CSSProperties;

  bordered?: boolean;
  layout?: 'horizontal' | 'vertical';
  noDefaultTitle?: boolean;
  column?: any;
  customTitle?: any;
}