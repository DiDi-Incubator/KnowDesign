import React from 'react';
import { createFromIconfontCN } from "@ant-design/icons";
import './_iconfont/iconfont.css';

const IconFont = createFromIconfontCN({
  // scriptUrl: '//at.alicdn.com/t/font_3056939_l2x4wmtyeos.js'
  scriptUrl: [
    require('./_iconfont/iconfont'),
  ],
});


export default IconFont;