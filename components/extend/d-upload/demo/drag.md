---
order: 2
title: 拖拽上传
---

把文件拖入指定区域，完成上传，同样支持点击上传。

设置 `multiple` 后，在 `IE10+` 可以一次上传多个文件。


```jsx
import { DUpload, message } from 'dcloud-design';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = DUpload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  accept: '.rar,.zip,.doc,docx,.pdf,.jpg',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

ReactDOM.render(
  <Dragger {...props}>
    <div className="ant-upload-drag-icon">
      <InboxOutlined style={{width: 40, height: 34}}/>
      <span>拖住文件到该区域或 <a>点击该区域</a> 上传</span>
    </div>
    <p className="ant-upload-text">支持扩展名：.rar .zip .doc .docx .pdf .jpg</p>
  </Dragger>,
  mountNode,
);
```
