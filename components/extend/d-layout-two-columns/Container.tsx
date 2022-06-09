import React, { useEffect } from 'react';
import DLayoutTwoColumns from './'
import { QuickEntry } from './commonDefine'

export interface ITwoColumnsStyleLayout {
  username?: string;
  headIcon?: JSX.Element;
  headQuickEntries?: Array<QuickEntry>;
  headIsFixed?: boolean;
  headUserDropMenuItems?: Array<any>;
  children: JSX.Element;
  onChangeLanguage?: (language: string) => void;
  onMount?: (customProps: any) => void;
  onClickQuickEntry?: (qe: QuickEntry) => void;
  onClickMain?: Function;
}

export default (props: ITwoColumnsStyleLayout) => {
  const {
    children,
    username,
    headIcon,
    headQuickEntries,
    headIsFixed,
    headUserDropMenuItems,
    onMount,
    onClickQuickEntry,
    onClickMain,
    onChangeLanguage
  } = props;

  useEffect(() => {
    onMount && onMount({})
  }, [])

  return (
    <div className='dcd-layout-two-columns'>
      <DLayoutTwoColumns.Header
        username={username}
        icon={headIcon || null}
        quickEntries={headQuickEntries || []}
        isFixed={headIsFixed || true}
        userDropMenuItems={headUserDropMenuItems || []}
        onClickQuickEntry={(qe: QuickEntry) => {
          onClickQuickEntry && onClickQuickEntry(qe)
        }}
        onChangeLanguage={(la: string) => {
          onChangeLanguage && onChangeLanguage(la)
        }}
        onClickMain={() => {
          onClickMain && onClickMain()
        }}
      />
        {children}
    </div>
  );
};
