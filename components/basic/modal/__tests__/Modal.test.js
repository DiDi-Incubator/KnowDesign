import React from 'react';
import { mount } from 'enzyme';
import Modal from '..';
import Button from '../../button';
import mountTest from '../../../../tests/shared/mountTest';
import rtlTest from '../../../../tests/shared/rtlTest';

jest.mock('rc-util/lib/Portal');

class ModalTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    this.setState({ visible: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  saveContainer = container => {
    this.container = container;
  };

  getContainer = () => this.container;

  render() {
    const { visible } = this.state;
    return (
      <div>
        <div ref={this.saveContainer} />
        <Modal {...this.props} visible={visible} getContainer={this.getContainer}>
          Here is content of Modal
        </Modal>
      </div>
    );
  }
}

describe('Modal', () => {
  mountTest(Modal);
  rtlTest(Modal);

  it('render correctly', () => {
    const wrapper = mount(<ModalTester />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render without footer', () => {
    const wrapper = mount(<ModalTester footer={null} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('onCancel should be called', () => {
    const onCancel = jest.fn();
    const wrapper = mount(<Modal visible onCancel={onCancel} />);
    wrapper.find('.dcloud-btn').first().simulate('click');
    expect(onCancel).toHaveBeenCalled();
  });

  it('onOk should be called', () => {
    const onOk = jest.fn();
    const wrapper = mount(<Modal visible onOk={onOk} />);
    wrapper.find('.dcloud-btn').last().simulate('click');
    expect(onOk).toHaveBeenCalled();
  });

  it('support closeIcon', () => {
    const wrapper = mount(<Modal closeIcon={<a>closeIcon</a>} visible />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('danger type', () => {
    const wrapper = mount(<Modal okType="danger" visible />);
    expect(wrapper.find(Button).last().props().danger).toBeTruthy();
  });
});
