import React from 'react';
import { Card, CardProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';

const { Grid, Meta } = Card;

function DCard(props: CardProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-card`;
  const sizeCls = `dantd-${props.size || 'default'}-card`;
  const cardCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: true,
    [sizeCls]: true,
  });

  return (
    <Card 
      className={cardCls}
      {...props}
    />
  )
};
DCard.Grid = Grid;
DCard.Meta = Meta;
export default DCard;
