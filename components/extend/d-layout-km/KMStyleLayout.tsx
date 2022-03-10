import { DotChartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Dropdown, Menu, DLayoutKM, Row } from '../../index';
import { QuickEntry } from './commonDefine'

export interface IKMStyleLayout {
  headIcon: JSX.Element,
  headQuickEntries: Array<QuickEntry>,
  headIsFixed: boolean,
  headUserDropMenuItems: Array<any>
}

export default (props: IKMStyleLayout) => {
  const [isShowSider, setIsShowSider] = useState<boolean>(false);
  return (
    <DLayoutKM style={{ height: 300, overflow: 'auto' }}>
      <>
      <DLayoutKM.Header
        icon={props.headIcon || null}
        quickEntries={props.headQuickEntries || []}
        isFixed={props.headIsFixed || true}
        userDropMenuItems={props.headUserDropMenuItems || []}
        onClickQuickEntry={(qe: QuickEntry) => {
          setIsShowSider(qe.isShowSider)
        }}
      ></DLayoutKM.Header>
      <Row>
        {isShowSider && <DLayoutKM.Sider></DLayoutKM.Sider>}
        <DLayoutKM.Content></DLayoutKM.Content>
      </Row>
      </>
    </DLayoutKM>
  );
};