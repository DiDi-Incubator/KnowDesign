import React from 'react';
import { render, mount } from 'enzyme';
import Spin from '..';
import mountTest from '../../../../tests/shared/mountTest';
import rtlTest from '../../../../tests/shared/rtlTest';

describe('Spin', () => {
  mountTest(Spin);
  rtlTest(Spin);

  it('should only affect the spin element when set style to a nested <Spin>xx</Spin>', () => {
    const wrapper = mount(
      <Spin style={{ background: 'red' }}>
        <div>content</div>
      </Spin>,
    );
    expect(wrapper.find('.dcloud-spin-nested-loading').at(0).prop('style')).toBeFalsy();
    expect(wrapper.find('.dcloud-spin').at(0).prop('style').background).toBe('red');
  });

  it("should render custom indicator when it's set", () => {
    const customIndicator = <div className="custom-indicator" />;
    const wrapper = render(<Spin indicator={customIndicator} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be controlled by spinning', () => {
    const wrapper = mount(<Spin spinning={false} />);
    expect(wrapper.instance().state.spinning).toBe(false);
    wrapper.setProps({ spinning: true });
    expect(wrapper.instance().state.spinning).toBe(true);
  });

  it('if indicator set null should not be render default indicator', () => {
    const wrapper = mount(<Spin indicator={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support static method Spin.setDefaultIndicator', () => {
    Spin.setDefaultIndicator(<em className="custom-spinner" />);
    const wrapper = mount(<Spin />);
    expect(wrapper).toMatchSnapshot();
    Spin.setDefaultIndicator(null);
  });

  it('should render 0', () => {
    const wrapper = mount(<Spin>{0}</Spin>);
    expect(wrapper.find('.dcloud-spin-container').at(0).text()).toBe('0');
  });
});
