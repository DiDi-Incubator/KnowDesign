---
order: 0
title: 点击上传
---

经典款式，用户点击按钮弹出文件选择框。


```jsx
import { DUpload, message, Button } from 'dcloud-design';
import { UploadOutlined, CloseCircleOutlined} from '@ant-design/icons';


const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  showUploadList: {
    showRemoveIcon: true,
    removeIcon: <CloseCircleOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
  },
  defaultFileList: [
    {
      uid: '1',
      name: '文件Lorem ipsum dolor sit amet, consectetur.jar',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: '2',
      name: '文件Lorem ipsum dolor sit amet, consectetur.jar',
      status: 'uploading',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: '文件Lorem ipsum dolor sit amet, consectetur.jar',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

ReactDOM.render(
  <DUpload {...props}>
    <Button size={'small'} icon={<UploadOutlined />}>新增文件</Button>
    <p className='dant-form-item-required' style={{marginTop: 4}}> 资源文件(仅支持.rar .zip .doc .docx .pdf .jpg...)</p>
  </DUpload>,
  mountNode,
);
```
