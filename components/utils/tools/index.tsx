import moment from 'moment';
import queryString from 'query-string';
import { cloneDeep } from 'lodash';
import { useRef, useCallback, useEffect } from 'react';
import { IMap, ICookie, IDuration, IOffset, ITime } from '../type';
import { enc as cryptoEnc, AES as cryptoAES, mode as cryptoMode, pad as cryptoPad } from 'crypto-js';

/**
 * @method formatDate 根据自定的format格式转换时间的格式
 * @export
 * @param {string | number} data 需要转换格式的时间戳数据 (type : string | number)
 * @param {string} format 转换时间的格式,比如 "YYYY-MM-DD"
 * @return {string}
 */
export function formatDate(date: string | number, format: string) {
  return moment(date).format(format);
}

/**
 *
 *
 * @export
 * @param {(string | number)} value 要处理的值
 * @param {ITime} sourceType 原始类型
 * @param {ITime} targetType 目标类型
 * @return {*}  {*}
 */
export function formatTimeValueByType(value: string | number, sourceType: ITime, targetType: ITime): any {
  const actions = new Map([
    ['ns_ms', (): any => ((value as number) / 1000000).toFixed()], // 纳秒转毫秒  /1000000
    ['ns_s', () => ((value as number) / 1000000000).toFixed()], // 纳秒转秒    /1000000000
    ['ns_date', () => formatDate(value, "YYYY-MM-DD HH:mm:ss")], // 纳秒转日期时间 moment(value).format("YYYY-MM-DD HH:mm:ss")
    ['ms_s', () => ((value as number) / 1000).toFixed()], // 毫秒转秒    /1000
    ['ms_ns', () => ((value as number) * 1000000).toFixed()], // 毫秒转纳秒 * 1000000
    ['ms_date', () => formatDate(value, "YYYY-MM-DD HH:mm:ss")], // 毫秒转日期时间 moment(value).format("YYYY-MM-DD HH:mm:ss")
    ['s_ms', () => ((value as number) * 1000).toFixed()], // 秒转毫秒 * 1000
    ['s_ns', () => ((value as number) * 1000000000).toFixed()], // 秒转纳秒 * 1000000000
    ['s_date', () => formatDate(value, "YYYY-MM-DD HH:mm:ss")], // 秒转日期时间 moment(value).format("YYYY-MM-DD HH:mm:ss")
    ['date_s', () => formatDate(value, "X")], // 日期时间转秒  moment("2021-01-22 22:22:22").format("X")
    ['date_ms', () => formatDate(value, "x")], // 日期时间转毫秒 moment("2021-01-22 22:22:22").format("x")
    ['date_ns', () => Number(formatDate(value, "x")) * 1000000], // 日期时间转纳秒
  ]);
  return actions.get(`${sourceType}_${targetType}`).call(this);
};

/**
 * 根据长度截取先使用字符串，超长部分追加…
 *
 * @export 
 * @param {string} str  对象字符串
 * @param {number} len 目标字节长度
 * @return {*}  {string} 处理结果字符串
 */
export function cutString(str: string, len: number): string {
  //length属性读出来的汉字长度为1
  if (str.length * 2 <= len) {
    return str;
  }

  let strlen = 0;
  let s = '';

  for (let i = 0; i < str.length; i++) {
    s = s + str.charAt(i);
    if (str.charCodeAt(i) > 128) {
      strlen = strlen + 2;
      if (strlen >= len) {
        return s.substring(0, s.length - 1) + '...';
      }
    } else {
      strlen = strlen + 1;
      if (strlen >= len) {
        return s.substring(0, s.length - 2) + '...';
      }
    }
  }
  return s;
};

/**
 * @method formatUrl 处理Url
 * @export
 * @param {string} url 需要处理的url，比如 /deploy/order/:id
 * @param {object} params 需要处理的参数 ，比如 {id: 123}
 * @param {object} query 需要处理的参数 ，比如 {id: 123}
 * @return { url:string } 返回 （/deploy/order/123）
 */
export function formatUrl({ url, params, query }: { url: string; params?: object; query?: object }): string {
  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      const regex = new RegExp(`:${paramKey}`, 'i'); // 验证规则，不区分大小写（/i）
      url = url.replace(regex, paramValue); // 如果匹配到对应的就替换掉
    });
  }

  if (query) {
    url = `${url}?${queryString.stringify(query)}`; // 序列化传入的query
  }

  return url;
}

