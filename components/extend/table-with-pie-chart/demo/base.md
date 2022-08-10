---
order: 0
title: 基本
---
``` tsx
import React, { useState, useEffect } from "react";
import { TableWithPieChart } from "knowdesign";

const Demo = () => {
  const [tableData, setTableData] = useState<any>();
  const [chartData, setChartData] = useState<any>();
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [chartLoading, setChartLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 0,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50", "100", "200", "500"],
    showTotal: (total: number) => `共 ${total} 条`,
  });
  const [hightLightItem, setHightLightItem] = useState<any>({
    name: "<10%",
  });

  const getChartHighlightIndex = (data) => {
    return data && data.findIndex((item) => item.highlight);
  };

  const queryTableData = (params: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          pagination: {
            pageNo: 1,
            paheSize: 10,
            total: 2,
          },
          bizData: [
            {
              id: 1,
              name: (Math.random() * 1000).toFixed(),
              name1: "",
              name2: "阿苏菲玛索；方面",
              name3: "对方水电费",
              name4: "f是否的水电费水电费",
            },
            {
              id: 2,
              name: "集群002",
              name1: "asdasda",
              name2: "阿斯达撒所大所多",
              name3: "对方水电费",
              name4: "f是否的水电费水电费",
            },
            {
              id: 3,
              name: (Math.random() * 1000).toFixed(),
              name1: "",
              name2: "阿苏菲玛索；方面",
              name3: "对方水电费",
              name4: "f是否的水电费水电费",
            },
            {
              id: 4,
              name: "集群003",
              name1: "asdasda",
              name2: "阿斯达撒所大所多",
              name3: "对方水电费",
              name4: "f是否的水电费水电费",
            },
          ],
        });
      }, 3000);
    });
  };

  const queryChartData = (params: any): any => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              value: (Math.random() * 1000).toFixed(),
              highlight: true,
              name: "可用存储量<10%",
            },
            {
              value: 735,
              name: "可用存储量>50%",
            },
            {
              value: 580,
              name: "可用存储量：30%-40%",
            },
            {
              value: 484,
              name: "可用存储量：20%-30%",
            },
            {
              value: 300,
              name: "可用存储量：10%-20%",
            },
          ],
        });
      }, 3000);
    });
  };

  const getTableData = async () => {
    const { current: pageNo, pageSize } = pagination;
    const params = {
      pageNo,
      pageSize,
      ...hightLightItem,
    };
    setTableLoading(true)
    const data = await queryTableData(params);
    setTableLoading(false)
    setTableData(data);
  };

  const getChartData = async () => {
    const params = {
      ...hightLightItem,
    };
    setChartLoading(true);
    const { data } = await queryChartData(params);
    setChartLoading(false);
    setChartData(data);
  };

  const tableProps = (() => {
    return {
      columns: [
        {
          dataIndex: "name",
          title: "集群名称",
        },
        {
          dataIndex: "name1",
          title: "存储容量（GB）",
          width: 50,
        },
        {
          dataIndex: "name2",
          title: "实际存储量",
        },
        {
          dataIndex: "name3",
          title: "预留存储量",
        },
        {
          dataIndex: "name4",
          title: "可用存储量",
        },
      ],
      showSearch: false,
      attrs: {
        loading: tableLoading,
        rowKey: "id",
        pagination: {
          ...pagination,
          total: tableData?.pagination?.total,
        },
        onChange: (pagination) => {
          setPagination(pagination);
        },
      },
    };
  })();

  useEffect(() => {
    getTableData();
  }, [pagination, hightLightItem]);

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <div>
      <TableWithPieChart
        wrapStyle={{
          display: "flex",
          width: "100%",
          height: 300,
        }}
        tableStyle={{
          flex: 1,
          height: "100%",
        }}
        chartStyle={{
          width: 500,
          height: '100%',
        }}
        chartLoading={chartLoading}
        hightlightIndex={getChartHighlightIndex(chartData)}
        updateHighlighItem={setHightLightItem}
        tableProps={tableProps}
        tableData={tableData?.bizData}
        chartProps={{
          title: {
            text: "存储容量",
          },
          series: [
            {
              center: ["55%", "50%"],
              radius: [34, 56],
            },
          ],
        }}
        chartData={chartData}
      />
    </div>
  );
};

ReactDOM.render(
  <Demo />,
  mountNode
)
```