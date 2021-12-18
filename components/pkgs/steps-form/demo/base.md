---
title: 基本
order: 1
---

``` tsx

import React, { useRef } from 'react';
import type { FormInstance } from 'antd';
import  StepsForm from '../index'
import { message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const BaseDemo = () => {
  const formRef = useRef<FormInstance>();
  return (
      <StepsForm
        formRef={formRef}
        onFinish={async (values) => {
          console.log(values, 'values 123123');
          await waitTime(1000);
          message.success('提交成功');
          return true;
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="创建实验"
          stepProps={{
            description: '这里填入的都是基本信息',
          }}
          formData={{
            city: '',
            location: '海淀',
          }}
          formMap={[
            {
              key: 'city',
              label: '城市',
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
            },
            {
              key: 'location',
              label: '所在区',
            },
          ]}
        />
        <StepsForm.StepForm
          name="checkbox"
          title="设置参数"
          stepProps={{
            description: '这里填入运维参数',
          }}
          formData={{
            name: '',
            age: '',
          }}
          formMap={[
            {
              key: 'name',
              label: '姓名',
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
            },
            {
              key: 'age',
              label: '年龄',
            },
          ]}
        />
      </StepsForm>
  );
};

ReactDOM.render(
    mountNode
)

```