import React from 'react';
import { Tree, TreeProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';

const { DirectoryTree, TreeNode } = Tree;

function DTree(props: TreeProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-tree`;
  const collapseCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: true,
  });

  return (
    <Tree
      {...props}
      className={collapseCls}
    >
    </Tree>
  )
};

DTree.DirectoryTree = DirectoryTree;
DTree.TreeNode = TreeNode;
export default DTree;
