import React, { useState } from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import _ from 'lodash';
import LevelIcon from './LevelIcon';
import './style/index.less';
import DescriptionsItem from './Item';
interface IProps {
  haveMore?: number,
  moreText?: React.ReactNode | string,
}
const LeverMap = {
  1: 'p1',
  2: 'p2',
  3: 'p3'
}
function DescriptionsHOC(props: DescriptionsProps & IProps) {
  const isHaveMore = props.haveMore ? true : false;
  const moreText = props.moreText ? props.moreText : '查看更多';
  const column = props.haveMore > 0 ? props.haveMore : -1;
  // const curRef = React.createRef<HTMLElement>();
  // const len = _.size(Array.from(props.children as any[]));
  const [haveClick, setHaveClick] = useState(false);
  const clickLookMore = () => {
    setHaveClick(true)
  }
  const temp = [];
  if (_.isArray(props.children)) {
    Array.from(props.children as any[]).map((o, i) => {
      if (isHaveMore && !haveClick && column > 0) {
        if (i < column) {
          temp.push(o);
        }
        if (i === (column - 1)) {
          const _child = React.createElement('a', { key: 0, className: 'lookMore', onClick: clickLookMore }, moreText);
          o = React.cloneElement(o, { children: [o.props.children, _child] });
          temp.splice(temp.length - 1, 1, o);
        }
      } else {
        temp.push(o);
      }
      if (o.props.level) {
        const _leverchildLev = React.createElement('span', { key: 1, className: `level level-${o.props.level}` }, LeverMap[o.props.level]);
        const _leverchildCon = React.createElement('div', { key: 0, className: 'flex-box' }, [<LevelIcon key={0} />, _leverchildLev]);
        o = React.cloneElement(o, { children: [o.props.children, _leverchildCon] });
        if (i < column || haveClick) { temp.splice(i, 1, o); }
      }
      if (o.props.tags && o.props.tags.length > 0) {
        const tagsArr = [];
        o.props.tags.map((item: any, index: number) => {
          const _tagchild = React.createElement('a', { key: index, className: `customtag`, href: item.href }, item.title);
          tagsArr.push(_tagchild);
        })
        o = React.cloneElement(o, { children: [o.props.children, tagsArr] });
        if (i < column || haveClick) { temp.splice(i, 1, o); }
      }
    });
  } else {
    temp.push(props.children);
  }
  return <Descriptions
    {...{
      ...props,
      children: _.size(temp) > 1 ? temp : temp[0]
    }}
    {...props.children}
  />
}
DescriptionsHOC.Item = DescriptionsItem;
export default DescriptionsHOC;