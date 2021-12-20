import React, { useContext, useRef, useEffect } from 'react';
import type { FormProps, FormInstance, StepProps } from 'antd';
import type { IXFormProps } from '../x-form';
import { StepsFormProvide } from './index';
import { XForm } from '../x-form/index';

export type StepFormProps = {
  step?: number;
  stepProps?: StepProps;
} & FormProps & IXFormProps

function StepForm({
  onFinish,
  step,
  title,
  stepProps,
  ...restProps
}: StepFormProps) {
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
