import React from 'react';
import {Button, Upload, UploadProps} from 'antd';
import DDragger from './Dragger';
import { UploadOutlined } from '@ant-design/icons';
import { DUploadImg } from './UploadImg';

const DUpload = (props: UploadProps) => {
  return <Upload {...props}>
    <p className='dant-form-item-required'> {`资源文件(仅支持${props.accept})`}</p>
    <Button icon={<UploadOutlined />}> 新增文件 </Button>
  </Upload>
};

DUpload.DDragger = DDragger;
DUpload.DUploadImg = DUploadImg;

export default DUpload;
