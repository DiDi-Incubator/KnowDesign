import * as React from 'react';
import { TreeSelect, TreeSelectProps } from 'antd';
import { DefaultValueType } from 'rc-tree-select/lib/interface';
import classNames from 'classnames';
import './style/index.less';


function DTreeSelect(props: TreeSelectProps<DefaultValueType>) {
  const prefixCls = `${props.prefixCls || 'dantd'}-tree-select`;
  const collapseCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: true,
  });

  return (
    <TreeSelect
      {...props}
      className={collapseCls}
    />
  )
};
DTreeSelect.TreeNode = TreeSelect.TreeNode;
const TreeNode = DTreeSelect.TreeNode;
DTreeSelect.SHOW_ALL = TreeSelect.SHOW_ALL;
DTreeSelect.SHOW_PARENT = TreeSelect.SHOW_PARENT;
DTreeSelect.SHOW_CHILD = TreeSelect.SHOW_CHILD;

export { TreeNode };

export default DTreeSelect;
