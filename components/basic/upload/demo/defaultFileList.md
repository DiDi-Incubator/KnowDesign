---
order: 2
title:
  zh-CN: 已上传的文件列表
  en-US: Default Files
---

## zh-CN

使用 `defaultFileList` 设置已上传的内容。

## en-US

Use `defaultFileList` for uploaded files when page init.

```jsx
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  accept: '.jar',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: '文件Lorem ipsum dolor sit amet, consectetur.jar',
      status: 'done',
      // response: 'Server Error 500', // custom error message to show
      // url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: '2',
      name: '文件Lorem ipsum dolor sit amet, consectetur.jar',
      status: 'done',
      // url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: '文件Lorem ipsum dolor sit amet, consectetur con….jar',
      status: 'error',
      // response: 'Server Error 500', // custom error message to show
      // url: 'http://www.baidu.com/zzz.png',
    },
  ],
};

ReactDOM.render(
  <Upload {...props}>
    <p className='dant-form-item-required'> 资源文件(仅支持.jar)</p>
    <Button icon={<UploadOutlined />}> 新增文件 </Button>
  </Upload>,
  mountNode,
);
```
