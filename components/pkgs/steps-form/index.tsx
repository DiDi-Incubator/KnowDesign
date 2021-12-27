import React, { useRef, useCallback, useEffect, useState, useImperativeHandle } from 'react';
import type { StepsProps, FormInstance } from 'antd';
import { Steps, Button, Space } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import classNames from 'classnames';
import type { StepFormProps } from './StepForm';
import StepForm from './StepForm';
import type { SubmitterProps } from '../submitter';
import './index.less';

type StepsFormProps = {
  current?: number;
  onCurrentChange?: (current: number) => void;
  stepsProps?: StepsProps;
  onFinish?: (values: Record<string, any>) => Promise<boolean | void>;
  submitter?:
    | SubmitterProps<{
        step: number;
        onSubmit: () => void;
        onPre: () => void;
        form?: FormInstance<any>;
      }>
    | false;
};

export const StepsFormContext = React.createContext<
  | {
      unRegForm: (name: string) => void;
      onFormFinish: (name: string, formData: any) => void;
      formArrayRef: any;
      loading: boolean;
      setLoading: (loading: boolean) => void;
      next: () => void;
    }
  | undefined
>(undefined);
function StepsForm (
  props: StepsFormProps & {
    children: any;
  },
) {
  
  const prefixCls = 'dcloud-design-steps-form';

  const {
    submitter,
    stepsProps,
    onFinish
  } = props;
  const formDataRef = useRef(new Map<string, Record<string, any>>());
  const formMapRef = useRef(new Map<string, StepFormProps>());
  const formArrayRef = useRef<any[]>([]);

  const [formArray, setFormArray] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
      {...submitter?.submitButtonProps}
      onClick={() => {
        onSubmit();
      }}
    >
      {submitter?.buttonConfig.nextText || '下一步'}
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
     {submitter?.buttonConfig.resetText || '上一步'}
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
      {submitter?.buttonConfig.submitText || '提交'}
    </Button>
  );

  const getActionButton = () => {
    const index = step || 0;
    if (index < 1) {
      return [next]
    }
    if (index + 1 === formArray.length) {
      return [pre, submit]
    }
    return [pre, next]
  }

  const nextPage = () => {
    if (step > formArray.length - 2) return;
    setStep(step + 1);
  }

  const renderSubmitter = () => {
    const submitterDom = getActionButton();
    if (submitter && submitter.render) {
      const submitterProps: any = {
        form: formArrayRef.current[step]?.current,
        onSubmit,
        step,
        onPre: prePage,
      };
      return submitter.render(submitterProps, submitterDom) as React.ReactNode;
    }
    if (submitter && submitter?.render === false) {
      return null;
    }
    return submitterDom;
  };

  const formDom = Array.from(props.children).map((item: any, index: number) => {
    const itemProps = item.props;
    const name = itemProps.name || `${index}`;

    regForm(name, itemProps);

    const isShow = step === index;

    return (
      <div
        className={classNames(`${prefixCls}-step`, {
          [`${prefixCls}-step-active`]: isShow,
        })}
        key={name}
      >
        {React.cloneElement(item, {
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
        <StepsFormContext.Provider
          value={{
            loading,
            setLoading,
            next: nextPage,
            formArrayRef,
            unRegForm,
            onFormFinish,
          }}
        >
          <>
            {stepsDom}
            <div className={`${prefixCls}-container`}>
              {formDom}
              <Space>{renderSubmitter()}</Space>
            </div>
          </>
        </StepsFormContext.Provider>
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

StepsFormWarp.Item = StepForm;

export default StepsFormWarp;
