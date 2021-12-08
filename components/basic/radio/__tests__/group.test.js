import React from 'react';
import { mount, render } from 'enzyme';
import Radio from '..';

describe('Radio Group', () => {
  function createRadioGroup(props) {
    return (
      <Radio.Group {...props}>
        <Radio value="A">A</Radio>
        <Radio value="B">B</Radio>
        <Radio value="C">C</Radio>
      </Radio.Group>
    );
  }

  function createRadioGroupByOption(props) {
    const options = [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
    ];

    return <Radio.Group {...props} options={options} />;
  }

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(
      <Radio.Group onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Radio />
      </Radio.Group>,
    );

    wrapper.find('div').at(0).simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.find('div').at(0).simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('fire change events when value changes', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createRadioGroup({
        onChange,
      }),
    );
    const radios = wrapper.find('input');

    // controlled component
    wrapper.setProps({ value: 'A' });
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('both of radio and radioGroup will trigger onchange event when they exists', () => {
    const onChange = jest.fn();
    const onChangeRadioGroup = jest.fn();

    const wrapper = mount(
      <Radio.Group onChange={onChangeRadioGroup}>
        <Radio value="A" onChange={onChange}>
          A
        </Radio>
        <Radio value="B" onChange={onChange}>
          B
        </Radio>
        <Radio value="C" onChange={onChange}>
          C
        </Radio>
      </Radio.Group>,
    );
    const radios = wrapper.find('input');

    // controlled component
    wrapper.setProps({ value: 'A' });
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('Trigger onChange when both of radioButton and radioGroup exists', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <Radio.Group onChange={onChange}>
        <Radio.Button value="A">A</Radio.Button>
        <Radio.Button value="B">B</Radio.Button>
        <Radio.Button value="C">C</Radio.Button>
      </Radio.Group>,
    );
    const radios = wrapper.find('input');

    // controlled component
    wrapper.setProps({ value: 'A' });
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('should only trigger once when in group with options', () => {
    const onChange = jest.fn();
    const options = [{ label: 'Bamboo', value: 'Bamboo' }];
    const wrapper = mount(<Radio.Group options={options} onChange={onChange} />);

    wrapper.find('input').simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("won't fire change events when value not changes", () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createRadioGroup({
        onChange,
      }),
    );
    const radios = wrapper.find('input');

    // controlled component
    wrapper.setProps({ value: 'A' });
    radios.at(0).simulate('change');
    expect(onChange.mock.calls.length).toBe(0);
  });

  it('optional should correct render', () => {
    const wrapper = mount(createRadioGroupByOption());
    const radios = wrapper.find('input');

    expect(radios.length).toBe(3);
  });

  it('all children should have a name property', () => {
    const GROUP_NAME = 'radiogroup';
    const wrapper = mount(createRadioGroup({ name: GROUP_NAME }));

    wrapper.find('input[type="radio"]').forEach(el => {
      expect(el.props().name).toEqual(GROUP_NAME);
    });
  });

  it('passes prefixCls down to radio', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange', style: { fontSize: 12 } },
    ];
    const wrapper = render(<Radio.Group prefixCls="my-radio" options={options} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should forward ref', () => {
    let radioGroupRef;
    const wrapper = mount(
      createRadioGroupByOption({
        ref: ref => {
          radioGroupRef = ref;
        },
      }),
    );

    expect(radioGroupRef).toBe(wrapper.children().getDOMNode());
  });

  it('should support data-* or aria-* props', () => {
    const wrapper = mount(
      createRadioGroup({
        'data-radio-group-id': 'radio-group-id',
        'aria-label': 'radio-group',
      }),
    );
    expect(wrapper.getDOMNode().getAttribute('data-radio-group-id')).toBe('radio-group-id');
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe('radio-group');
  });

  it('Radio type should not be override', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Radio.Group onChange={onChange}>
        <Radio value={1} type="1">
          A
        </Radio>
        <Radio value={2} type="2">
          B
        </Radio>
        <Radio value={3} type="3">
          C
        </Radio>
        <Radio value={4} type="4">
          D
        </Radio>
      </Radio.Group>,
    );
    const radios = wrapper.find('input');
    radios.at(1).simulate('change');
    expect(onChange).toHaveBeenCalled();
    expect(radios.at(1).getDOMNode().type).toBe('radio');
  });

  describe('value is null or undefined', () => {
    it('use `defaultValue` when `value` is undefined', () => {
      const options = [{ label: 'Bamboo', value: 'bamboo' }];
      const wrapper = mount(
        <Radio.Group defaultValue="bamboo" value={undefined} options={options} />,
      );
      expect(wrapper.find('.ant-radio-wrapper').at(0).hasClass('ant-radio-wrapper-checked')).toBe(
        true,
      );
    });

    [undefined, null].forEach(newValue => {
      it(`should set value back when value change back to ${newValue}`, () => {
        const options = [{ label: 'Bamboo', value: 'bamboo' }];
        const wrapper = mount(<Radio.Group value="bamboo" options={options} />);
        expect(wrapper.find('.ant-radio-wrapper').at(0).hasClass('ant-radio-wrapper-checked')).toBe(
          true,
        );
        wrapper.setProps({ value: newValue });
        wrapper.update();
        expect(wrapper.find('.ant-radio-wrapper').at(0).hasClass('ant-radio-wrapper-checked')).toBe(
          false,
        );
      });
    });
  });
});
