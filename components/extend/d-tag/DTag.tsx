import React from 'react';
import _ from 'lodash';
import { Tag, TagProps } from 'antd';
import classNames from 'classnames';

interface IBasicTag extends TagProps{
  prefixCls?: string;
  children?: React.ReactNode;
  size?: 'small' | 'middle' | 'large';
  theme?: 'default' | 'success' | 'error' | 'warning' | 'info';
  level?: 'P0' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
}

function BasicTag(props: IBasicTag) {
  const prefixCls = `${props.prefixCls || 'dantd'}-basic-tag`;
  const {
    children,
    size = 'middle',
    theme,
    level,
  } = props;
  const showLevel = !!level;
  const tagCls = classNames({
    [prefixCls]: true,
    [`${prefixCls}-${size}`]: true,
    [`${prefixCls}-${theme}`]: !showLevel,
    [`${prefixCls}-level`]: showLevel,
    [`${prefixCls}-${level}`]: showLevel,
  });

  return (
    <Tag className={tagCls} {...props} data-testid="tag-props">
      {showLevel ? level : children}
    </Tag>
  );
}

export default BasicTag;