/**
 * @method getCookie 获取本地Cookie
 * @export
 * @param {string} key 获取本地cookie对应的key
 * @return {string}
 */
export const getCookie = (key: string): string => {
  const map: IMap = {};
  document.cookie.split(';').map((kv) => {
    const d = kv.trim().split('=');
    map[d[0]] = d[1];
    return null;
  });
  return map[key];
};

/**
 * @method setCookie 设置本地Cookie
 * @export
 * @param {ICookie} cData 设置本地Cookie需要的参数
 */
export const setCookie = (cData: ICookie[]) => {
  const date = new Date();
  cData.forEach((ele) => {
    date.setTime(date.getTime() + (ele?.time ?? 0) * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + ele.expires || date.toUTCString();
    document.cookie = ele.key + '=' + ele.value + '; ' + expires + '; path=/';
  });
};

/**
 * @method deleteCookie 删除本地Cookie
 * @export
 * @param {string[]} cData 本地Cookie的key组成的数组
 */
export const deleteCookie = (cData: string[]) => {
  setCookie(cData.map((i) => ({ key: i, value: '', time: -1 })));
};

export const setLocalStorage = (key, value, days = 30) => {
  // 设置过期原则
  if (!value) {
    localStorage.removeItem(key)
  } else {
    // let exp = new Date();
    localStorage.setItem(key, JSON.stringify({
      value,
      expires: Date.now() + days * 24 * 60 * 60 * 1000
    }))
  }
}

export const getLocalStorage = (key, cb?) => {
  try {
    let storage = JSON.parse(localStorage.getItem(key))
    if (storage && storage.expires > Date.now()) {
      return storage.value
    } else {
      return false
    }
  } catch (e) {
    // 兼容其他localstorage
    // console.log(e, 'localStorage[key]')
    return localStorage[key]
  } finally {
  }
}

/**
 * @method uuid 获取一个以字符串开头拼接0~1随机数小数点以后数字的字符串
 * @export
 * @return {string}
 */
export const uuid = (): string => {
  return 'c' + `${Math.random()}`.slice(2);
};

/**
 * @method getRandompwd 获取指定长度的随机密码
 * @export
 * @param {number} len 需要传入想要获取随机密码的长度（非毕传，如未传则获取一个5位的随机数）
 * @return {string | number}
 */
export const getRandompwd = (len?: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if (len) {
    let res = '';
    for (let i = 0; i < len; i++) {
      const id = Math.ceil(Math.random() * 62);
      res += chars[id];
    }
    return res;
  }
  return Math.ceil(Math.random() * 100000);
};

/**
 * @method handleTabKey 用于AntD-Tabs组件的onChange事件，切换hash值达到更换Tabs组件的key
 * @export
 * @param {string} key
 */
export const handleTabKey = (key: string) => {
  window.location.hash = key;
};

/**
 * @method copyContentFnc copy文本内容函数
 * @export
 * @param {string} content 要复制的文本内容
 */
export const copyContentFn = (content: string) => {
  const input = document.createElement('textarea'); // 动态创建 textarea 元素
  input.value = content; // 获得需要复制的内容
  document.body.appendChild(input); // 添加到 DOM 元素中
  // 执行选中
  // 注意: 只有 input 和 textarea 可以执行 select() 方法.
  input.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  //oInput.style.display='none';
  document.body.removeChild(input); // 将 textarea 元素移除
};

/**
 * @method useDebounce 应用于hook的防抖函数
 * @param {() => void} fn 需要处理的函数
 * @param {number} delay 函数出发的时间
 * @param dep 传入空数组，保证useCallback永远返回同一个函数
 */
export const useDebounce = (fn: () => void, delay: number, dep = []) => {
  const { current } = useRef<any>({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn(...args);
    }, delay);
  }, dep);
};

/**
 * @method firstCharUppercase 首字母大写转换
 * @param {string} str 需要转换的英文字符串
 */
export const firstCharUppercase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * @method transTBToB 将GB字节单位转换为比特字节单位
 * @param {number} value 需要转换的数值
 */
export const transTBToB = (value: number) => {
  const val = (value && value * TB) || '';
  return Number(val);
};

/**
 * @method transGBToB 将GB字节单位转换为比特字节单位
 * @param {number} value 需要转换的数值
 */
