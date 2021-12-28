import React from 'react';
import {Upload, UploadProps} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const {Dragger} = Upload;
const DDragger = (props: UploadProps) => {
  return (
  <Dragger {...props}>
    <div className="ant-upload-drag-custom">
      <div>
        <InboxOutlined/>
        <span>拖住文件到该区域或 <a>点击该区域</a> 上传</span>
      </div>
      <p>{`支持扩展名：${props.accept}`}</p>
    </div>
  </Dragger>
  )
};

export default DDragger;
