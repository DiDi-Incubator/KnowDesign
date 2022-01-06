import React, { useEffect, useState } from 'react';
import type { DrawerProps, FormInstance } from 'antd';
import { Drawer, Form } from '../../index';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { XForm, IXFormProps } from '../x-form';
import { SubmitterProps } from '../submitter';

interface IDrawerProps {
  /** @name 自定义表单内容 */
  renderCustomForm?: (form: FormInstance) => JSX.Element;
  /**
   * 接受返回一个boolean，返回 true 会关掉这个抽屉
   * @name 表单结束后调用
   */
  onFinish?: (formData) => Promise<boolean | void>;

  /** @name 用于触发抽屉打开的 dom */
  trigger?: JSX.Element;

  /** @name 受控的打开关闭 */
  visible?: DrawerProps['visible'];

  /** @name 打开关闭的事件 */
  onVisibleChange?: (visible: boolean) => void;

  /** @name 抽屉的标题 */
  title?: DrawerProps['title'];

  /** @name 抽屉的宽度 */
  width?: DrawerProps['width'];

  /** @name 抽屉的预设的几种size */
  size?: 'small' | 'middle' | 'large';

  /** @name 底部操作区域 */
  submitter?: SubmitterProps<{ form?: FormInstance<any> }> | false;

  /** @name 底部操作按钮的位置 */
  submitterPosition?: 'left' | 'right';

  /**
   * 不支持 'visible'，请使用全局的 visible
   *
   * @name 抽屉的属性
   */
  drawerProps?: Omit<DrawerProps, 'visible' | 'getContainer' | 'footer' | 'footerStyle'>;

  /**
   *
   * @name XForm 表单的配置
   */
  XFormProps?: IXFormProps;
}

const DrawerForm = ({ trigger, title, width, size = 'middle', drawerProps, XFormProps, onFinish, onVisibleChange, renderCustomForm, ...rest }: IDrawerProps) => {
  const sizeMap = {
    small: 595,
    middle: 728
  }
  const [visible, setVisible] = useMergedState<boolean>(!!rest.visible,  {
    value: rest.visible,  
    onChange: onVisibleChange,
  });  
  useEffect(() => {
    if (visible && rest.visible) {
      onVisibleChange?.(true);
    }
  }, [visible]);

  const renderFormDom = () => {
    const form = renderCustomForm ? (Form.useForm())[0] : XFormProps?.form;
    const [loading, setLoading] = useState<boolean>(false);
    const submitButtonProps = renderCustomForm ? {
      preventDefault: true,
      loading,
      onClick: () => {
        form.validateFields().then(async values => {
          setLoading(true);
          const success = await onFinish(values);
          if (success) {
            setLoading(false);
            setVisible(false);
            form?.resetFields();
          }
        })
      }
    } : {};
    return (
      <XForm
        {...XFormProps}
        submitter={
          rest.submitter === false
            ? false
            : {
                ...rest.submitter,
                buttonConfig: {
                  submitText: '确认',
                  resetText: '取消',
                  ...rest.submitter?.buttonConfig,
                },
                submitButtonProps: {
                  ...rest.submitter?.submitButtonProps,
                  ...submitButtonProps
                },
                resetButtonProps: {
                  onClick: (e: any) => {
                    setVisible(false);
                    drawerProps?.onClose?.(e);
                  },
                  ...rest.submitter?.resetButtonProps,
                },
              }
        }
        contentRender={(submitter, renderForm: any) => {
          return (
            <Drawer
              title={title}
              width={width || sizeMap[size]}
              {...drawerProps}
              visible={visible}
              onClose={(e) => {
                setVisible(false);
                form?.resetFields();
                drawerProps?.onClose?.(e);
              }}
              footer={
                !!submitter && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: rest.submitterPosition === 'left' ? 'flex-start' : 'flex-end',
                    }}
                  >
                    {submitter}
                  </div>
                )
              }
            >
              {renderCustomForm ? renderCustomForm(form): renderForm({ ...XFormProps })}
            </Drawer>
          );
        }}
        onFinish={async (values) => {
          if (!onFinish) {
            return;
          }
          const success = await onFinish(values);
          if (success) {
            setVisible(false);
            form?.resetFields();
          }
        }}
      ></XForm>
    );
  };
  return (
    <>
      {renderFormDom()}
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: (e: any) => {
            setVisible(!visible);
            trigger.props?.onClick?.(e);
          },
        })}
    </>
  );
};

export default DrawerForm;
