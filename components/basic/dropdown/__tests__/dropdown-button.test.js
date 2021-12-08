import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '..';
import Menu from '../../menu';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('DropdownButton', () => {
  mountTest(Dropdown.Button);
  rtlTest(Dropdown.Button);

  it('pass appropriate props to Dropdown', () => {
    const props = {
      align: {
        offset: [10, 20],
      },
      overlay: (
        <Menu>
          <Menu.Item key="1">foo</Menu.Item>
        </Menu>
      ),
      disabled: false,
      trigger: ['hover'],
      visible: true,
      onVisibleChange: () => {},
    };

    const wrapper = mount(<Dropdown.Button {...props} />);
    const dropdownProps = wrapper.find(Dropdown).props();

    Object.keys(props).forEach(key => {
      expect(dropdownProps[key]).toBe(props[key]);
    });
  });

  it("don't pass visible to Dropdown if it's not exits", () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(<Dropdown.Button overlay={menu} />);
    const dropdownProps = wrapper.find(Dropdown).props();

    expect('visible' in dropdownProps).toBe(false);
  });

  it('should support href like Button', () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(<Dropdown.Button overlay={menu} href="https://ant.design" />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('have static property for type detecting', () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(<Dropdown.Button overlay={menu} />);
    expect(wrapper.type().__ANT_BUTTON).toBe(true);
  });

  it('should pass mouseEnterDelay and mouseLeaveDelay to Dropdown', () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(
      <Dropdown.Button mouseEnterDelay={1} mouseLeaveDelay={2} overlay={menu} />,
    );
    expect(wrapper.find('Dropdown').props().mouseEnterDelay).toBe(1);
    expect(wrapper.find('Dropdown').props().mouseLeaveDelay).toBe(2);
  });

  it('should support overlayClassName and overlayStyle', () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(
      <Dropdown.Button
        overlayClassName="className"
        overlayStyle={{ color: 'red' }}
        overlay={menu}
        visible
      />,
    );
    expect(wrapper.find('.ant-dropdown').getDOMNode().className).toContain('className');
    expect(wrapper.find('.ant-dropdown').getDOMNode().style.color).toContain('red');
  });
});
