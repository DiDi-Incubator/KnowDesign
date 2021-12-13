import React from 'react';
import {Upload, UploadProps} from 'antd';

const {Dragger} = Upload;
const DDragger = (props: UploadProps) => {
  return <Dragger className={'dantd-dragger'} {...props}/>
};

export default DDragger;
