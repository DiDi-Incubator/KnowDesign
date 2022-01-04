import React, { ComponentType, FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import { RouteGuardWrap } from './route-guard-wrap';

export type routeType = 'default' | 'cache';

export interface routeItemType {
  path: string;
  component: ComponentType;
  cacheKey?: string;
  redirect?: string;
}

export interface routePropsType {
  routeList: routeItemType[];
  beforeEach?: (pathname: string) => Promise<boolean>;
  switchCacheRouter?: (props: any) => void;
  afterEmit?: (props: any) => void;
  routeType?: routeType;
}

export const RouteGuard: FC<routePropsType> = ({
  routeList,
  beforeEach,
  switchCacheRouter,
  afterEmit,
  routeType = 'default',
}: routePropsType) => {
  const AppSwitch = routeType === 'default' ? Switch : CacheSwitch;
  const AppRoute = routeType === 'default' ? (Route as any) : CacheRoute;

  const renderRoute = ({ path, component, cacheKey, redirect }: routeItemType, key: number) => {
    return (
      <AppRoute
        path={path}
        exact={true}
        component={RouteGuardWrap({
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
    );
  };

  return <AppSwitch>{routeList.map((item, index) => renderRoute(item, index))}</AppSwitch>;
};