export const transGBToB = (value: number) => {
  const val = (value && value * GB) || '';
  return Number(val);
};

/**
 * @method transMBToB 将兆字节单位转换为比特字节单位
 * @param {number} value 需要转换的数值
 */
export const transMBToB = (value: number) => {
  const val = (value && value * MB) || '';
  return Number(val);
};

/**
 * @method transKBToB 将KB字节单位转换为比特字节单位
 * @param {number} value 需要转换的数值
 */
export const transKBToB = (value: number) => {
  const val = (value && value * KB) || '';
  return Number(val);
};

/**
 * @method transBToMB 将比特字节单位转换成兆字节单位
 * @param {number} value 需要转换的数值
 */
export const transBToMB = (value: number) => {
  if (value === null) return '';

  const val = Number.isInteger(value / 1024 / 1024) ? value / 1024 / 1024 : (value / 1024 / 1024).toFixed(2);
  return Number(val);
};

/**
 * @method transBToGB 将比特字节单位转换成千兆字节单位
 * @param {number} value 需要转换的数值
 */
export const transBToGB = (value: number) => {
  if (value === null) return '';

  const val = Number.isInteger(value / 1024 / 1024 / 1024) ? value / 1024 / 1024 / 1024 : (value / 1024 / 1024 / 1024).toFixed(2);
  return Number(val);
};
/**
 * @method formatFlowUnit 格式化流量单位
 * @param {number} num 需要格式化的流量
 */
export const formatFlowUnit = (num: number) => {
  if (!num) return '';
  if (num > 1024 * 1024 * 1024) {
    return `${(num / 1024 / 1024 / 1024).toFixed(2)}GB/s`;
  }
  if (num > 1024 * 1024) {
    return `${(num / 1024 / 1024).toFixed(2)}MB/s`;
  }
  if (num > 1024) {
    return `${(num / 1024).toFixed(2)}KB/s`;
  }
  return `${num.toFixed(2)}B/s`;
};

/**
 * @method transHourToMSecond 将小时单位转换成时间戳单位
 * @param {number} value 需要转换的数值
 */
export const transHourToMSecond = (value: number) => {
  const time = (value && value * 1000 * 60 * 60) || '';
  return Number(time);
};

/**
 * @method transMSecondToHour 将时间戳单位转换成小时单位
 * @param {number} value 需要转换的数值
 */
export const transMSecondToHour = (value: number) => {
  if (value === null) return '';

  const time = Number.isInteger(value / 1000 / 60 / 60) ? value / 1000 / 60 / 60 : (value / 1000 / 60 / 60).toFixed(2);
  return Number(time);
};

/**
 * @method transUnitTime 将时间数字换算成对应时间
 * @param {number} ms 需要转换的数字
 */
export const transUnitTime = (ms: number) => {
  if (!ms) return '';

  if (ms < 1000) {
    return `${ms}ms`;
  }
  if (ms >= 1000 && ms < 60000) {
    return `${ms / 1000}s`;
  }
  if (ms >= 60000 && ms < 3600000) {
    return `${(ms / 1000 / 60).toFixed(2)}min`;
  }
  if (ms >= 3600000 && ms < 86400000) {
    return `${(ms / 1000 / 60 / 60).toFixed(2)}h`;
  }
  return `${(ms / 1000 / 60 / 60 / 24).toFixed(2)}d`;
};

/**
 * @method IsNotNaN 判断是否为数字
 * @param value 需要判断的参数
 */
export const IsNotNaN = (value: any) => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * @method fixedPointNumber 将数字转换成保留指定小数点后几位的浮点数
 * @param {number} num 需要转换的数字
 * @param {number = 2} bit 指定保留小数点后几位（默认为2位）
 */
export const fixedPointNumber = (num: number, bit = 2) => {
  if (num === 0) return 0;
  if (!num) return num;
  return num.toFixed(bit);
};

const KB = 1024;
const MB = KB * KB;
const GB = MB * KB;
const TB = GB * KB;

/**
 * @method formatSize 格式化存储单位
 * @param {number} size 需要格式化的比特单位
 * @param {number} fix 指定保留小数点后几位 （默认为1）
 */
