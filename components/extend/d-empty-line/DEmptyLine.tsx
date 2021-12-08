import React from 'react';
import classNames from 'classnames';

export interface IDEmptyLineProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  height?: number;
}

const DEmptyLine = ({ height = 20, prefixCls = 'dantd', className, style }: IDEmptyLineProps) => {
  const dEmptyLineClassName = classNames(`${prefixCls}-d-empty-line`, className);
  const dEmptyLineStyle = {
    height,
    ...style,
  };

  return <div className={dEmptyLineClassName} style={dEmptyLineStyle} />;
};

export default DEmptyLine;
