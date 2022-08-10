---
order: 0
cols: 2
title: 新建表单
---

``` tsx
import React, { useState } from 'react'
import { Button, Form, message, DatePicker, Space, XForm, DrawerForm } from "knowdesign";
import { FormItemType } from "../../x-form";
const BasicDemo = () => {
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

  const [visible, setVisible] = useState(false);

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

  const formData1 = {
      name: "",
      age: "",
      city: "",
      street: "",
    };
  const formMap1 = [
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
    }]

  const formMap2 = [
    {
      key: "city",
      label: "城市",
      rules: [
        {
          required: true,
          message: "请输入",
        },
      ],
    },
    {
      key: "street",
      label: "街道",
      rules: [
        {
          required: true,
          message: "请输入",
        },
      ],
    }]
  
  const onFinish = async (values) => {
    console.log(values, 'values')
    await waitTime(2000);
    message.success("提交成功");
    return true;
  };

  const renderCustomForm = (formInstance) => {
    return <>
        <XForm formData={formData1} formMap={formMap1} form={formInstance}></XForm>
        <XForm formData={formData1} formMap={formMap2} form={formInstance}></XForm>
    </>
  };


  return (
    <Space>
      <DrawerForm
        renderCustomForm={renderCustomForm}
        size="small"
        title="新建表单"
        trigger={<Button type="primary">新建表单</Button>}
        drawerProps={{
          onClose,
        }}
        onFinish={async (values) => {
          console.log(values, "values");
          await waitTime(2000);
          message.success("提交成功");
          return true;
        }}
      />
      <Button type="primary" onClick={() => setVisible(true)}>
        visible方式
      </Button>
      <DrawerForm
        key="visibleDemo"
        width={500}
        title="visibleDemo"
        visible={visible}
        onVisibleChange={setVisible}
        drawerProps={{
          onClose,
        }}
        XFormProps={{
          formData,
          formMap,
          form,
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
  <BasicDemo />,
  mountNode
)
```