export const formatSize = (size: number, fix = 1) => {
  if (size === undefined || size === null) return '';
  if (size < KB) return `${size.toFixed(fix)}B`;
  if (size < MB) return `${(size / KB).toFixed(fix)}KB`;
  if (size < GB) return `${(size / MB).toFixed(fix)}MB`;
  if (size < TB) return `${(size / GB).toFixed(fix)}GB`;
  return `${(size / TB).toFixed(fix)}TB`;
};

export const second = 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 24;

/**
 * @method formatDuration 格式化持续时间返回对应时间字符串
 * @param {number} duration 需要格式化的毫秒值
 * @param {number} fix 指定保留小数点后几位（默认为1）
 */
export const formatDuration = (duration: number, fix = 1) => {
  if (duration === undefined || duration === null) return '';
  if (duration < second) return `${duration}ms`;
  if (duration < minute) return `${(duration / second).toFixed(fix)}s`;
  if (duration < hour) return `${(duration / minute).toFixed(fix)}min`;
  if (duration < day) return `${(duration / hour).toFixed(fix)}h`;
  return `${(duration / day).toFixed(fix)}day`;
};

/**
 * @method renderDuration 渲染持续时间 返回为字符串 格式为："20day 12h 12min 21s"
 * @param {IDuration} duration 需要渲染的时间对象
 */
export const renderDuration = (duration: IDuration) => {
  if (!duration) return null;
  let res = '';
  if (duration.days) res += `${duration.days}day `;
  if (duration.hours) res += `${duration.hours}h `;
  if (duration.minutes) res += `${duration.minutes}min `;
  if (duration.seconds) res += `${duration.seconds}s`;
  return res;
};

/**
 * @method formatOffset 格式重置
 * @param {IOffset} offset 需要重置的对象
 * @returns {string} 返回符合条件的 ’年 月 周 天 小时‘ 字符串
 */
export const formatOffset = (offset: IOffset) => {
  if (!offset) return '';
  const year = offset.year ? `${offset.year} ` : '';
  const month = offset.month ? `${offset.month} ` : '';
  const week = offset.week ? `${offset.week} ` : '';
  const day = offset.day ? `${offset.day} ` : '';
  const hour = offset.hour ? `${offset.hour} ` : '';
  return `${year}${month}${week}${day}${hour}`;
};

/**
 * 接受一个数组包对象，将数组中符合条件的元素转换成JSON格式，并向该元素中添加唯一Key
 * @method turnObjectToJson 将符合条件的对象转换成JSON格式
 * @param {Array<{[key:string]:any}>} originData 需要转换的数组
 */
export const turnObjectToJson = (originData: Array<{ [key: string]: any }>) => {
  return (cloneDeep(originData) || []).map((c) => {
    (Object.keys(c) || []).forEach((k) => {
      const value = typeof c[k] === 'object' ? JSON.stringify(c[k]) : c[k];
      c[k] = value === '{}' ? '' : value || '';
    });
    c.key = uuid();
    return c;
  });
};

/**
 * @method handleAsyncFun 处理异步请求函数(async函数)
 * @param fn 需要请求的函数
 * @param errCb 请求失败的函数（非毕传参数）
 * @returns 返回的resource
 */
export const handleAsyncFun = async (fn: any, errCb?: any) => {
  try {
    const data = await fn();
    return data;
  } catch (err) {
    errCb && errCb();
  }
};

/**
 * @method injectUnmount 解决组件卸载后调用setState会报错，造成内存泄漏的问题（在页面引入这段代码就行）
 * @param {any} target
 */
export function injectUnmount(target: any) {
  // 改装componentWillUnmount，销毁的时候记录一下
  const next = target.prototype.componentWillUnmount;
  target.prototype.componentWillUnmount = function () {
    if (next) next.call(this, ...Array.prototype.slice.call(arguments));
    this.unmount = true; // 表示已加载
  };

  // 对setState的改装，setState查看目前是否已经销毁
  const setState = target.prototype.setState;
  target.prototype.setState = function () {
    if (this.unmount) return; // 已经卸载的话就不执行
    setState.call(this, ...Array.prototype.slice.call(arguments));
  };
}

export const defaultPageSizeOptions = ['10', '30', '50', '100', '300', '500', '1000'];

