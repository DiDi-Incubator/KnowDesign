import { SiderTheme } from '../../basic/layout/Sider';
import React, { useState, useEffect } from 'react';
import { DLayoutKM, Row } from '../../index';
import { QuickEntry } from './commonDefine'

export interface IKMStyleLayout {
  headIcon: JSX.Element;
  headQuickEntries: Array<QuickEntry>;
  headIsFixed: boolean;
  headUserDropMenuItems: Array<any>;
  systemKey: string;
  menuConf: any;
  prefixCls?: string;
  theme?: SiderTheme;
  siderWidth?: number;
  siderCollapsible?: boolean;
  collapsedWidth?: number;
  children: JSX.Element;
  isShowHeader: boolean;
  onChangeLanguage: (language: string) => void;
  onMount: () => void;
}

export default (props: IKMStyleLayout) => {
  const {
    menuConf,
    systemKey,
    siderWidth,
    children,
    collapsedWidth,
    siderCollapsible = true,
    prefixCls = 'dcd-km',
    theme = 'light',
  } = props;
  const [isShowSider, setIsShowSider] = useState<boolean>(true);
  useEffect(() => {
    props.onMount()
  }, [])

  return (
    <DLayoutKM style={{ overflow: 'auto' }}>
      <>
        { props.isShowHeader && <DLayoutKM.Header
          icon={props.headIcon || null}
          quickEntries={props.headQuickEntries || []}
          isFixed={props.headIsFixed || true}
          userDropMenuItems={props.headUserDropMenuItems || []}
          onClickQuickEntry={(qe: QuickEntry) => {
            setIsShowSider(qe.isShowSider);
          }}
          onChangeLanguage={(la: string) => {
            props.onChangeLanguage(la)
          }}
        ></DLayoutKM.Header> }
        <Row>
          {isShowSider && (
            <DLayoutKM.Sider
              width={siderWidth || 200}
              theme={theme}
              systemKey={systemKey}
              prefixCls={prefixCls}
              menuConf={menuConf}
              collapsible={siderCollapsible}
              collapsedWidth={collapsedWidth}
            ></DLayoutKM.Sider>
          )}
          <DLayoutKM.Content>{children}</DLayoutKM.Content>
        </Row>
      </>
    </DLayoutKM>
  );
};
