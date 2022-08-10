---
order: 0
title: 提交
---

``` tsx
import React, { useRef, useState } from "react";
import { Button, Form, message, Space, DatePicker } from "knowdesign";
import { ModalForm } from "knowdesign";

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
  return (
    <Space>
      <ModalForm
        width={500}
        title="使用默认提交和重置"
        trigger={<Button>使用默认提交和重置</Button>}
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

      <ModalForm
        width={500}
        title="使用自定义提交和重置"
        trigger={<Button>使用自定义提交和重置</Button>}
        modalProps={{
          onCancel,
        }}
        XFormProps={{
          formData,
          formMap,
          form,
        }}
        submitter={{
          buttonConfig: {
            submitText: "提交",
            resetText: "重置",
          },
          submitButtonProps: {
            preventDefault: true,
            onClick: (e) => {
              form.validateFields().then(async (values) => {
                console.log(values, "values");
                await waitTime(2000);
                message.success("提交成功");
                form.resetFields();
              });
            },
          },
          resetButtonProps: {
            preventDefault: true,
            onClick: (e) => {
              form.resetFields();
            },
          },
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