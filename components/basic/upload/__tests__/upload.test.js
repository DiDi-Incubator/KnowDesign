/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import { mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import produce from 'immer';
import { cloneDeep } from 'lodash';
import Upload from '..';
import Form from '../../form';
import { getFileItem, removeFileItem, isImageUrl } from '../utils';
import { setup, teardown } from './mock';
import { resetWarned } from '../../_util/devWarning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { sleep } from '../../../tests/utils';

describe('Upload', () => {
  mountTest(Upload);
  rtlTest(Upload);

  beforeEach(() => setup());
  afterEach(() => teardown());

  // Mock for rc-util raf
  window.requestAnimationFrame = callback => {
    window.setTimeout(callback, 16);
  };
  window.cancelAnimationFrame = id => {
    window.clearTimeout(id);
  };

  // https://github.com/react-component/upload/issues/36
  it('should get refs inside Upload in componentDidMount', () => {
    let ref;
    class App extends React.Component {
      componentDidMount() {
        ref = this.refs.input;
      }

      render() {
        return (
          <Upload supportServerRender={false}>
            <input ref="input" />
          </Upload>
        );
      }
    }
    mount(<App />);
    expect(ref).toBeDefined();
  });

  it('return promise in beforeUpload', done => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload: () => new Promise(resolve => { setTimeout(() => resolve('success'), 100); }),
      data,
      onChange: ({ file }) => {
        if (file.status !== 'uploading') {
          expect(data).toHaveBeenCalled();
          done();
        }
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('input').simulate('change', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
  });

  it('beforeUpload can be falsy', done => {
    const props = {
      action: 'http://upload.com',
      beforeUpload: false,
      onChange: ({ file }) => {
        if (file.status !== 'uploading') {
          done();
        }
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
  });

  it('upload promise return file in beforeUpload', done => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload: file =>
        new Promise(resolve => {
          setTimeout(() => {
            const result = file;
            result.name = 'test.png';
            resolve(result);
          }, 100);
        }),
      data,
      onChange: ({ file }) => {
        if (file.status !== 'uploading') {
          expect(data).toHaveBeenCalled();
          expect(file.name).toEqual('test.png');
          done();
        }
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
  });

  it('should not stop upload when return value of beforeUpload is false', done => {
    const fileList = [
      {
        uid: 'bar',
        name: 'bar.png',
      },
    ];
    const mockFile = new File(['foo'], 'foo.png', {
      type: 'image/png',
    });
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      fileList,
      beforeUpload: () => false,
      data,
      onChange: ({ file, fileList: updatedFileList }) => {
        expect(file instanceof File).toBe(true);
        expect(updatedFileList.map(f => f.name)).toEqual(['bar.png', 'foo.png']);
        expect(data).not.toHaveBeenCalled();
        done();
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [mockFile],
      },
    });
  });

  it('should not stop upload when return value of beforeUpload is not false', done => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload() {},
      data,
      onChange: () => {
        expect(data).toHaveBeenCalled();
        done();
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
  });

  // https://github.com/ant-design/ant-design/issues/14779
  it('should contain input file control if upload button is hidden', () => {
    const wrapper = mount(
      <Upload action="http://upload.com">
        <button type="button">upload</button>
      </Upload>,
    );

    expect(wrapper.find('input[type="file"]').length).toBe(1);
    wrapper.setProps({ children: null });
    expect(wrapper.find('input[type="file"]').length).toBe(1);
  });

  // https://github.com/ant-design/ant-design/issues/14298
  it('should not have id if upload children is null, avoid being triggered by label', () => {
    const Demo = ({ children }) => (
      <Form>
        <Form.Item name="upload" label="Upload" valuePropName="fileList">
          <Upload>{children}</Upload>
        </Form.Item>
      </Form>
    );

    const wrapper = mount(
      <Demo>
        <div>upload</div>
      </Demo>,
    );

    expect(wrapper.find('input#upload').length).toBe(1);
    wrapper.setProps({ children: null });
    expect(wrapper.find('input#upload').length).toBe(0);
  });

  // https://github.com/ant-design/ant-design/issues/16478
  it('should not have id if Upload is disabled, avoid being triggered by label', () => {
    const Demo = ({ disabled }) => (
      <Form>
        <Form.Item name="upload" label="Upload" valuePropName="fileList">
          <Upload disabled={disabled}>
            <div>upload</div>
          </Upload>
        </Form.Item>
      </Form>
    );

    const wrapper = mount(<Demo />);
    expect(wrapper.find('input#upload').length).toBe(1);
    wrapper.setProps({ disabled: true });
    expect(wrapper.find('input#upload').length).toBe(0);
  });

  // https://github.com/ant-design/ant-design/issues/24197
  it('should not have id if upload.Dragger is disabled, avoid being triggered by label', () => {
    const Demo = ({ disabled }) => (
      <Form>
        <Form.Item name="upload" label="Upload" valuePropName="fileList">
          <Upload.Dragger disabled={disabled}>
            <div>upload</div>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    );

    const wrapper = mount(<Demo />);
    expect(wrapper.find('input#upload').length).toBe(1);
    wrapper.setProps({ disabled: true });
    expect(wrapper.find('input#upload').length).toBe(0);
  });

  it('should be controlled by fileList', () => {
    jest.useFakeTimers();
    const fileList = [
      {
        uid: '-1',
        name: 'foo.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      },
    ];
    const ref = React.createRef();
    const wrapper = mount(<Upload ref={ref} />);
    expect(ref.current.fileList).toEqual([]);

    wrapper.setProps({ fileList });
    jest.runAllTimers();
    expect(ref.current.fileList).toEqual(fileList);
    jest.useRealTimers();
  });

  it('should be able to get uid at first', () => {
    const fileList = [
      {
        name: 'foo.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      },
    ];
    render(<Upload fileList={fileList} />);
    fileList.forEach(file => {
      expect(file.uid).toBeDefined();
    });
  });

  describe('util', () => {
    it('should be able to get fileItem', () => {
      const file = { uid: '-1', name: 'item.jpg' };
      const fileList = [
        {
          uid: '-1',
          name: 'item.jpg',
        },
      ];
      const targetItem = getFileItem(file, fileList);
      expect(targetItem).toBe(fileList[0]);
    });

    it('should be able to remove fileItem', () => {
      const file = { uid: '-1', name: 'item.jpg' };
      const fileList = [
        {
          uid: '-1',
          name: 'item.jpg',
        },
        {
          uid: '-2',
          name: 'item2.jpg',
        },
      ];
      const targetItem = removeFileItem(file, fileList);
      expect(targetItem).toEqual(fileList.slice(1));
    });

    it('remove fileItem and fileList with immutable data', () => {
      const file = { uid: '-3', name: 'item3.jpg' };
      const fileList = produce(
        [
          {
            uid: '-1',
            name: 'item.jpg',
          },
          {
            uid: '-2',
            name: 'item2.jpg',
          },
        ],
        draftState => {
          draftState.push({
            uid: '-3',
            name: 'item3.jpg',
          });
        },
      );
      const targetItem = removeFileItem(file, fileList);
      expect(targetItem).toEqual(fileList.slice(0, 2));
    });

    it('should not be able to remove fileItem', () => {
      const file = { uid: '-3', name: 'item.jpg' };
      const fileList = [
        {
          uid: '-1',
          name: 'item.jpg',
        },
        {
          uid: '-2',
          name: 'item2.jpg',
        },
      ];
      const targetItem = removeFileItem(file, fileList);
      expect(targetItem).toBe(null);
    });

    it('isImageUrl should work correctly when file.url is null', () => {
      const file = {
        url: null,
      };
      expect(isImageUrl(file)).toBe(true);
    });
  });

  it('should support linkProps as object', () => {
    const fileList = [
      {
        uid: '-1',
        name: 'foo.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
        linkProps: {
          download: 'image',
          rel: 'noopener',
        },
      },
    ];
    const wrapper = mount(<Upload fileList={fileList} />);
    const linkNode = wrapper.find('a.ant-upload-list-item-name');
    expect(linkNode.props().download).toBe('image');
    expect(linkNode.props().rel).toBe('noopener');
  });

  it('should support linkProps as json stringify', () => {
    const linkPropsString = JSON.stringify({
      download: 'image',
      rel: 'noopener',
    });
    const fileList = [
      {
        uid: '-1',
        name: 'foo.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
        linkProps: linkPropsString,
      },
    ];
    const wrapper = mount(<Upload fileList={fileList} />);
    const linkNode = wrapper.find('a.ant-upload-list-item-name');
    expect(linkNode.props().download).toBe('image');
    expect(linkNode.props().rel).toBe('noopener');
  });

  it('should not stop remove when return value of onRemove is false', done => {
    const mockRemove = jest.fn(() => false);
    const props = {
      onRemove: mockRemove,
      fileList: [
        {
          uid: '-1',
          name: 'foo.png',
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
        },
      ],
    };

    const wrapper = mount(<Upload {...props} />);

    wrapper.find('div.ant-upload-list-item .anticon-delete').simulate('click');

    setTimeout(() => {
      wrapper.update();

      expect(mockRemove).toHaveBeenCalled();
      expect(props.fileList).toHaveLength(1);
      expect(props.fileList[0].status).toBe('done');
      done();
    });
  });

  // https://github.com/ant-design/ant-design/issues/18902
  it('should not abort uploading until return value of onRemove is resolved as true', done => {
    let wrapper;

    const props = {
      onRemove: async () => {
        await act(async () => {
          await sleep(100);
          wrapper.update();
          expect(props.fileList).toHaveLength(1);
          expect(props.fileList[0].status).toBe('uploading');
        });

        return true;
      },
      fileList: [
        {
          uid: '-1',
          name: 'foo.png',
          status: 'uploading',
          url: 'http://www.baidu.com/xxx.png',
        },
      ],
      onChange: () => {
        expect(props.fileList).toHaveLength(1);
        expect(props.fileList[0].status).toBe('removed');
        done();
      },
    };

    wrapper = mount(<Upload {...props} />);

    wrapper.find('div.ant-upload-list-item .anticon-delete').simulate('click');
  });

  it('should not stop download when return use onDownload', done => {
    const mockRemove = jest.fn(() => false);
    const props = {
      onRemove: mockRemove,
      showUploadList: {
        showDownloadIcon: true,
      },
      fileList: [
        {
          uid: '-1',
          name: 'foo.png',
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
        },
      ],
    };

    const wrapper = mount(<Upload {...props} onDownload={() => {}} />);

    wrapper.find('div.ant-upload-list-item .anticon-download').simulate('click');

    setTimeout(() => {
      wrapper.update();

      expect(props.fileList).toHaveLength(1);
      expect(props.fileList[0].status).toBe('done');
      done();
    });
  });

  // https://github.com/ant-design/ant-design/issues/14439
  it('should allow call abort function through upload instance', () => {
    const ref = React.createRef();
    mount(
      <Upload ref={ref}>
        <button type="button">upload</button>
      </Upload>,
    );
    expect(typeof ref.current.upload.abort).toBe('function');
  });

  it('correct dragCls when type is drag', () => {
    const fileList = [{ status: 'uploading', uid: 'file' }];
    const wrapper = mount(
      <Upload type="drag" fileList={fileList}>
        <button type="button">upload</button>
      </Upload>,
    );
    expect(wrapper.find('.ant-upload-drag-uploading').length).toBe(1);
  });

  it('return when targetItem is null', () => {
    const fileList = [{ uid: 'file' }];
    const ref = React.createRef();
    mount(
      <Upload ref={ref} type="drag" fileList={fileList}>
        <button type="button">upload</button>
      </Upload>,
    );
    expect(ref.current.onSuccess('', { uid: 'fileItem' })).toBe(undefined);
    expect(ref.current.onProgress('', { uid: 'fileItem' })).toBe(undefined);
    expect(ref.current.onError('', '', { uid: 'fileItem' })).toBe(undefined);
  });

  it('should replace file when targetItem already exists', () => {
    const fileList = [{ uid: 'file', name: 'file' }];
    const ref = React.createRef();
    const wrapper = mount(
      <Upload ref={ref} defaultFileList={fileList}>
        <button type="button">upload</button>
      </Upload>,
    );

    const newFile = {
      uid: 'file',
      name: 'file1',
    };

    act(() => {
      ref.current.onBatchStart([
        {
          file: newFile,
          parsedFile: newFile,
        },
      ]);
    });

    wrapper.update();

    expect(ref.current.fileList.length).toBe(1);
    expect(ref.current.fileList[0].originFileObj).toEqual({
      name: 'file1',
      uid: 'file',
    });

    wrapper.unmount();
  });

  it('warning if set `value`', () => {
    resetWarned();

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Upload value={[]} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Upload] `value` is not a valid prop, do you mean `fileList`?',
    );
    errorSpy.mockRestore();
  });

  it('should be treated as file but not an image', () => {
    const file = {
      status: 'done',
      uid: '-1',
      type: 'video/mp4',
      url: 'https://zos.alipayobjects.com/rmsportal/IQKRngzUuFzJzGzRJXUs.png',
    };
    const wrapper = mount(<Upload listType="picture-card" fileList={[file]} />);
    expect(wrapper.find('img').length).toBe(0);
  });

  // https://github.com/ant-design/ant-design/issues/25077
  it('should support events', () => {
    const onClick = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const wrapper = mount(
      <Upload onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('.ant-upload').at(1).simulate('click');
    expect(onClick).toHaveBeenCalled();
    wrapper.find('.ant-upload').at(1).simulate('mouseEnter');
    expect(onMouseEnter).toHaveBeenCalled();
    wrapper.find('.ant-upload').at(1).simulate('mouseLeave');
    expect(onMouseLeave).toHaveBeenCalled();
  });

  // https://github.com/ant-design/ant-design/issues/26427
  it('should sync file list with control mode', done => {
    let callTimes = 0;

    const customRequest = jest.fn(async options => {
      options.onProgress({ percent: 0 });
      const url = Promise.resolve('https://ant.design');
      options.onProgress({ percent: 100 });
      options.onSuccess({}, { ...options.file, url });
    });

    const Demo = () => {
      const [fileList, setFileList] = React.useState([]);

      const onChange = e => {
        const newFileList = Array.isArray(e) ? e : e.fileList;
        setFileList(newFileList);
        const file = newFileList[0];

        callTimes += 1;

        switch (callTimes) {
          case 1:
          case 2:
            expect(file).toEqual(expect.objectContaining({ status: 'uploading', percent: 0 }));
            break;

          case 3:
            expect(file).toEqual(expect.objectContaining({ status: 'uploading', percent: 100 }));
            break;

          case 4:
            expect(file).toEqual(expect.objectContaining({ status: 'done', percent: 100 }));
            break;

          default:
          // Do nothing
        }

        if (callTimes >= 4) {
          done();
        }
      };

      return (
        <Upload customRequest={customRequest} onChange={onChange} fileList={fileList}>
          <button type="button">Upload</button>
        </Upload>
      );
    };

    const wrapper = mount(<Demo />);

    act(() => {
      wrapper.find('input').simulate('change', {
        target: {
          files: [{ file: 'foo.png' }],
        },
      });
    });
  });

  describe('maxCount', () => {
    it('replace when only 1', async () => {
      const onChange = jest.fn();
      const fileList = [
        {
          uid: 'bar',
          name: 'bar.png',
        },
      ];

      const props = {
        action: 'http://upload.com',
        fileList,
        onChange,
        maxCount: 1,
      };

      const wrapper = mount(
        <Upload {...props}>
          <button type="button">upload</button>
        </Upload>,
      );

      wrapper.find('input').simulate('change', {
        target: {
          files: [
            new File(['foo'], 'foo.png', {
              type: 'image/png',
            }),
          ],
        },
      });

      await sleep(20);

      expect(onChange.mock.calls[0][0].fileList).toHaveLength(1);
      expect(onChange.mock.calls[0][0].fileList[0]).toEqual(
        expect.objectContaining({
          name: 'foo.png',
        }),
      );
    });

    it('maxCount > 1', async () => {
      const onChange = jest.fn();
      const fileList = [
        {
          uid: 'bar',
          name: 'bar.png',
        },
      ];

      const props = {
        action: 'http://upload.com',
        fileList,
        onChange,
        maxCount: 2,
      };

      const wrapper = mount(
        <Upload {...props}>
          <button type="button">upload</button>
        </Upload>,
      );

      wrapper.find('input').simulate('change', {
        target: {
          files: [
            new File(['foo'], 'foo.png', {
              type: 'image/png',
            }),
            new File(['invisible'], 'invisible.png', {
              type: 'image/png',
            }),
          ],
        },
      });

      await sleep(20);

      expect(onChange.mock.calls[0][0].fileList).toHaveLength(2);
      expect(onChange.mock.calls[0][0].fileList).toEqual([
        expect.objectContaining({
          name: 'bar.png',
        }),
        expect.objectContaining({
          name: 'foo.png',
        }),
      ]);
    });
  });

  it('auto fill file uid', () => {
    const fileList = [
      {
        name: 'bamboo.png',
      },
    ];

    expect(fileList[0].uid).toBeFalsy();

    mount(
      <Upload fileList={fileList}>
        <button type="button">upload</button>
      </Upload>,
    );

    expect(fileList[0].uid).toBeTruthy();
  });

  it('Proxy should support deepClone', async () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <Upload onChange={onChange}>
        <button type="button">upload</button>
      </Upload>,
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [
          new File(['foo'], 'foo.png', {
            type: 'image/png',
          }),
        ],
      },
    });

    await sleep();

    const { file } = onChange.mock.calls[0][0];
    const clone = cloneDeep(file);

    expect(Object.getOwnPropertyDescriptor(file, 'name')).toEqual(
      expect.objectContaining({ value: 'foo.png' }),
    );

    ['uid', 'name', 'lastModified', 'lastModifiedDate', 'size', 'type'].forEach(key => {
      expect(key in clone).toBeTruthy();
    });
  });

  it('not break on freeze object', async () => {
    const fileList = [
      {
        fileName: 'Test.png',
        name: 'SupportIS App - potwierdzenie.png',
        thumbUrl: null,
        downloadUrl: 'https://localhost:5001/api/files/ff2917ce-e4b9-4542-84da-31cdbe7c273f',
        status: 'done',
      },
    ];

    const frozenFileList = fileList.map(file => Object.freeze(file));

    const wrapper = mount(<Upload fileList={frozenFileList} />);
    const rmBtn = wrapper.find('.ant-upload-list-item-card-actions-btn').last();
    rmBtn.simulate('click');

    // Wait for Upload async remove
    await act(async () => {
      await sleep();
    });
  });

  // https://github.com/ant-design/ant-design/issues/30390
  // IE11 Does not support the File constructor
  it('should not break in IE if beforeUpload returns false', async () => {
    const onChange = jest.fn();
    const wrapper = mount(<Upload beforeUpload={() => false} fileList={[]} onChange={onChange} />);
    const fileConstructor = () => {
      throw new TypeError("Object doesn't support this action");
    };
    global.File = jest.fn().mockImplementationOnce(fileConstructor);

    await act(async () =>
      wrapper.find('input').simulate('change', {
        target: {
          files: [{ file: 'foo.png' }],
        },
      }),
    );

    expect(onChange.mock.calls[0][0].fileList).toHaveLength(1);
  });
});
