import React, { useContext, useRef, useEffect } from 'react';
import type { FormInstance, StepProps } from '../../index';
import type { IXFormProps } from '../x-form';
import { StepsFormContext } from './index';
import { XForm } from '../x-form/index';

export type StepFormProps = {
  step?: number;
  title?: string;
  name?: string;
  stepProps?: Omit<StepProps, 'title'>;
  XFormProps: Omit<IXFormProps, 'onFinish'>;
  onFinish?: (values: Record<string, any>) => boolean;
}

function StepForm({
  onFinish,
  step,
  title,
  stepProps,
  XFormProps,
  ...restProps
}: StepFormProps) {
  const formRef = useRef<FormInstance | undefined>();
  const context = useContext(StepsFormContext);

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
      {...XFormProps}
    />
  );
}

export default StepForm;
