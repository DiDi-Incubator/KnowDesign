import React from "react";
import { DTable } from "../d-table";
import QueryForm, { IQueryFormProps } from "../query-form";
import { IDTableProps } from "../d-table";
import "./index.less";

export default function ProTable<T>(props: {
  showQueryForm?: boolean;
  queryFormProps?: IQueryFormProps;
  tableProps: IDTableProps;
}) {
  const { showQueryForm = false, queryFormProps, tableProps } = props;
  return (
    <div className="pro-table-container">
      {showQueryForm && (
        <div className="container-query">
          <QueryForm {...queryFormProps} />
        </div>
      )}
      <div className="container-table">
        <DTable
          {...tableProps}
        />
      </div>
    </div>
  );
}
