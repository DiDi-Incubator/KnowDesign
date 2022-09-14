import classNames from 'classnames';
import CSSMotion, { CSSMotionList } from 'rc-motion';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import collapseMotion from '../_util/motion';
import { FormItemPrefixContext } from './context';
import type { ValidateStatus } from './FormItem';
import useDebounce from './hooks/useDebounce';

const EMPTY_LIST: React.ReactNode[] = [];

interface ErrorEntity {
  error: React.ReactNode;
  errorStatus?: ValidateStatus;
  key: string;
}

function toErrorEntity(
  error: React.ReactNode,
  errorStatus: ValidateStatus | undefined,
  prefix: string,
  index: number = 0,
): ErrorEntity {
  return {
    key: typeof error === 'string' ? error : `${prefix}-${index}`,
    error,
    errorStatus,
  };
}

export interface ErrorListProps {
  help?: React.ReactNode;
  helpStatus?: ValidateStatus;
  errors?: React.ReactNode[];
  warnings?: React.ReactNode[];
  className?: string;
  onVisibleChanged?: (visible: boolean) => void;
}

export default function ErrorList({
  help,
  helpStatus,
  errors = EMPTY_LIST,
  warnings = EMPTY_LIST,
  className: rootClassName,
  onVisibleChanged,
}: ErrorListProps) {
  const { prefixCls } = React.useContext(FormItemPrefixContext);
  const { getPrefixCls } = React.useContext(ConfigContext);

  const baseClassName = `${prefixCls}-item-explain`;
  const rootPrefixCls = getPrefixCls();

  // We have to debounce here again since somewhere use ErrorList directly still need no shaking
  // ref: https://github.com/ant-design/ant-design/issues/36336
  const debounceErrors = useDebounce(errors);
  const debounceWarnings = useDebounce(warnings);

  const fullKeyList = React.useMemo(() => {
    if (help !== undefined && help !== null) {
      return [toErrorEntity(help, helpStatus, 'help')];
    }

    return [
      ...debounceErrors.map((error, index) => toErrorEntity(error, 'error', 'error', index)),
      ...debounceWarnings.map((warning, index) =>
        toErrorEntity(warning, 'warning', 'warning', index),
      ),
    ];
  }, [help, helpStatus, debounceErrors, debounceWarnings]);

  return (
    <CSSMotion
      motionDeadline={collapseMotion.motionDeadline}
      motionName={`${rootPrefixCls}-show-help`}
      visible={!!fullKeyList.length}
      onVisibleChanged={onVisibleChanged}
    >
      {holderProps => {
        const { className: holderClassName, style: holderStyle } = holderProps;

        return (
          <div
            className={classNames(baseClassName, holderClassName, rootClassName)}
            style={holderStyle}
          >
            <CSSMotionList
              keys={fullKeyList}
              {...collapseMotion}
              motionName={`${rootPrefixCls}-show-help-item`}
              component={false}
            >
              {itemProps => {
                const {
                  key,
                  error,
                  errorStatus,
                  className: itemClassName,
                  style: itemStyle,
                } = itemProps;

                return (
                  <div
                    key={key}
                    role="alert"
                    className={classNames(itemClassName, {
                      [`${baseClassName}-${errorStatus}`]: errorStatus,
                    })}
                    style={itemStyle}
                  >
                    {error}
                  </div>
                );
              }}
            </CSSMotionList>
          </div>
        );
      }}
    </CSSMotion>
  );
}
