---
order: 0
title: 点击上传
---

经典款式，用户点击按钮弹出文件选择框。


```jsx
import { DUpload } from 'dcloud-design';


const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  accept: '.jpeg',
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
  <DUpload {...props} />,
  mountNode,
);
```
