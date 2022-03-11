import React, { FC, ComponentType } from 'react';
import { AppContainer, context, propsType, eventBus, useGlobalValue } from './app-container';
import { connect, connectComponentType } from './connect';

type containerType = FC<propsType> & {
  context: React.Context<Record<string, unknown>>;
  connect: (Component: connectComponentType) => ComponentType;
  eventBus: any;
  useGlobalValue: () => any;
};

const Container = AppContainer as containerType;

Container.connect = connect;
Container.context = context;
Container.eventBus = eventBus;
Container.useGlobalValue = useGlobalValue;

export default Container;
