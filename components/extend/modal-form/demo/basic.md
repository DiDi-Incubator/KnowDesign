---
order: 0
title: 基本
---
``` tsx
import React, { useState } from "react";
import { ModalForm, XForm, Button, Form, message, DatePicker, Space } from "knowdesign";
export const Demo =  () => {
  const [form] = Form.useForm();
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const onCancel = () => {
    console.log("close modal");
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
      type: 'select',
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
      type: 'custom',
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
      type: 'textArea',
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
      <ModalForm
        renderCustomForm={renderCustomForm} 
        title="新建表单"
        trigger={<Button type="primary">新建表单</Button>}
        modalProps={{
          onCancel,
        }}
        onFinish={onFinish}
      />
      <Button type="primary" onClick={() => setVisible(true)}>
        visible方式
      </Button>
      <ModalForm
        key="visibleDemo"
        width={500}
        title="visibleDemo"
        visible={visible}
        onVisibleChange={setVisible}
        modalProps={{
          onCancel,
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
  <Demo />,
  mountNode
)
```
