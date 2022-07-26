import React, { ComponentType, FC, useMemo, useEffect, useState, useLayoutEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import { RouteGuardWrap } from './route-guard-wrap';

export type routeType = 'default' | 'cache';

export interface routeItemType {
  path: string;
  component: ComponentType;
  cacheKey?: string;
  redirect?: string;
  children?: routeItemType[];
  commonRoute?: ComponentType;
  permissionNode?: string | number;
}

export interface routePropsType {
  routeList: routeItemType[];
  noMatch: () => any;
  beforeEach?: (pathname: string, permissionNode: string | number) => Promise<boolean>;
  switchCacheRouter?: (props: any) => void;
  afterEmit?: (props: any) => void;
  routeType?: routeType;
  attr?: any;
  pathRule?: (path: string) => boolean;
}

const RouteWrap = (props) => {
  const { beforeEach, path, permissionNode, children } = props;
  const [allow, setAllow] = useState(!(typeof beforeEach === 'function'));
  const [errorContent, setErrorContent] = useState('');

  useLayoutEffect(() => {
    beforeEach?.(path, permissionNode).then(res => {
      setAllow(true);
    }, (err) => {
      setAllow(false);
      setErrorContent(err);
    })
  }, [beforeEach]);

  return allow ? children : errorContent;
}

const RouteGuard: FC<routePropsType> = ({
  routeList,
  noMatch,
  beforeEach,
  switchCacheRouter,
  afterEmit,
  routeType = 'default',
  attr,
  pathRule,
}: routePropsType) => {
  const AppSwitch = routeType === 'default' ? Switch : CacheSwitch;
  const AppRoute = routeType === 'default' ? (Route as any) : CacheRoute;

  const renderRoute = (
    { path, component: Component, cacheKey, redirect, children, commonRoute: CommonRoute, permissionNode }: routeItemType,
    key: number,
    pathRule: any
  ) => {
    const PathRoute = pathRule && pathRule(path) ? AppRoute : Route;
    // const Com = RouteGuardWrap({
    //   routeType,
    //   Component,
    //   cacheKey,
    //   beforeEach,
    //   switchCacheRouter,
    //   afterEmit,
    //   redirect,
    //   attr,
    // });
    return (
      <PathRoute
        path={path}
        exact={children ? false : true}
        // component={useMemo(
        //   () =>
        //     RouteGuardWrap({
        //       routeType,
        //       Component: component,
        //       cacheKey,
        //       beforeEach,
        //       switchCacheRouter,
        //       afterEmit,
        //       redirect,
        //       attr,
        //     }),
        //   [routeType, component, cacheKey, beforeEach, switchCacheRouter, afterEmit, redirect, attr]
        // )}
        render={({ match }: any) => {
          return <>
              {CommonRoute && <CommonRoute />}
              <RouteWrap beforeEach={beforeEach} path={path} permissionNode={permissionNode}>
                <AppSwitch>
                  {children && children.length > 0
                    ? children.map((item, index) => {
                      if (!item.path.includes(match.path)) {
                        item.path = `${path}/${item.path}`;
                      }
                      return renderRoute(item, index, pathRule);
                    })
                    : null}
                  <Route render={() => <Component />} />
                </AppSwitch>
              </RouteWrap>
            </>
        }}
        when="always"
        cacheKey={cacheKey}
        key={key}
      ></PathRoute>
    );
  };

  return <Switch>
    {routeList.map((item, index) => renderRoute(item, index, pathRule))}
    <Route render={noMatch} />
  </Switch>;
};

export default RouteGuard;
