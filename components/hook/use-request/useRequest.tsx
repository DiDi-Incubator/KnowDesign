import { useState, useEffect, useRef } from "react";
import MyFetch, { formFetch, controller, IReq } from "./fetch";
import { debounce, DebouncedFunc, throttle } from "lodash";

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
  body?: BodyInit | null | any;
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
    MyFetch(query)
      .then((res) => {
        setData(res);
        onSuccess && onSuccess(res);
      })
      .finally(() => {
        setLoading(false);
        onFinally && onFinally(data);
      })
      .catch(onError);
  };

  const service = (params?: IParams) => {
    if (params?.url) req.url = params.url;
    if (params?.body) req.body = params.body;

    setLoading(true);
    if (debounceWait) return debouncedRef.current && debouncedRef.current(req);
    if (throttleWait) return throttleRef.current && throttleRef.current(req);
    request(req);
  };

  const run = (params?: IParams) => {
    service(params);
  };

  const cancel = () => {
    controller.abort();
    return controller.signal?.aborted;
  };

  return {
    loading,
    data,
    run,
    cancel,
  };
}

export default useRequest;
