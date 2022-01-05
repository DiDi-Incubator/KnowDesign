import React, { FC, createContext, useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';

import { createGlobalState } from '../hook/create-global-state';
import { Utils } from '../utils';

import './app-container.less';

// 全局 hook
export const useGlobalValue = createGlobalState<any>({});

const { EventBus } = Utils;

// EventBus 实例
export const eventBus = new EventBus();

// 全局上下文
export const context = createContext({});

const Provider = context.Provider;
export interface propsType {
  className?: string;
  messageChange?: (event: any) => void;
  store?: any;
  antdProvider?: any;
  intlProvider?: any;
  children: any;
}

export const AppContainer: FC<propsType> = (props: propsType) => {
  const { className, messageChange, children, store, intlProvider, antdProvider } = props;

  const [appStore, setAppStore] = useState({ ...store, messageData: null });
  const [globalStore, setGlobalStore] = useGlobalValue();

  useEffect(() => {
    // message 改变的回调
    const change = (event: any) => {
      const { data } = event;

      messageChange && messageChange(event);

      setAppStore({
        ...appStore,
        messageData: data,
      });
    };

    window.addEventListener('message', change, false);

    return () => {
      window.removeEventListener('message', change);
    };
  }, []);

  useEffect(() => {
    setGlobalStore({
      ...globalStore,
      ...appStore,
    });
  }, [appStore]);

  return (
    <IntlProvider {...intlProvider}>
      <ConfigProvider {...antdProvider}>
        <Provider value={appStore}>
          <div className={`app-container ${className ? className : ''}`}>
            <div className={`app-container-main`}>{children}</div>
          </div>
        </Provider>
      </ConfigProvider>
    </IntlProvider>
  );
};
