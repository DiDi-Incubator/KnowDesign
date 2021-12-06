import React, { useEffect, ComponentType, FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import CacheRoute, { CacheSwitch, dropByCacheKey } from 'react-router-cache-route';
import { routeGuardWrap } from './route-guard-wrap';

export type routeType = 'default' | 'cache';

export interface routeItemType {
  path: string,
  component: ComponentType,
  cacheKey?: string,
  redirect?: string
}

export interface routePropsType {
  routeList: routeItemType[];
  beforeEach?: (pathname: string) => Promise<Boolean>;
  switchCacheRouter?: (props: any) => void;
  afterEmit?: (props: any) => void;
  routeType?: routeType;
}

export const RouteGuard: FC<routePropsType> = ({ routeList, beforeEach, switchCacheRouter, afterEmit, routeType = 'default' }) => {
  const AppSwitch = routeType === 'default' ? Switch : CacheSwitch;
  const AppRoute = routeType === 'default' ? Route as any : CacheRoute;
  
  const renderRoute = ({ path, component, cacheKey, redirect }: routeItemType, key: number) => {
    return <AppRoute
      path={path}
      exact={true}
      component={routeGuardWrap({
        routeType,
        Component: component,
        cacheKey,
        beforeEach,
        switchCacheRouter,
        afterEmit,
        redirect,
      })}
      cacheKey={cacheKey}
      key={key}
    />
  }

  return <AppSwitch>
    {
      routeList.map((item, index) => renderRoute(item, index))
    }
  </AppSwitch>
}