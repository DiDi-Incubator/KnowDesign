import React from 'react';
import { Upload, UploadProps } from 'antd';
import classNames from 'classnames';
import './style/index.less';

const { Dragger } = Upload;

function DUpload(props: UploadProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-upload`;
  const uploadCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: !!props.className,
  });

  return (
    <Upload
      className={uploadCls}
      {...props}
    >
    </Upload>
  )
};

DUpload.Dragger = Dragger;

export default DUpload;
