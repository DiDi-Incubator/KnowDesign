import * as React from 'react';

interface ITags {
  title: string,
  href: string,
}
type ILevel = 1 | 2 | 3;
export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  children?: React.ReactNode;
  span?: number;
  level?: ILevel;
  tags?: ITags[];
}

const DescriptionsItem: React.FC<DescriptionsItemProps> = ({ children }) => children as JSX.Element;

export default DescriptionsItem;
