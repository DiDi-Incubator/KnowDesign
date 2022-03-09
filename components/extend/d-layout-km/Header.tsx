import { Button, Dropdown, Menu } from '../../index';
import React from 'react'
import { BellOutlined, ExpandOutlined, GithubFilled } from '@ant-design/icons';

interface QuickEntry {
  icon: JSX.Element,
  txt: string,
  isShowSider: boolean
}

interface IProps {
  icon: JSX.Element,
  quickEntries: Array<QuickEntry>,
  isFixed: boolean,
  userDropMenuItems: Array<any>,
  eventBus: any
}

export default (props: IProps) => {
  const cPrefixCls = `dcd-layout-km`;

  const personalMenu = <Menu>{props.userDropMenuItems}</Menu>

  const onClickQuickEntry = (qe) => {
    props.eventBus.emit('switchShowSider', qe.isShowSider)
  }

  return <div className={`${cPrefixCls}-header`} style={{ position: props.isFixed ? 'sticky' : 'unset', top: 0 }}>
    <div className="left">
      <div>{props.icon}</div>
      <div className='main-title'>Know streaming</div>
    </div>
    <div className="right">
      {props.quickEntries.map(qe => <Button className='quick-entry' size='small' icon={qe.icon} onClick={_ => onClickQuickEntry(qe)}>{qe.txt}</Button>)}
      <div className='vertical-line'></div>
      <ExpandOutlined/>
      <BellOutlined/>
      <div className="personnal">
        <div className='head'>头像</div>
        <Dropdown overlay={personalMenu} placement="bottomRight">
          <span className='username'>admin</span>
        </Dropdown>
      </div>
    </div>
  </div>
}
