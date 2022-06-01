import { SiderTheme } from '../../basic/layout/Sider';
import React, { useState, useEffect } from 'react';
import { DLayoutTwoColumns, Row } from '../../index';
import { QuickEntry } from './commonDefine'

export interface ITwoColumnsStyleLayout {
  username?: string;
  headIcon?: JSX.Element;
  headQuickEntries?: Array<QuickEntry>;
  headIsFixed?: boolean;
  headUserDropMenuItems?: Array<any>;
  systemKey?: string;
  menuConf?: any;
  permissionPoints?: {[key: string]: any} | Function; 
  prefixCls?: string;
  theme?: SiderTheme;
  siderWidth?: number;
  siderCollapsible?: boolean;
  collapsedWidth?: number;
  children: JSX.Element;
  isShowHeader?: boolean;
  isShowSider?: boolean;
  onChangeLanguage?: (language: string) => void;
  onMount?: (customProps: any) => void;
  onClickQuickEntry?: (qe: QuickEntry) => void;
  onClickMain?: Function;
}

export default (props: ITwoColumnsStyleLayout) => {
  const {
    username,
    menuConf,
    systemKey,
    siderWidth,
    children,
    collapsedWidth,
    permissionPoints = {},
    siderCollapsible = true,
    prefixCls = 'dcd-two-columns',
    theme = 'light',
    onClickQuickEntry,
    onClickMain
  } = props;
  const [isShowSider, setIsShowSider] = useState<boolean>(props.isShowSider !== undefined ? props.isShowSider : true);
  useEffect(() => {
    props.onMount && props.onMount({})
  }, [])
  useEffect(() => {
    setIsShowSider(props.isShowSider)
  }, [props.isShowSider])

  return (
    <DLayoutTwoColumns>
      <>
        { (props.isShowHeader || props.isShowHeader === undefined) && <DLayoutTwoColumns.Header
          username={username}
          icon={props.headIcon || null}
          quickEntries={props.headQuickEntries || []}
          isFixed={props.headIsFixed || true}
          userDropMenuItems={props.headUserDropMenuItems || []}
          onClickQuickEntry={(qe: QuickEntry) => {
            onClickQuickEntry && onClickQuickEntry(qe)
          }}
          onChangeLanguage={(la: string) => {
            props.onChangeLanguage && props.onChangeLanguage(la)
          }}
          onClickMain={() => {
            onClickMain && onClickMain()
          }}
        ></DLayoutTwoColumns.Header> }
        <div className='sider-and-content'>
          {isShowSider && (
            <DLayoutTwoColumns.Sider
              width={siderWidth || 200}
              theme={theme}
              systemKey={systemKey}
              prefixCls={prefixCls}
              menuConf={menuConf}
              permissionPoints={permissionPoints}
              collapsible={siderCollapsible}
              collapsedWidth={collapsedWidth}
            ></DLayoutTwoColumns.Sider>
          )}
          <DLayoutTwoColumns.Content>{children}</DLayoutTwoColumns.Content>
        </div>
      </>
    </DLayoutTwoColumns>
  );
};
