---
title: 基本
order: 1
---

``` tsx
import React, { useRef } from 'react';
import type { FormInstance } from 'antd';
import StepsForm from '../index.tsx';
import { message, Button } from 'antd';

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
        stepsProps={{
            labelPlacement: 'vertical'
        }}
        onFinish={async (values) => {
          console.log(values, 'values 123123');
          await waitTime(1000);
          message.success('提交成功');
          return true;
        }}
        submitter={{
          buttonConfig: {
            resetText: 'Prev',
            submitText: 'Ok',
            nextText: 'Next'
          }
        }}
      >
        <StepsForm.Item
          name="step1"
          title="第一步"
          stepProps={{
            description: '第一步的描述',
          }}
          formData={{
            city: '',
            location: '',
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
          onFinish={
            (values) => {
              console.log(values, 'values 1')
              return true
            }
          }
        />
        <StepsForm.Item
          name="step2"
          title="第二步"
          stepProps={{
            description: '第二步的描述',
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
        <StepsForm.Item
          name="step3"
          title="第三步"
          stepProps={{
            description: '第三步的描述',
          }}
          formData={{
            name: '',
            age: '',
          }}
          formMap={[
            {
              key: 'level',
              label: '职级',
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
            },
            {
              key: 'workNumber',
              label: '工号',
            },
          ]}
        />
      </StepsForm>
  );
};

ReactDOM.render(
    <BaseDemo />,
    mountNode
)
```