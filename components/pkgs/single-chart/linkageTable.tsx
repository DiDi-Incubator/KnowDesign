import { Table, Input, TableProps } from "../../index";
import React from "react";
import IconFont from "../icon-project/IconFont";

export type linkageTableProps = {
  tableProps: TableProps<any>;
  lineData?: any[];
  requestParams?: any;
  dispatchSort?: (params: any) => void;
}

const LinkageTable = (props: linkageTableProps) => {
  const {
    tableProps,
    lineData = [],
    dispatchSort
  } = props;

  const [dataSource, setDataSource] = React.useState(lineData);
  const [current, setCurrent] = React.useState(1);
  const [order, setOrder] = React.useState(undefined);

  React.useEffect(() => {
    setDataSource(lineData);
  }, [lineData])

  const onSearch = e => {
    const searchKey = e.target.value;
    const data = searchKey ? dataSource.filter(
      (d) =>
        JSON.stringify(d).toLowerCase().includes(searchKey as string),
    ) : lineData;
    setDataSource(data);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    setCurrent(pagination.current);
    if (sorter.order && sorter.order !== order) { // 过滤重新请求
      setCurrent(1);
      setOrder(sorter.order);
      dispatchSort(sorter);
    }
  }

  return <>
    <Input
    placeholder="Search..."
    prefix={<IconFont type='icon-sousuo' style={{fontSize: 13}} />}
    style={{width: 200, marginBottom: 10}}
    onPressEnter={onSearch}/>
    <br/>
    <Table rowKey={'name'} {...tableProps} pagination={{...(tableProps as any).pagination, current}} dataSource={dataSource} onChange={onChange}/>
  </>
}

export default LinkageTable;
