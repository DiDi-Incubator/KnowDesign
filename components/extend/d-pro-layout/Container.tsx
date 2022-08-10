import React, { useEffect } from 'react';
import DProLayout from '.'
import { HeaderProps } from './Header';

export interface IProStyleLayout {
  headerProps: HeaderProps;
  children: JSX.Element;
  onMount?: (customProps: any) => void;
}

export default (props: IProStyleLayout) => {
  const {
    headerProps,
    children,
    onMount,
  } = props;

  useEffect(() => {
    onMount && onMount({})
  }, [])

  return (
    <div className='dcd-layout-two-columns'>
      <DProLayout.Header
        {...headerProps}
      />
        {children}
    </div>
  );
};
