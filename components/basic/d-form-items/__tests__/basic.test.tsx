import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import DFormItems from '../DFormItems';
import { Form } from 'knowdesign';

describe('DFormItems', () => {
  it('初始参数渲染正常', () => {
    const Demo = () => {
      const data = [['张三', '程序员']];
      const [form] = Form.useForm();
      return (
        <DFormItems
          form={form}
          dataSource={data}
          fieldName="customParams"
          columns={[
            {
              type: 'input',
              title: '姓名',
              required: true,
            },
            {
              type: 'select',
              title: '职业',
              required: true,
              selectOptions: [
                {
                  title: '程序员',
                  value: '程序员',
                },
                {
                  title: '产品经理',
                  value: '产品经理',
                },
                {
                  title: '设计师',
                  value: '设计师',
                },
              ]
            },
          ]}
        />
      )
    }

    const { getByTestId } = render(
      <Demo />
    );
    const element = getByTestId('row');
    expect(element.children.length).toBe(3);
  })
});