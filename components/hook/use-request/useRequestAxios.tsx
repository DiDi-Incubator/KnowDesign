import { useState, useEffect, useRef } from "react";
import { debounce, DebouncedFunc, throttle } from "lodash";
import * as axios from '../../utils/request';
import { RequestInit }  from '../../utils/type';

const { request: reqGet, post: reqPost, formPost, filePost, put: reqPut, delete: reqDelete } = axios;

export interface Options<TData, TParams extends any[]> {
  manual?: boolean; // 如果设置为 true，则需要手动发送请求即手动调用run
  onSuccess?: (data: TData) => void; // 成功触发
  onError?: (e: Error) => void; // 失败触发
  onFinally?: (data: TData) => void; // 执行完成触发
  debounceWait?: number; // 防抖等待时间, 单位为毫秒，设置后，进入防抖模式
  throttleWait?: number; // 节流等待时间, 单位为毫秒，设置后，进入节流模式
}

export interface IParams {
  url?: string,
  data?: any;
  config?: RequestInit
}

export interface IReq {
  body: {
    url: string,
    data?: any;
    config?: RequestInit
  },
  type?: 'get' | 'post' | 'put' | 'formPost' | 'filePost' | 'delete',
}

function useRequest<TData, TParams extends any[]>(
  req: IReq,
  options?: Options<TData, TParams>
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const {
    onFinally,
    onSuccess,
    onError,
    manual = false,
    debounceWait,
    throttleWait,
  } = options || {};

  const debouncedRef = useRef<DebouncedFunc<any>>();
  const throttleRef = useRef<DebouncedFunc<any>>();

  useEffect(() => {
    if (!manual) service();
  }, []);

  useEffect(() => {
    if (debounceWait) {
      debouncedRef.current = debounce((query: IReq) => {
        request(query);
      }, debounceWait);

      return () => {
        debouncedRef.current?.cancel();
      };
    }
  }, [debounceWait]);

  useEffect(() => {
    if (throttleWait) {
      throttleRef.current = throttle((query: IReq) => {
        request(query);
      }, throttleWait);

      return () => {
        throttleRef.current?.cancel();
      };
    }
  }, [throttleWait]);

  const request = (query: IReq) => {
    const { type  } = req;
    let p;
    switch (type) {
      case 'post':
        p = reqPost
        break;
      case 'put':
        p = reqPut
        break;
      case 'formPost':
        p = formPost
        break;
      case 'filePost':
        p = filePost
        break;
      case 'delete':
        p = reqDelete
        break;
      default:
        p = reqGet
        break;
    }
    const {url, data, config} = query.body;
    if (type === 'post' || type === 'put' || type === 'formPost' || type === 'filePost') {
      p(url, data, config)
      .then((res) => {
        setData(res);
        onSuccess && onSuccess(res);
      })
      .finally(() => {
        setLoading(false);
        onFinally && onFinally(data);
      })
      .catch(onError);
    } else {
      p(url, config)
      .then((res) => {
        setData(res);
        onSuccess && onSuccess(res);
      })
      .finally(() => {
        setLoading(false);
        onFinally && onFinally(data);
      })
      .catch(onError);
    }
  };

  const service = (params?: IParams) => {
    if (params?.url) req.body.url = params.url;
    if (params?.data) req.body.data = params.data;

    setLoading(true);
    if (debounceWait) return debouncedRef.current && debouncedRef.current(req);
    if (throttleWait) return throttleRef.current && throttleRef.current(req);
    request(req);
  };

  const run = (params?: IParams) => {
    service(params);
  };

  const cancel = () => {
    console.log('未实现')
    // controller.abort();
    // return controller.signal?.aborted;
  };

  return {
    loading,
    data,
    run,
    cancel,
  };
}

export default useRequest;
