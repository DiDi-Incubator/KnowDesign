import React, { FC, ComponentType } from 'react';
import { AppContainer, context, propsType, eventBus, useGlobalValue } from './app-container';
import { connect, connectComponentType } from './connect';

type containerType = FC<propsType> &  {
  context: React.Context<{}>;
  connect: (Component: connectComponentType) => ComponentType;
  eventBus: any;
  useGlobalValue: () => [state: any, setSate: (state: any) => void];
}

const Container = AppContainer as containerType;

Container.connect = connect;
Container.context = context;
Container.eventBus = eventBus;
Container.useGlobalValue = useGlobalValue;


export {
  context,
  connect,
  eventBus,
  useGlobalValue
}

export default Container;
