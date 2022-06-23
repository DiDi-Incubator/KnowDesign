import { Button, Dropdown, IconFont, Menu } from '../../index';
import React from 'react'
import { QuickEntry } from './commonDefine'

export interface IProps {
  username: string,
  icon: JSX.Element,
  quickEntries: Array<QuickEntry>,
  isFixed: boolean,
  userDropMenuItems: Array<any>,
  onClickQuickEntry?: (qe: QuickEntry) => void,
  onChangeLanguage?: (language: string) => void,
  onClickMain?: Function
}

export default (props: IProps) => {
  const cPrefixCls = `dcd-layout-two-columns`;
  const doc = document as any;
  const fullscreenStatus = doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement;
  const [isFullscreen, setIsFullscreen] = React.useState(fullscreenStatus);

  const toggleFullscreen = () => {
    if (!doc.fullscreenElement && /* alternative standard method */ !doc.mozFullScreenElement && !doc.webkitFullscreenElement) {
      // current working methods
      if (doc.documentElement.requestFullscreen) {
        doc.documentElement.requestFullscreen();
      } else if (doc.documentElement.mozRequestFullScreen) {
        doc.documentElement.mozRequestFullScreen();
      } else if (doc.documentElement.webkitRequestFullscreen) {
        doc.documentElement.webkitRequestFullscreen((Element as any).ALLOW_KEYBOARD_INPUT);
      }
      setIsFullscreen(true);
    } else {
      if (doc.cancelFullScreen) {
        doc.cancelFullScreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen();
      }
      setIsFullscreen(false);
    }
  };

  const personalMenu = <Menu>{props.userDropMenuItems}</Menu>

  const onClickQuickEntry = (qe) => {
    props.onClickQuickEntry && props.onClickQuickEntry(qe)
  }

  return <div className={`${cPrefixCls}-header`} style={{ position: props.isFixed ? 'sticky' : 'unset', top: 0, zIndex: 1000 }}>
    <div className="left" onClick={_ => {
      props.onClickMain && props.onClickMain()
    }}>
      <div className='main-icon'>{props.icon}</div>
      <div className='main-title'>Know streaming</div>
    </div>
    <div className="right">
      {props.quickEntries.map((qe, i) => {
        return <Button key={i} className='quick-entry' size='small' type={qe.active ? "primary" : 'default'} ghost={qe.active} onClick={_ => onClickQuickEntry(qe)}>
            <span className='btn-icon'>{qe.icon}</span>
            <span className='content'>{qe.txt}</span>
          </Button>
      })}
      <div className='vertical-line'></div>
      {/* <IconFont type='icon-quanju1' className='anticon-expand'/> */}
      {isFullscreen ? <IconFont type='icon-tuichuquanju' className='anticon-exit-expand' onClick={toggleFullscreen}/> : <IconFont type='icon-quanju1' className='anticon-expand' onClick={toggleFullscreen}/>}
      {/* <IconFont type='icon-xiaoxi' className='anticon-bell'/> */}
      <Dropdown overlay={personalMenu} placement="bottomRight">
        <div className='personnal'>
          <div className='head'>
            <IconFont type='icon-touxiang' className='anticon-user'/>
          </div>
          <span className='username'>{props.username || ''}</span>
        </div>
      </Dropdown>
    </div>
  </div>
}