export const getPaginationOptions = (onShowSizeChange?: (size: number) => void) => {
  const _defaultPageSize = 20;
  const defaultPageSize = _defaultPageSize ? Number(_defaultPageSize) : undefined;
  return {
    pageSize: defaultPageSize,
    showSizeChanger: true,
    pageSizeOptions: defaultPageSizeOptions,
    onShowSizeChange: (_current: any, size: number) => {
      if (onShowSizeChange) onShowSizeChange(size);
    },
  };
};

export function fetchManifest(url: string, publicPath: string) {
  return fetch(url).then(res => res.text()).then((data) => {
    if (data) {
      const manifest = data.match(/<meta name="manifest" content="([\w|\d|-]+.json)">/);
      let result = '';
      if (publicPath && manifest) {
        result = `${publicPath}${manifest[1]}`;
      }
      return result;
    }
    return '';
  });
}

export async function getPathBySuffix(systemConf: any, jsonData: any, suffix: string) {
  let targetPath = '';
  Object.values(jsonData.assetsByChunkName).forEach((assetsArr) => {
    if (typeof assetsArr === 'string') {
      targetPath = assetsArr;
    }
    if (Array.isArray(assetsArr)) {
      targetPath = assetsArr.find((assetStr) => {
        const assetsSuffix = assetStr.match(/\.[^\.]+$/) ? assetStr.match(/\.[^\.]+$/)[0] : '';
        return assetsSuffix === suffix;
      });
    }
  });
  if (process.env.NODE_ENV === 'development') {
    return `${systemConf[process.env.NODE_ENV].publicPath}${targetPath}`;
  }
  return `${systemConf[process.env.NODE_ENV as any].publicPath}${targetPath}`;
}

export function createStylesheetLink(ident: string, path: string) {
  const headEle = document.getElementsByTagName('head')[0];
  const linkEle = document.createElement('link');
  linkEle.id = `${ident}-stylesheet`;
  linkEle.rel = 'stylesheet';
  linkEle.href = path;
  headEle.append(linkEle);
}


