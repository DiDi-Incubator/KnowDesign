import React, { useRef, useCallback, useEffect, useImperativeHandle } from 'react';
import type { StepsProps, FormInstance } from 'antd';
import { Form, Steps, Button, Space } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import type { FormProviderProps } from 'antd/lib/form/context';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import classNames from 'classnames';
import type { StepFormProps } from './StepForm';
import StepForm from './StepForm';
import './index.less';
import type { SubmitterProps } from '../submitter';
import { useState } from 'react';

type StepsFormProps<T = Record<string, any>> = {
  /**
   * 返回 true 会重置步数，并且清空表单
   *
   * @name 提交方法
   */
  onFinish?: (values: T) => Promise<boolean | void>;
  current?: number;
  stepsProps?: StepsProps;
  onCurrentChange?: (current: number) => void;
  formRef?: React.MutableRefObject<FormInstance<any> | undefined>;
  formMapRef?: React.MutableRefObject<React.MutableRefObject<FormInstance<any> | undefined>[]>;
  /** 按钮的统一配置，优先级低于分步表单的配置 */
  submitter?:
    | SubmitterProps<{
        step: number;
        onPre: () => void;
        form?: FormInstance<any>;
      }>
    | false;

  containerStyle?: React.CSSProperties;
} & FormProviderProps;

export const StepsFormProvide = React.createContext<
  | {
      unRegForm: (name: string) => void;
      onFormFinish: (name: string, formData: any) => void;
      keyArray: string[];
      formArrayRef: any;
      loading: boolean;
      setLoading: (loading: boolean) => void;
      formMapRef: any;
      next: () => void;
    }
  | undefined
>(undefined);
function StepsForm<T = Record<string, any>>(
  props: StepsFormProps<T> & {
    children: any;
  },
) {
  
  const prefixCls = 'dcloud-design-steps-form';

  const {
    current,
    onCurrentChange,
    submitter,
    stepsProps,
    onFinish,
    containerStyle,
    formRef,
    ...rest
  } = props;
  const formDataRef = useRef(new Map<string, Record<string, any>>());
  const formMapRef = useRef(new Map<string, StepFormProps>());
  const formArrayRef = useRef<any[]>([]);
  // steps的name数组
  const [formArray, setFormArray] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /** 受控的方式来操作表单 */
  const [step, setStep] = useMergedState<number>(0, {
    value: props.current,
    onChange: props.onCurrentChange,
  });

  const regForm = (name: string, childrenFormProps: StepFormProps) => {
    formMapRef.current.set(name, childrenFormProps);
  };

  const unRegForm = (name: string) => {
    formMapRef.current.delete(name);
    formDataRef.current.delete(name);
  };

  useEffect(() => {
    
    setFormArray(Array.from(formMapRef.current.keys()));
  }, [Array.from(formMapRef.current.keys()).join(',')]);

  useImperativeHandle(
    formRef,
    () => {
      
      return formArrayRef.current[step || 0]?.current;
    },
    [step],
  );

  const onFormFinish = useCallback(
    async (name: string, formData: any) => {
      
      formDataRef.current.set(name, formData);
      // 如果是最后一步
      if (step === formMapRef.current.size - 1 || formMapRef.current.size === 0) {
        if (!onFinish) {
          return;
        }
        setLoading(true);
        const values: any = Object.assign({}, ...Array.from(formDataRef.current.values()));
        try {
          const success = await onFinish(values);
          if (success) {
            setStep(0);
            formArrayRef.current.forEach((form) => form.current?.resetFields());
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    },
    [step, formMapRef, onFinish],
  );

  const stepsDom = (
    <div
      className={`${prefixCls}-steps-container`}
      style={{
        maxWidth: Math.min(formArray.length * 320, 1160),
      }}
    >
      <Steps {...stepsProps} current={step} onChange={undefined}>
        {formArray.map((item) => {
          
          const itemProps = formMapRef.current.get(item);
          return <Steps.Step key={item} title={itemProps?.title} {...itemProps?.stepProps} />;
        })}
      </Steps>
    </div>
  );

  const onSubmit = () => {
    const form = formArrayRef.current[step];
    form.current?.submit();
  };

  const prePage = () => {
    if (step < 1) return;
    setStep(step - 1);
  }

  const next = submitter !== false && (
    <Button
      key="next"
      type="primary"
      loading={loading}
      {...submitter?.submitButtonProps}
      onClick={() => {
        onSubmit();
      }}
    >
      下一步
    </Button>
  );

  const pre = submitter !== false && (
    <Button
      key="pre"
      {...submitter?.resetButtonProps}
      onClick={() => {
        prePage();
      }}
    >
      上一步
    </Button>
  );

  const submit = submitter !== false && (
    <Button
      key="submit"
      type="primary"
      loading={loading}
      {...submitter?.submitButtonProps}
      onClick={() => {
        onSubmit();
      }}
    >
      提交
    </Button>
  );

  const getActionButton = () => {
    const index = step || 0;
    if (index < 1) {
      return [next] as JSX.Element[];
    }
    if (index + 1 === formArray.length) {
      return [pre, submit] as JSX.Element[];
    }
    return [pre, next] as JSX.Element[];
  }

  const nextPage = () => {
    if (step > formArray.length - 2) return;
    setStep(step + 1);
  }

  const renderSubmitter = () => {
    const submitterDom = getActionButton();
    return submitterDom;
  };

  const formDom = toArray(props.children).map((item, index) => {
    const itemProps = item.props as StepFormProps;
    const name = itemProps.name || `${index}`;
    regForm(name, itemProps);
    /** 是否是当前的表单 */
    const isShow = step === index;

    const config = isShow
      ? {
          submitter: false,
        }
      : {};
    return (
      <div
        className={classNames(`${prefixCls}-step`, {
          [`${prefixCls}-step-active`]: isShow,
        })}
        key={name}
      >
        {React.cloneElement(item, {
          ...config,
          ...itemProps,
          name,
          step: index,
          key: name,
        })}
      </div>
    );
  });

  return (
    <div className={prefixCls}>
      <Form.Provider {...rest}>
        <StepsFormProvide.Provider
          value={{
            loading,
            setLoading,
            keyArray: formArray,
            next: nextPage,
            formArrayRef,
            formMapRef,
            unRegForm,
            onFormFinish,
          }}
        >
          <>
            {stepsDom}
            <div className={`${prefixCls}-container`} style={containerStyle}>
              {formDom}
              <Space>{renderSubmitter()}</Space>
            </div>
          </>
        </StepsFormProvide.Provider>
      </Form.Provider>
    </div>
  );
}

export type { StepFormProps, StepsFormProps };

function StepsFormWarp (
  props: StepsFormProps & {
    children: any;
  },
) {
  return <StepsForm {...props} />;
}

StepsFormWarp.StepForm = StepForm;

export default StepsFormWarp;
