import React from 'react';
import {Upload, UploadProps} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface UploadPropsImg extends UploadProps {
  loading: boolean;
  imageUrl: string;
}

export const DUploadImg = (props: UploadPropsImg) => {
  const { loading, imageUrl } = props;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload File</div>
      </div>
    );
  return (
    <Upload
      {...props}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};