export function parseJSON(json: string) {
  if (typeof json === 'string') {
    let paresed;
    try {
      paresed = JSON.parse(json);
    } catch (e) {
      console.log(e);
    }
    return paresed;
  }
  return undefined;
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function prefixFieldKey(name, prefix = '') {
  if (!prefix) {
    return name;
  } else {
    name = name.replace(name[0], name[0].toUpperCase());
    return `${prefix}${name}`;
  }
}

// export function processBasicFormItemsData(values) {
//   const result = {};
//   Object.entries(values).forEach(([formKey, formValue]) => {
//     if (Array.isArray(formValue)) {
//       formValue = formValue.filter((e) => !!e);
//     }
//     result[formKey] = formValue;
//   });
//   return result;
// }

export function processBasicFormItemsData(values) {
  let arr = [];
  let result = [];
  let defaultName;
  let resultList = {};
  let MaxLength;
  let arrLength = [];
  for (let i in values) {
    let obj = {};
    obj[i] = values[i];
    arr.push(obj);
  };

  arr.map((item, index) => {
    defaultName = Object.keys(item)[0].split('[');
    arrLength.push(defaultName[2].split(']')[0]);
    MaxLength = arrLength[0];
    for (let i = 1; i < arrLength.length; i++) {
      MaxLength = Math.max(MaxLength, arrLength[i]);
    }
    result.push(Object.values(item)[0])
    return result;
  });
  resultList[defaultName[0]] = chunk(result, MaxLength + 1);
  return resultList;
}

const chunk = (array, size) => {
  const length = array.length;
  let index = 0;
  let resIndex = 0;
  let result = new Array(Math.ceil(length / size));
  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result;
}

export const isClient = typeof window === 'object';

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

/**
 * @method formatAssignSize 格式化指定存储单位
 * @param {number} size 需要格式化的比特单位
 * @param {string} target 需要转换的格式
 * @param {number} fix 指定保留小数点后几位 （默认为2）
 */
export const formatAssignSize = (size: number, target: string, fix = 2) => {
  if (size === undefined || size === null) return '';
  if (target === undefined || target === null) return size;
  if (target === 'KB') return `${(size / KB).toFixed(fix)}`;
  if (target === 'MB') return `${(size / MB).toFixed(fix)}`;
  if (target === 'GB') return `${(size / GB).toFixed(fix)}`;

  return `${(size / TB).toFixed(fix)}`;
};

/**
 * @method formatAssignUnit 格式化指定存储单位
 * @param {number} size 需要格式化的比特单位
 * @param {number} size 需要转换的格式
 * @param {number} fix 指定保留小数点后几位 （默认为2）
 */
export const formatAssignUnit = (size: number, target: string, fix = 2) => {
  if (size === undefined || size === null) return '';
  if (target === undefined || target === null) return size;
  if (target === 'KB') return `${(transKBToB(size))}}`;
  if (target === 'MB') return `${(transMBToB(size))}`;
  if (target === 'GB') return `${(transGBToB(size))}`;
  return `${(transTBToB(size))}`;
};

export const numberToFixed = (value: number, num = 2) => {
  if (value === null || isNaN(value)) return '-';
  value = Number(value);
  return Number.isInteger(+value) ? +value : (+value).toFixed(num);
};

/**
 * @method getSizeAndUnit 自动格式化存储单位
 * @param {number} value 需要格式化的比特单位
 * @param {number} unitSuffix 指定保留小数点后几位 （默认为2）
 * @return { value:number, unit:string, valueWithUnit:string }// 返回信息
 */
export const getSizeAndUnit = (value: number, unitSuffix = '') => {
  if (value === null || value === undefined || isNaN(+value)) {
    return { value: null, unit: '', valueWithUnit: '-' };
  }

  if (value <= KB) {
    return { value: numberToFixed(value), unit: '' + unitSuffix, valueWithUnit: numberToFixed(value) + '' + unitSuffix };
  }
  if (value > KB && value < MB) {
    return { value: numberToFixed(value / KB), unit: 'K' + unitSuffix, valueWithUnit: numberToFixed(value / KB) + 'K' + unitSuffix };
  }
  if (value >= MB && value < GB) {
    return { value: numberToFixed(value / MB), unit: 'M' + unitSuffix, valueWithUnit: numberToFixed(value / MB) + 'M' + unitSuffix };
  }
  if (value >= GB && value < TB) {
    return { value: numberToFixed(value / GB), unit: 'G' + unitSuffix, valueWithUnit: numberToFixed(value / GB) + 'G' + unitSuffix };
  }
  if (value >= TB) {
    return { value: numberToFixed(value / TB), unit: 'T' + unitSuffix, valueWithUnit: numberToFixed(value / TB) + 'T' + unitSuffix };
  }
};

/**
 * @method transUnitTime 将时间数字换算成对应时间
 * @param {number} ms 需要转换的数字
 * @param {number} num 转换之后需要保留的小数点位数
 * @return { 
 *    {
 *      value:number;  
 *      unit:string;
 *    }
 * }  返回信息，value为转换的单位，unit为转换的单位（字符串）
 */
export const transUnitTimePro = (ms: number, num = 0) => {
  if (!ms) return '';
  if (ms < 1000) {
    return { value: ms.toFixed(num), unit: `ms` };
  }
  if (ms >= 1000 && ms < 60000) {
    return { value: (ms / 1000).toFixed(num), unit: `s` };
  }
  if (ms >= 60000 && ms < 3600000) {
    return { value: (ms / 1000 / 60).toFixed(num), unit: `min` };
  }
  if (ms >= 3600000 && ms < 86400000) {
    return { value: (ms / 1000 / 60 / 60).toFixed(num), unit: `h` };
  }
  return { value: (ms / 1000 / 60 / 60 / 24).toFixed(num), unit: `day` };
};

/**
 * @method encryptAES 加密信息
 * @param {string} info 需要加密的信息
 * @param {string} key 加密用到的 key
 * @return {string} // 返回加密后的结果
 */
export function encryptAES(info: string, key: string) {
  const parsedKey = cryptoEnc.Utf8.parse(key);
  const parsedInfo = cryptoEnc.Utf8.parse(info);
  const encrypted = cryptoAES.encrypt(parsedInfo, parsedKey, {
    mode: cryptoMode.ECB,
    padding: cryptoPad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 * @method decryptAES 解密信息
 * @param {string} info 需要解密的信息
 * @param {string} key 解密用到的 key
 * @return {string} // 返回解密后的结果
 */
export function decryptAES(ciphertext: string, key: string) {
  const parsedKey = cryptoEnc.Utf8.parse(key);
  const decrypted = cryptoAES.decrypt(ciphertext, parsedKey, {
    mode: cryptoMode.ECB,
  });
  return decrypted.toString(cryptoEnc.Utf8);
}
