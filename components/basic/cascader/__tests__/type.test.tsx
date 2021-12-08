import { mount } from 'enzyme';
import * as React from 'react';
import Cascader, { BasicDataNode } from '..';

describe('Cascader.typescript', () => {
  it('options value', () => {
    const options = [
      {
        value: 1,
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];

    const result = <Cascader options={options} defaultValue={[1, 'hangzhou']} />;

    expect(result).toBeTruthy();
  });

  it('suffixIcon', () => {
    const wrapper = mount(<Cascader suffixIcon={<span />} />);
    expect(wrapper).toBeTruthy();
  });

  it('Generic', () => {
    interface MyOptionData extends BasicDataNode {
      customizeLabel: string;
      customizeValue: string;
      customizeChildren?: MyOptionData[];
    }

    const wrapper = mount(
      <Cascader<MyOptionData>
        options={[
          {
            customizeLabel: 'Bamboo',
            customizeValue: 'bamboo',
            customizeChildren: [
              {
                customizeLabel: 'Little',
                customizeValue: 'little',
              },
            ],
          },
        ]}
      />,
    );
    expect(wrapper).toBeTruthy();
  });
});
