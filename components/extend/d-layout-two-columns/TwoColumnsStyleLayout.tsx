import { SiderTheme } from '../../basic/layout/Sider';
import React, { useState, useEffect } from 'react';
import { DLayoutTwoColumns, Row } from '../../index';
import { QuickEntry } from './commonDefine'

export interface ITwoColumnsStyleLayout {
  headIcon?: JSX.Element;
  headQuickEntries?: Array<QuickEntry>;
  headIsFixed?: boolean;
  headUserDropMenuItems?: Array<any>;
  systemKey?: string;
  menuConf?: any;
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
}

export default (props: ITwoColumnsStyleLayout) => {
  const {
    menuConf,
    systemKey,
    siderWidth,
    children,
    collapsedWidth,
    siderCollapsible = true,
    prefixCls = 'dcd-two-columns',
    theme = 'light',
    onClickQuickEntry
  } = props;
  const [isShowSider, setIsShowSider] = useState<boolean>(props.isShowSider !== undefined ? props.isShowSider : true);
  useEffect(() => {
    props.onMount && props.onMount({})
  }, [])
  useEffect(() => {
    setIsShowSider(props.isShowSider)
  }, [props.isShowSider])

  return (
    <DLayoutTwoColumns style={{ overflow: 'auto' }}>
      <>
        { (props.isShowHeader || props.isShowHeader === undefined) && <DLayoutTwoColumns.Header
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
        ></DLayoutTwoColumns.Header> }
        <Row>
          {isShowSider && (
            <DLayoutTwoColumns.Sider
              width={siderWidth || 200}
              theme={theme}
              systemKey={systemKey}
              prefixCls={prefixCls}
              menuConf={menuConf}
              collapsible={siderCollapsible}
              collapsedWidth={collapsedWidth}
            ></DLayoutTwoColumns.Sider>
          )}
          <DLayoutTwoColumns.Content>{children}</DLayoutTwoColumns.Content>
        </Row>
      </>
    </DLayoutTwoColumns>
  );
};