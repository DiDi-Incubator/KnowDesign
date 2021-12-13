import React from 'react';
import {Upload, UploadProps} from 'antd';
import DDragger from './Dragger';

const DUpload = (props: UploadProps) => {
  return <Upload className={'dantd-upload'} {...props}/>
};

DUpload.Dragger = DDragger;
export default DUpload;
