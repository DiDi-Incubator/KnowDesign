import { SiderTheme } from '../../basic/layout/Sider';
import React, { useState } from 'react';
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

  return (
    <DLayoutKM style={{ overflow: 'auto' }}>
      <>
        <DLayoutKM.Header
          icon={props.headIcon || null}
          quickEntries={props.headQuickEntries || []}
          isFixed={props.headIsFixed || true}
          userDropMenuItems={props.headUserDropMenuItems || []}
          onClickQuickEntry={(qe: QuickEntry) => {
            setIsShowSider(qe.isShowSider);
          }}
        ></DLayoutKM.Header>
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
