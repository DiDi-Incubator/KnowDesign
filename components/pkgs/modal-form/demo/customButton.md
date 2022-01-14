---
order: 0
title: 自定义按钮
---

``` tsx
import React from "react";
import { Button, Form, message, Space } from "antd";
import { ModalForm } from "@didi/dcloud-design";
const CustomButton = () => {
  const [form] = Form.useForm();
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const onCancel = () => {
    console.log("close drawer");
  };

  const formData = {
    name: "",
    age: "",
    city: "",
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
  ];

  return (
    <Space>
      <ModalForm
        size="small"
        title="自定义按钮文字"
        trigger={<Button type="primary">自定义按钮文字</Button>}
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
        submitter={{
          buttonConfig: {
            submitText: "OK",
            resetText: "Cancel",
          },
        }}
      />

      <ModalForm
        title="自定义footer"
        trigger={<Button type="primary">自定义footer</Button>}
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
        submitter={{
          buttonConfig: {
            submitText: "提交",
            resetText: "关闭",
          },
          render: ({ submit, reset, form }, defaultDoms) => {
            return [
              <Button
                key="reset"
                onClick={() => {
                  reset();
                }}
              >
                重置
              </Button>,
              ...defaultDoms,
            ];
          },
        }}
      />

      <ModalForm
        size="small"
        title="隐藏footer"
        trigger={<Button type="primary">隐藏footer</Button>}
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
        submitter={false}
      />

      <ModalForm
        size="small"
        title="按钮位置"
        trigger={<Button type="primary">按钮位置</Button>}
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
        submitterPosition="left"
      />
    </Space>
  );
};

ReactDOM.render(
  <CustomButton />,
  mountNode
)
```