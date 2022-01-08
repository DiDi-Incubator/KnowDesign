import React from "react";
import { IQueryFormProps } from "../query-form";
import { IDTableProps } from "../d-table";
import { Select, DTable } from '../../index';
import { IconFont } from '../icon-project';
import "./index.less";

interface MiniSelectInterface extends React.FC<any> {
  Option: typeof Select.Option;
}

export default function ProTable<T>(props: {
  isCustomPg?: boolean; // 是否展示自定义分页器样式 -- true
  pgSelectComponentText?: string; // 分页下拉左侧展示文案
  isSelectComponent?: boolean; // 展示自定义分页下拉框--true
  selectComponentIcon?: string; // 自定义分页下拉框 -- 'icon-xiala'
  showQueryForm?: boolean;
  queryFormProps?: IQueryFormProps;
  tableProps: IDTableProps;
}) {

  const { showQueryForm = false, queryFormProps, tableProps, pgSelectComponentText, isSelectComponent = true, selectComponentIcon = 'icon-xiala', isCustomPg = true } = props;

  const SelectComponent: MiniSelectInterface = props => {
    return <>
      <span>{pgSelectComponentText || '每页显示'}</span>
      <Select bordered={false} suffixIcon={<IconFont type={selectComponentIcon} />} {...props} />
    </>
  };

  SelectComponent.Option = Select.Option;

  const pagination = {
    locale: {
      items_per_page: '条',
    },
    className: isCustomPg ? 'ant-pagination-custom' : null,
    selectComponentClass: isSelectComponent ? SelectComponent : null,
  }

  return (
    <div className="pro-table-container">
      {/* {showQueryForm && (
        <div className="container-query">
          <QueryForm {...queryFormProps} />
        </div>
      )} */}
      <div className="container-table">
        <DTable
          {...{ ...tableProps, paginationProps: { ...tableProps.paginationProps, ...pagination } }}
          showQueryForm={showQueryForm}
          queryFormProps={queryFormProps}
        />
      </div>
    </div>
  );
}
