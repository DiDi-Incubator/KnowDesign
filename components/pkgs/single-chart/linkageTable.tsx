import { Table, Input, TableProps } from "../../index";
import React from "react";
import IconFont from "../icon-project/IconFont";

export type linkageTableProps = {
  tableProps: TableProps<any>;
  lineData?: any[];
  requestParams?: any;
  dispatchSort?: (params: any) => void;
  sortFieldCode?: string | number;
};

export const sortEnumArr = [
  {
    key: "last",
    name: "最近一次采样值",
    code: 0
  },
  {
    key: "min",
    name: "采样周期内最小值",
    code: 1
  },
  {
    key: "max",
    name: "最大值",
    code: 2
  },
  {
    key: "mean",
    name: "均值",
    code: 3
  },
  {
    key: "std",
    name: "采样周期内样本值标准差",
    code: 4
  },
  {
    key: "fiftyFiveQuantile",
    name: "采样周期内55分位数值",
    code: 5
  },
  {
    key: "seventyFiveQuantile",
    name: "采样周期内75分位数值",
    code: 6
  },
  {
    key: "ninetyFiveQuantile",
    name: "采样周期内95分位数值",
    code: 7
  },
  {
    key: "ninetyNineQuantile",
    name: "采样周期内99分位数值",
    code: 8
  }
];

const LinkageTable = (props: linkageTableProps) => {
  const {
    tableProps,
    lineData = [],
    dispatchSort,
    sortFieldCode
  } = props;
  const { columns: propColumns } = tableProps;

  const [dataSource, setDataSource] = React.useState(lineData);
  const [current, setCurrent] = React.useState(1);
  const [order, setOrder] = React.useState(undefined);
  const [columns, setColumns] = React.useState<any>(propColumns);

  React.useEffect(() => {
    // setColumns((data) => {
    //   return data.map(item => {
    //     if(item.dataIndex === sortEnumArr.find(item => item.code === sortFieldCode).key) {
    //       item.sortOrder = "ascend"
    //     }
    //     return {
    //       ...item
    //     }
    //   })
    // })
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
    console.log(sorter, 'sorter');
    setCurrent(pagination.current);
    if (sorter.order && sorter.order !== order) { // 过滤重新请求
      setCurrent(1);
      setOrder(sorter.order);
      dispatchSort(sorter.order);
    }
  }

  return <>
    <Input
    placeholder="Search..."
    prefix={<IconFont type='icon-sousuo' style={{fontSize: 13}} />}
    style={{width: 200, marginBottom: 10}}
    onPressEnter={onSearch}/>
    <br/>
    <Table sortDirections={["ascend"]} rowKey={'name'} {...tableProps} columns={columns} pagination={{...(tableProps as any).pagination, current}} dataSource={dataSource} onChange={onChange}/>
  </>
}

export default LinkageTable;
