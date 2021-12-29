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
  pgSelectComponentText?: string; // 分页下拉左侧展示文案
  pgSelectComponentClass?: any; // 自定义分页下拉框
  showQueryForm?: boolean;
  queryFormProps?: IQueryFormProps;
  tableProps: IDTableProps;
}) {

  const { showQueryForm = false, queryFormProps, tableProps, pgSelectComponentText } = props;

  const SelectComponent: MiniSelectInterface = props => {
    return <>
      <span>{pgSelectComponentText || '每页显示'}</span>
      <Select bordered={false} suffixIcon={<IconFont type='icon-xiala' />} {...props} />
    </>
  };

  SelectComponent.Option = Select.Option;

  const pagination = {
    locale: {
      items_per_page: '条',
    },
    className: 'ant-pagination-custom',
    selectComponentClass: props.pgSelectComponentClass || SelectComponent,
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
