import Axios from 'axios';
import { notification } from 'knowdesign';
import { RequestInit } from '../type';
// 根据环境配置地址
// TODO: 确认地址前缀
let baseURL = '';

// 创建axios实例
const service = Axios.create({
  timeout: 10000,
  baseURL,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 请求头统一处理
    config.headers = Object.assign(
      {},
      { 'Content-Type': 'application/json;charset=UTF-8' },
      config.headers,
    );
    return config;
  },
  (err) => {
    return err;
  },
);

// 响应拦截
service.interceptors.response.use(
  (info) => {
    const config: RequestInit = info.config;
    const res = info.data;

    if (!config?.init?.needCode || !res.hasOwnProperty('code')) {
      return res;
    } else {
      if (res?.code !== 0 && res?.code !== 200) {
        if (!config?.init?.errorNoTips) {
          notification.error({
            message: '错误',
            duration: config?.init?.needDuration ? null : 3,
            description: res?.message || '服务错误，请重试！',
          });
        }
        throw res;
      }
      return res;
    }
  },
  (err) => {
    const config = err.config;
    if (!config || !config.retryTimes) return dealResponse(err);
    const { __retryCount = 0, retryDelay = 300, retryTimes } = config;
    config.__retryCount = __retryCount;
    if (__retryCount >= retryTimes) {
      return dealResponse(err);
    }
    config.__retryCount++;
    const delay = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, retryDelay);
    });
    // 重新发起请求
    return delay.then(function () {
      return service(config);
    });
  },
);

const dealResponse = (error: any) => {
  switch (error.response.status) {
    case 401:
      notification.error({ message: '无权限访问' });
      break;
    case 403:
      location.href = '/403';
      break;
    case 405:
      notification.error({
        message: '错误',
        duration: 3,
        description: `${error.response.data.message || '请求方式错误'}`,
      });
      break;
    case 500:
      notification.error({
        message: '错误',
        duration: 3,
        description: '服务错误，请重试！',
      });
      break;
    case 502:
      notification.error({
        message: '错误',
        duration: 3,
        description: '网络错误，请重试！',
      });
      break;
    default:
      notification.error({
        message: '连接出错',
        duration: 3,
        description: `${error.response.status}`,
      });
  }
  return Promise.reject(error);
};

export default service;
