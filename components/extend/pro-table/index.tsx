import React from "react";
import { IQueryFormProps } from "../query-form";
import { IDTableProps, DTable } from "../d-table";
import { Select, IconFont } from '../../index';
import "./style/index.less";

interface MiniSelectInterface extends React.FC<any> {
  Option: typeof Select.Option;
}

export default function ProTable<T>(props: {
  isCustomPg?: boolean; // 是否展示自定义分页器样式 -- true
  pgSelectComponentText?: string; // 分页下拉左侧展示文案
  pgCustomSelectComponent?: () => any; // 展示自定义分页下拉框--true
  selectComponentIcon?: string; // 自定义分页下拉框 -- 'icon-xiala'
  showQueryForm?: boolean;
  queryFormProps?: IQueryFormProps;
  tableProps: IDTableProps;
}) {

  const { showQueryForm = false, queryFormProps, tableProps, pgSelectComponentText, pgCustomSelectComponent, selectComponentIcon = 'icon-xiala', isCustomPg = true } = props;

  const SelectComponent: MiniSelectInterface = props => {
    return <>
      <span>{pgSelectComponentText || ''}</span>
      <Select bordered={false} suffixIcon={<IconFont type={selectComponentIcon} />} {...props} />
    </>
  };

  SelectComponent.Option = Select.Option;

  const customPg = isCustomPg ? {
    locale: {
      items_per_page: '/页',
    },
    selectComponentClass: SelectComponent,
    className: 'pro-table-pagination-custom',
  } : null


  const pagination = {
    ...customPg,
    ...tableProps.paginationProps,
    className: `${isCustomPg ? customPg.className : null} ${tableProps?.paginationProps?.className ? tableProps?.paginationProps?.className : null}`,
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
          {...{ ...tableProps, paginationProps: pagination }}
          showQueryForm={showQueryForm}
          queryFormProps={queryFormProps}
        />
      </div>
    </div>
  );
}
