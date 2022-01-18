---
order: 0
title: 基本
---

``` tsx
import { useState } from "react";
import { InputNumber, Card, Button, Modal } from "antd";
import { QueryForm } from "@didi/dcloud-design";

const columns = [
  {
    type: "datePicker",
    title: "日期选择",
    dataIndex: "date1",
    placeholder: ['请选择日期']
  },
  {
    type: "dateRangePicker",
    title: "日期范围选择",
    dataIndex: "date2",
    placeholder: ['开始日期', '结束日期']
  },
    {
    type: "timePicker",
    title: "时间选择",
    dataIndex: "time1",
    placeholder: ['请选择时间']
  },
  {
    type: "timeRangePicker",
    title: "时间范围选择",
    dataIndex: "time2",
    placeholder: ['开始时间', '结束时间']
  },
  {
    type: "select",
    title: "报警等级1",
    dataIndex: "level1",
    options: [
      {
        title: "全部",
        value: "all",
      },
      {
        title: "P0",
        value: "p0",
      },
      {
        title: "P1",
        value: "p1",
      },
      {
        title: "P2",
        value: "p2",
      },
    ],
  },
  {
    type: "input",
    title: "实例名称",
    dataIndex: "name",
  },
  {
    type: "select",
    title: "报警等级",
    dataIndex: "level",
    options: [
      {
        title: "全部",
        value: "all",
      },
      {
        title: "P0",
        value: "p0",
      },
      {
        title: "P1",
        value: "p1",
      },
      {
        title: "P2",
        value: "p2",
      },
    ],
  },
  {
    type: "select",
    title: "任务状态",
    dataIndex: "status",
    selectMode: "multiple",
    options: [
      {
        title: "进行中",
        value: "processing",
      },
      {
        title: "成功",
        value: "success",
      },
      {
        title: "失败",
        value: "fail",
      },
    ],
  },
  {
    type: "custom",
    title: "机器数量",
    dataIndex: "number",
    component: (
      <InputNumber
        placeholder="请输入机器数量"
        style={{ marginTop: 4, width: "100%" }}
        min={0}
        precision={0}
      />
    ),
  },
];

const Demo = () => {
  const initialValues = {
    name: "test",
    level: "p1",
  };
  const [result, setResult] = useState(initialValues);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (queryValue) => {
    setResult(queryValue);
  };
  return (
    <div>
      <Button onClick={() => setCollapse(!collapse)}>{ collapse ? '展开' : '收起' }</Button>
      {
        collapse 
          ? null 
          : <QueryForm
            searchText="查询"
            resetText="重置"
            isResetClearAll={true}
            onChange={handleChange}
            onSearch={handleChange}
            columns={columns}
            initialValues={initialValues}
            onCollapse={() => setCollapse(true)}
          />
      }
      <h3>结果：</h3>
      <div>{JSON.stringify(result)}</div>
    </div>
  );
};

ReactDOM.render(
  <Demo />,
  mountNode
)
```