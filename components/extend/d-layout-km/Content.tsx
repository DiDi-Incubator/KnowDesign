import React from 'react'

export default (props) => {
  const cPrefixCls = `dcd-layout-km`;
  return <div className={`${cPrefixCls}-content`}>
    {props.children}
  </div>
}
