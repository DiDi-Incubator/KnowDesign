export interface IRes {
  //与后端约定的格式
  code: number;
  message: string;
  data: any;
}

interface IInitHeader extends RequestInit {
  body?: BodyInit | null | any;
}

export interface IReq {
  url: string;
  body?: BodyInit | null | any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  requestInit?: RequestInit;
}

const checkStatus = (res: Response) => {
  // 处理状态码
  // if (res.status === 401) {
  //   window.location.href = "/login";
  // }

  // if (res.status === 405 || res.status === 403) {
  //   location.href = "/403";
  // }

  if (res.status === 404) {
    new Error("code: 404, 接口不存在");
  }

  return res;
};

const addCustomHeader = (init?: IInitHeader) => {
  // 自定义添加头部信息
  init = init || {};
  init.headers = Object.assign(init?.headers || {}, {
    // 这里添加项目固定请求头信息
    // 'X-SSO-USER': 'admin',
  });
  return init;
};

// 用于取消请求
export let controller = new AbortController();

export default function MyFetch(req: IReq) {
  let { url, body, method, requestInit: init } = req;
  if (!init) init = {};

  // if (!init.credentials) init.credentials = "include"; // 默认same-origin，include不管同源请求，还是跨域请求，一律发送 Cookie。
  if (body && typeof body === "object") init.body = JSON.stringify(body); // 转化JSON 字符串
  if (method) init.method = method; // 使用传入请求方法， 不传则GET
  if (body && !method) init.method = "POST"; // 兼容, 存在body忘传method，默认请求方法POST
  if (init.method) init.method = init.method.toUpperCase(); // 兼容，字符串转换为大写

  if (["POST", "PUT", "DELETE"].includes(init.method || "")) {
    // 提交JSON数据， 默认值是'text/plain;charset=UTF-8'
    init.headers = Object.assign(
      {},
      init.headers || {
        "Content-Type": "application/json",
      }
    );
  }

  init = addCustomHeader(init);
  controller = new AbortController(); // 每次需要新的controller，要不然取消请求后再次请求将报错
  init = { ...init, signal: controller.signal };
  return window
    .fetch(url, init)
    .then((res) => checkStatus(res)) //检验响应码
    .then((res) => res.json())
    .catch((err) => new Error(`请求失败！url: ${url} err: ${err}`));
}

export function formFetch(req: IReq) {
  let { url, requestInit: init } = req;
  // 表单fetch，用于上传文件等
  if (!init) init = {};

  init = addCustomHeader(init);
  return window
    .fetch(url, init)
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch((err) => new Error(`请求失败！url: ${url} err: ${err}`));
}
