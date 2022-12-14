/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { ComponentType, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { dropByCacheKey, useDidCache } from 'react-router-cache-route';

import { routeType } from './index';

export interface routeGuardWrapPropsType {
  Component: ComponentType;
  cacheKey?: string;
  beforeEach?: (props: any) => Promise<boolean>;
  switchCacheRouter?: (props: any) => void;
  afterEmit?: (props: any) => void;
  redirect?: string;
  routeType: routeType;
  attr?: any;
}

export const RouteGuardWrap = ({
  Component,
  cacheKey,
  beforeEach,
  switchCacheRouter,
  afterEmit,
  redirect,
  routeType,
  attr,
}: routeGuardWrapPropsType) => {
  const RouteGuardWrap: React.FC = (props) => {
    const history = useHistory();

    const before = async () => {
      if (!beforeEach) {
        return;
      }

      const res = await beforeEach(props);

      if (res) {
        history.push(redirect || '');
        // 卸载组件
        if (routeType === 'cache') {
          cacheKey && dropByCacheKey(cacheKey);
        }
      }
    };

    useEffect(() => {
      before();

      return () => {
        afterEmit && afterEmit(props);
      };
    }, []);

    // 监听组件是否被缓存
    useDidCache(() => {
      // 只有 keepalive 才会有路由跳转事件
      if (routeType === 'cache') {
        switchCacheRouter && switchCacheRouter(props);
      }
    });

    return <Component {...props} {...attr} />;
  };

  return RouteGuardWrap;
};
