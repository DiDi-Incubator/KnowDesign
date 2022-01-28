import { Table, Input, TableProps } from "../../index";
import React, { useState } from "react";
import IconFont from "../icon-project/IconFont";

export type linkageTableProps = {
  lineData?: any[];
  requestParams?: any;
  rangeTimeArr?: any;
  clearFlag?: number;
  dispatchSort?: (params: any) => void;
};

export const sortFieldEnum = {
  0: "last",
  1: "min",
  2: "max",
  3: "mean",
  4: 'std',
  5: 'fiftyFiveQuantile',
  6: "seventyFiveQuantile",
  7: 'ninetyFiveQuantile',
  8: "ninetyNineQuantile"
};

const columnsVal = [
  {
    title: '',
    dataIndex: 'color',
    key: 'color',
    render: (_, record) => {
      return <>
        <span style={{ display: 'inline-block', marginRight: 4, borderRadius: 10, width: 10, height: 10, backgroundColor: record.color }}></span>
        <span>{record.name}</span>
      </>
    }
  },
  {
    title: '磁盘路径',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '设备名',
    dataIndex: 'device',
    key: 'device',
  },
  {
    title: '最大值',
    dataIndex: 'max',
    key: 'max',
    sorter: true
  },
  {
    title: '最小值',
    dataIndex: 'min',
    key: 'min',
    sorter: true,
  },
  {
    title: '平均值',
    dataIndex: 'mean',
    key: 'mean',
    sorter: true
  },
  {
    title: '当前值',
    dataIndex: 'last',
    key: 'last',
    sorter: true
  },
  {
    title: '55%',
    dataIndex: 'fiftyFiveQuantile',
    key: 'fiftyFiveQuantile',
    sorter: true
  },
  {
    title: '75%',
    dataIndex: 'seventyFiveQuantile',
    key: 'seventyFiveQuantile',
    sorter: true
  },
  {
    title: '95%',
    dataIndex: 'ninetyFiveQuantile',
    key: 'ninetyFiveQuantile',
    sorter: true
  },
  {
    title: '99%',
    dataIndex: 'ninetyNineQuantile',
    key: 'ninetyNineQuantile',
    sorter: true
  },
];

const LinkageTable = (props: linkageTableProps) => {
  const {
    lineData = [],
    dispatchSort,
    requestParams,
    clearFlag
  } = props;

  const [keyWord, setKeyword] = useState<string>("");
  const [dataSource, setDataSource] = React.useState(lineData);
  const [current, setCurrent] = React.useState(1);
  const [columns, setColumns] = React.useState<any>(columnsVal);
  const [sortedInfo, setSortedInfo] = useState<any>({
    columnKey: sortFieldEnum[requestParams.sortMetricType],
    order: "ascend"
  });

  const tablePagination = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['1', '2', '3', '4'],
    showTotal: (total) => `共 ${total} 条`,
  };

  React.useEffect(() => {
    const data = keyWord ? lineData.filter(
      (d) =>
        d?.path?.includes(keyWord as string),
    ) : lineData;
    setDataSource(data);
  }, [lineData])

  React.useEffect(() => {
    setColumns((data) => {
      return data.map(item => {
        if (item.sorter) {
          item.sortOrder = sortedInfo.columnKey === item.key && sortedInfo.order
        }
        return {
          ...item
        }
      })
    })
  }, [sortedInfo]);

  const onSearch = e => {
    const searchKey = e.target.value;
    const data = searchKey ? dataSource.filter(
      (d) =>
        d?.path?.includes(searchKey as string),
    ) : lineData;
    setDataSource(data);
  };

  React.useEffect(() => {
    setKeyword("");
    setDataSource([]);
    setCurrent(1);
  }, [clearFlag])

  const onChange = (pagination, filters, sorter, extra) => {
    setCurrent(pagination.current);
    if (sorter.order && sorter.columnKey !== sortedInfo.columnKey) {
      setCurrent(pagination.current);
      setSortedInfo(sorter);
      setCurrent(1);
      dispatchSort(sorter);
      setKeyword("");
      setDataSource([]);
    }
  };

  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }

  return <>
    <Input
      placeholder="请输入磁盘路径"
      prefix={<IconFont type='icon-sousuo' style={{ fontSize: 13 }} />}
      style={{ width: 290, marginBottom: 10 }}
      value={keyWord}
      onChange={(e) => setKeyword(e.target.value)}
      onPressEnter={onSearch} />
    <Table sortDirections={["ascend"]}
      showSorterTooltip={false} rowKey={'name'} columns={columns} pagination={{ ...tablePagination, onShowSizeChange, current }} dataSource={dataSource} onChange={onChange} />
  </>
}

export default LinkageTable;
