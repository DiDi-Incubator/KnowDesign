import React, { useEffect } from 'react';
import DProLayout from '.';
import { defaultPrefix } from './commonDefine';
import { HeaderProps } from './Header';

export interface IProStyleLayout {
  headerProps: HeaderProps;
  children: JSX.Element;
  onMount?: (customProps: any) => void;
}

export default (props: IProStyleLayout) => {
  const { headerProps, children, onMount } = props;

  useEffect(() => {
    onMount && onMount({});
  }, []);

  return (
    <div className={defaultPrefix}>
      <DProLayout.Header {...headerProps} />
      {children}
    </div>
  );
};
