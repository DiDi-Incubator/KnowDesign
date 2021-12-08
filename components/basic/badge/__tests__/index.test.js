import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Badge from '../index';
import Tooltip from '../../tooltip';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Badge', () => {
  mountTest(Badge);
  rtlTest(Badge);
  rtlTest(() => (
    <Badge count={5} offset={[10, 10]}>
      <a href="#" className="head-example">
        head
      </a>
    </Badge>
  ));

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('badge dot not scaling count > 9', () => {
    const badge = mount(<Badge count={10} dot />);
    expect(badge.find('.ant-card-multiple-words').length).toBe(0);
  });

  it('badge should support float number', () => {
    let wrapper = mount(<Badge count={3.5} />);
    expect(wrapper.find('.ant-badge-multiple-words').first().text()).toEqual('3.5');

    wrapper = mount(<Badge count="3.5" />);
    expect(wrapper.find('.ant-badge-multiple-words').first().text()).toEqual('3.5');
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('badge dot not showing count == 0', () => {
    const badge = mount(<Badge count={0} dot />);
    expect(badge.find('.ant-badge-dot').length).toBe(0);
  });

  it('should have an overriden title attribute', () => {
    const badge = mount(<Badge count={10} title="Custom title" />);
    expect(
      badge.find('.ant-scroll-number').getDOMNode().attributes.getNamedItem('title').value,
    ).toEqual('Custom title');
  });

  // https://github.com/ant-design/ant-design/issues/10626
  it('should be composable with Tooltip', () => {
    const ref = React.createRef();
    const wrapper = mount(
      <Tooltip title="Fix the error" ref={ref}>
        <Badge status="error" />
      </Tooltip>,
    );

    act(() => {
      wrapper.find('Badge').simulate('mouseenter');
      jest.runAllTimers();
    });
    expect(ref.current.props.visible).toBeTruthy();
  });

  it('should render when count is changed', () => {
    const wrapper = mount(<Badge count={9} />);

    function updateMatch(count) {
      wrapper.setProps({ count });

      act(() => {
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.render()).toMatchSnapshot();
      });
    }

    updateMatch(10);
    updateMatch(11);
    updateMatch(11);
    updateMatch(111);
    updateMatch(10);
    updateMatch(9);
  });

  it('should be compatible with borderColor style', () => {
    const wrapper = mount(
      <Badge
        count={4}
        style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/13694
  it('should support offset when count is a ReactNode', () => {
    const wrapper = mount(
      <Badge count={<span className="custom" style={{ color: '#f5222d' }} />} offset={[10, 20]}>
        <a href="#" className="head-example">
          head
        </a>
      </Badge>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/15349
  it('should color style  works on Badge', () => {
    const wrapper = mount(<Badge style={{ color: 'red' }} status="success" text="Success" />);
    expect(wrapper.find('.ant-badge-status-text').props().style.color).toBe('red');
  });

  // https://github.com/ant-design/ant-design/issues/15799
  it('render correct with negative number', () => {
    const wrapper = mount(
      <div>
        <Badge count="-10" />
        <Badge count={-10} />
      </div>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/21331
  // https://github.com/ant-design/ant-design/issues/31590
  it('render Badge status/color when contains children', () => {
    const wrapper = mount(
      <div>
        <Badge count={5} status="success">
          <a />
        </Badge>
        <Badge count={5} color="blue">
          <a />
        </Badge>
        <Badge count={5} color="#08c">
          <a />
        </Badge>
      </div>,
    );
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.find(Badge).at(0).find('.ant-scroll-number-only-unit').text()).toBe('5');
    expect(wrapper.find(Badge).at(1).find('.ant-scroll-number-only-unit').text()).toBe('5');
    expect(wrapper.find(Badge).at(2).find('.ant-scroll-number-only-unit').text()).toBe('5');
  });

  it('Badge should work when status/color is empty string', () => {
    const wrapper = mount(
      <>
        <Badge color="" text="text" />
        <Badge status="" text="text" />
      </>,
    );

    expect(wrapper.find('.ant-badge')).toHaveLength(2);
  });
});
