import React from 'react';
import { createFromIconfontCN } from "@ant-design/icons";
import IconFontList from './config';
import './index.less';

const ProjectIcon = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2406313_8tfsrznn1ac.js',
  ],
});

export default (props: any) => {
  const { type, icon_class, clickFunc, ...rest } = props;
  const defaultType = IconFontList && IconFontList[0]
  const filterType = IconFontList.filter(item => item.type === type);
  return <ProjectIcon type={filterType.length > 0 ? filterType[0].icon_type : defaultType.icon_type} className={icon_class} {...rest} />
}