import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import LocaleProvider from '../../locale-provider';
import zhCN from '../../locale/zh_CN';
import enUS from '../../locale/en_US';
import TimePicker from '../../time-picker';
import DatePicker from '../../date-picker';
import { openPicker, selectCell, closePicker } from '../../date-picker/__tests__/utils';
import Pagination from '../../pagination';
import Modal from '../../modal';

describe('ConfigProvider.Locale', () => {
  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  it('not throw', () => {
    mount(
      <ConfigProvider locale={{}}>
        <span />
        <span />
      </ConfigProvider>,
    );
  });

  // https://github.com/ant-design/ant-design/issues/18731
  it('should not reset locale for Modal', () => {
    class App extends React.Component {
      state = {
        showButton: false,
      };

      componentDidMount() {
        this.setState({
          showButton: true,
        });
      }

      // eslint-disable-next-line class-methods-use-this
      openConfirm = () => {
        jest.useFakeTimers();
        Modal.confirm({
          title: 'title',
          content: 'Some descriptions',
        });
        jest.runAllTimers();
        jest.useRealTimers();
      };

      render() {
        return (
          <ConfigProvider locale={zhCN}>
            {this.state.showButton ? (
              <ConfigProvider locale={enUS}>
                <button type="button" onClick={this.openConfirm}>
                  open
                </button>
              </ConfigProvider>
            ) : null}
          </ConfigProvider>
        );
      }
    }

    const wrapper = mount(<App />);
    wrapper.find('button').simulate('click');
    expect($$('.ant-btn-primary')[0].textContent).toBe('OK');
  });

  // https://github.com/ant-design/ant-design/issues/31592
  it('should not reset the component state when switching locale', () => {
    class App extends React.Component {
      state = {
        locale: zhCN,
      };

      render() {
        return (
          <ConfigProvider locale={this.state.locale}>
            <DatePicker />
            <Pagination total={50} />
          </ConfigProvider>
        );
      }
    }

    const wrapper = mount(<App />);

    const datepickerInitProps = wrapper.find('.ant-picker-input input').props();
    expect(datepickerInitProps.value).toBe('');
    expect(datepickerInitProps.placeholder).toBe('请选择日期');
    expect(wrapper.find('.ant-pagination-item-1').props().className).toContain(
      'ant-pagination-item-active',
    );

    openPicker(wrapper);
    selectCell(wrapper, 10);
    closePicker(wrapper);

    expect(wrapper.find('.ant-picker-input input').props().value).not.toBe('');

    wrapper.setState({ locale: {} });
    wrapper.find('.ant-pagination-item-3').simulate('click');

    const datepickerProps = wrapper.find('.ant-picker-input input').props();
    expect(datepickerProps.placeholder).not.toBe('请选择日期');
    expect(datepickerProps.value).not.toBe('');
    expect(datepickerProps.value).toContain('-10');

    expect(wrapper.find('.ant-pagination-item-3').props().className).toContain(
      'ant-pagination-item-active',
    );
  });

  describe('support legacy LocaleProvider', () => {
    function testLocale(wrapper) {
      expect(wrapper.find('input').props().placeholder).toBe(zhCN.TimePicker.placeholder);
    }

    it('LocaleProvider', () => {
      const wrapper = mount(
        <LocaleProvider locale={zhCN}>
          <TimePicker />
        </LocaleProvider>,
      );

      testLocale(wrapper);
    });

    it('LocaleProvider > ConfigProvider', () => {
      const wrapper = mount(
        <LocaleProvider locale={zhCN}>
          <ConfigProvider>
            <TimePicker />
          </ConfigProvider>
        </LocaleProvider>,
      );

      testLocale(wrapper);
    });

    it('ConfigProvider > ConfigProvider', () => {
      const wrapper = mount(
        <ConfigProvider locale={zhCN}>
          <ConfigProvider>
            <TimePicker />
          </ConfigProvider>
        </ConfigProvider>,
      );

      testLocale(wrapper);
    });
  });
});
