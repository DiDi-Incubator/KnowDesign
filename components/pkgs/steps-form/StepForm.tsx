import React, { useContext, useRef, useEffect } from 'react';
import type { FormProps, FormInstance, StepProps } from 'antd';
import type { IXFormProps } from '../x-form';
import { StepsFormProvide } from './index';
import { XForm } from '../x-form/index';

export type StepFormProps<T = Record<string, any>> = {
  step?: number;
  stepProps?: StepProps;
} & Omit<FormProps<T>, 'onFinish'> & IXFormProps

function StepForm<T = Record<string, any>>({
  onFinish,
  step,
  title,
  stepProps,
  ...restProps
}: StepFormProps<T>) {
  const formRef = useRef<FormInstance | undefined>();
  const context = useContext(StepsFormProvide);

  useEffect(() => {
    return () => {
      if (restProps.name) {
        context?.unRegForm(restProps.name);
      }
    };
  }, []);

  if (context && context?.formArrayRef) {
    context.formArrayRef.current[step || 0] = formRef;
  }

  return (
    <XForm
      wrappedComponentRef={formRef}
      onFinish={async (values: any) => {
        if (restProps.name) {
          context?.onFormFinish(restProps.name, values);
        }
        if (onFinish) {
          context?.setLoading(true);
          // 如果报错，直接抛出
          const success = await onFinish?.(values);

          if (success) {
            context?.next();
          }
          context?.setLoading(false);
          return;
        }
        context?.next();
      }}
      layout="vertical"
      {...restProps}
    />
  );
}

export default StepForm;
