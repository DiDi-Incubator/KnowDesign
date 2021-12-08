import notification, { getInstance } from '..';
import { sleep } from '../../../tests/utils';

describe('notification.config', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    notification.destroy();
  });

  it('should be able to config maxCount', async () => {
    notification.config({
      maxCount: 5,
      duration: 0.5,
    });

    for (let i = 0; i < 10; i += 1) {
      notification.open({
        message: 'Notification message',
        key: i,
      });
    }

    notification.open({
      message: 'Notification last',
      key: '11',
    });

    await Promise.resolve();

    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(5);
    expect(document.querySelectorAll('.ant-notification-notice')[4].textContent).toBe(
      'Notification last',
    );

    jest.runAllTimers();
    await sleep(500);
    expect((await getInstance('ant-notification-topRight')).component.state.notices).toHaveLength(
      0,
    );
  });
});
