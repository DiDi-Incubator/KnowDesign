import React, { ComponentType } from 'react';
import { useGlobalValue } from './app-container';

export type connectComponentType = ComponentType<{
  globalValue: any;
  setGlobalValue: (val: any) => void;
}>;

export const connect = (Component: connectComponentType) => {
  const Connect = () => {
    const [value, setValue] = useGlobalValue();

    return <Component globalValue={value} setGlobalValue={setValue} />;
  };

  return Connect;
};
