---
order: 2
title: XForm
---


``` tsx
import React, { useState } from 'react'
import { Button, Form, Space, message, DatePicker } from "../../../index.tsx";
import { DrawerForm } from "@didi/d1-packages";
import { FormItemType } from "../../x-form";
const Demo = () => {
  const [form] = Form.useForm();
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const onClose = () => {
    console.log("close drawer");
  };

  const formData = {
    name: "",
    age: "",
    city: "",
    date: "",
    comment: "",
  };

  const formMap = [
    {
      key: "name",
      label: "姓名",
      rules: [
        {
          required: true,
          message: "请输入",
        },
      ],
    },
    {
      key: "age",
      label: "年龄",
      rules: [
        {
          required: true,
          message: "请输入",
        },
      ],
    },
    {
      key: "city",
      label: "城市",
      type: FormItemType.select,
      options: [
        {
          value: 1,
          label: "北京",
        },
        {
          value: 2,
          label: "南京",
        },
      ],
      rules: [
        {
          required: true,
          message: "请选择",
        },
      ],
    },
    {
      key: "date",
      type: FormItemType.custom,
      customFormItem: (
        <DatePicker placeholder="请选择时间" format="YYYY-MM-DD" />
      ),
      label: "日期",
      attrs: {
        placeholder: "请选择日期",
      },
      rules: [
        {
          required: true,
          message: "请选择日期",
        },
      ],
    },
    {
      key: "comment",
      type: FormItemType.textArea,
      attrs: {
        placeholder: "请输入备注",
        maxLength: 10,
      },
      label: "备注",
    },
  ];

  return (
    <Space>
      <DrawerForm
        size="middle"
        title="多列表单"
        trigger={<Button type="primary">多列表单布局</Button>}
        drawerProps={{
          onClose,
        }}
        XFormProps={{
          formData,
          formMap,
          form,
          formItemColSpan: 12,
          layout: 'vertical'
        }}
        onFinish={async (values) => {
          console.log(values, "values");
          await waitTime(2000);
          message.success("提交成功");
          return true;
        }}
      />

      <DrawerForm
        size="middle"
        title="纵向表单"
        trigger={<Button type="primary">纵向表单</Button>}
        drawerProps={{
          onClose,
        }}
        XFormProps={{
          formData,
          formMap,
          form,
          layout: "vertical",
        }}
        onFinish={async (values) => {
          console.log(values, "values");
          await waitTime(2000);
          message.success("提交成功");
          return true;
        }}
      />
    </Space>
  );
};

ReactDOM.render(
  <Demo />,
  mountNode
)
```
