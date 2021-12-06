import React from 'react';
import { Pagination, PaginationProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';

function DPagination(props: PaginationProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-pagination`;
  const paginationCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: !!props.className,
  });

  return (
    <Pagination
      className={paginationCls}
      {...props}
    >
    </Pagination>
  )
};

export default DPagination;
