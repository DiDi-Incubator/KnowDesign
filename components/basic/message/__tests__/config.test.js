import { sleep } from '../../../../tests/utils';
import message, { getInstance } from '..';
import ConfigProvider from '../../config-provider';

describe('message.config', () => {
  // Mock for rc-util raf
  window.requestAnimationFrame = callback => window.setTimeout(callback, 16);
  window.cancelAnimationFrame = id => {
    window.clearTimeout(id);
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    message.destroy();
    jest.useRealTimers();
  });

  it('should be able to config top', () => {
    message.config({
      top: 100,
    });
    message.info('whatever');
    expect(document.querySelectorAll('.dcloud-message')[0].style.top).toBe('100px');
  });

  it('should be able to config rtl', () => {
    message.config({
      rtl: true,
    });
    message.info('whatever');
    expect(document.querySelectorAll('.dcloud-message-rtl').length).toBe(1);
  });

  it('should be able to config getContainer', () => {
    message.config({
      getContainer: () => {
        const div = document.createElement('div');
        div.className = 'custom-container';
        document.body.appendChild(div);
        return div;
      },
    });
    message.info('whatever');
    expect(document.querySelectorAll('.custom-container').length).toBe(1);
  });

  it('should be able to config maxCount', () => {
    message.config({
      maxCount: 5,
    });
    for (let i = 0; i < 10; i += 1) {
      message.info('test');
    }

    message.info('last');
    expect(document.querySelectorAll('.dcloud-message-notice').length).toBe(5);
    expect(document.querySelectorAll('.dcloud-message-notice')[4].textContent).toBe('last');
    jest.runAllTimers();
    expect(getInstance().component.state.notices).toHaveLength(0);
  });

  it('should be able to config duration', async () => {
    jest.useRealTimers();
    message.config({
      duration: 0.5,
    });
    message.info('last');
    expect(getInstance().component.state.notices).toHaveLength(1);

    await sleep(1000);
    expect(getInstance().component.state.notices).toHaveLength(0);
    message.config({
      duration: 3,
    });
  });

  it('customize prefix should auto get transition prefixCls', () => {
    message.config({
      prefixCls: 'light-message',
    });

    message.info('bamboo');

    expect(getInstance().config).toEqual(
      expect.objectContaining({
        transitionName: 'light-move-up',
      }),
    );

    message.config({
      prefixCls: '',
    });
  });

  it('should be able to global config rootPrefixCls', () => {
    ConfigProvider.config({ prefixCls: 'prefix-test', iconPrefixCls: 'bamboo' });
    message.info('last');
    expect(document.querySelectorAll('.dcloud-message-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-message-notice')).toHaveLength(1);
    expect(document.querySelectorAll('.prefix-test-message-info')).toHaveLength(1);
    ConfigProvider.config({ prefixCls: 'dcloud', iconPrefixCls: null });
  });
  it('should be able to config prefixCls', () => {
    message.config({
      prefixCls: 'prefix-test',
    });
    message.info('last');
    expect(document.querySelectorAll('.dcloud-message-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-notice')).toHaveLength(1);
    message.config({
      prefixCls: '', // can be set to empty, dcloud default value is set in ConfigProvider
    });
  });

  it('should be able to config transitionName', () => {
    message.config({
      transitionName: '',
    });
    message.info('last');
    expect(document.querySelectorAll('.dcloud-move-up-enter')).toHaveLength(0);
    message.config({
      transitionName: 'dcloud-move-up',
    });
  });
});
