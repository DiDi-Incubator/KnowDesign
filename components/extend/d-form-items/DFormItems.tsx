import React, { useRef } from 'react';
import classNames from 'classnames';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { Button, Input, Form, Row, Col, Select, ConfigProvider } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons'
import { PlusOutlined } from '@ant-design/icons'
import { useIntl } from '../../locale-provider';
import DEmptyLine from '../d-empty-line/DEmptyLine';
import useDynamicList from '../../hook/use-dynamic-list';

declare const ItemSizes: ['large', 'middle', 'small'];
export declare type ItemSize = typeof ItemSizes[number];

declare const ColumnTypes: ['select', 'input', 'custom'];
export declare type ColumnType = typeof ColumnTypes[number];

const FormItem = Form.Item;
const { Option } = Select;

interface IColumnsType {
  type: ColumnType;
  title: string | React.ReactNode;
  colSpan?: number;
  placeholder?: string;
  required?: boolean;
  rules?: any[];
  component?: React.ReactNode;
  isSelectUniq?: boolean;
  selectOptions?: {
    title: string;
    value: string;
  }[];
  showColon?: boolean;
}

export interface IBasicFormItemsProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  errorMessage?: string | React.ReactNode;
  addNode?: string | React.ReactNode;
  form: any;
  fieldName: string; // 这个前缀会同时加在field，和dataSource每个属性前面
  columns: IColumnsType[];
  size?: ItemSize;
  maxCount?: number;
  dataSource?: any;
  antConfig?: {} & ConfigProviderProps;
}

function getColSpan(cols, index, spans) {
  const colItem = cols[index];
  if (colItem && colItem.colSpan) {
    return colItem.colSpan;
  }

  if (spans && spans[index]) {
    return spans[index];
  }

  return 3;
}

const BasicFormItems: React.FC<IBasicFormItemsProps> = props => {
  const prefixCls = `${props.prefixCls || 'dantd'}-basic-form-items`;
  const { t } = useIntl();
  const renderTimes = useRef(-1);
  const {
    className,
    style,
    columns = [] as IColumnsType[],
    dataSource = [] as any,
    maxCount,
    size = 'middle',
    errorMessage,
    fieldName,
    form
  } = props;
  const wrapperClassName = classNames(prefixCls, className);

  const { getFieldValue } = form;
  const { list, remove, getKey, push } = useDynamicList(dataSource);
  let autoColumnSpanSum = 0;
  let autoColumnSpans = columns.map(() => {
    autoColumnSpanSum += Math.floor(23 / columns.length);
    return Math.floor(23 / columns.length);
  });
  autoColumnSpanSum = 23 - autoColumnSpanSum;
  for (let i = autoColumnSpans.length - 1; i >= 0; i--) {
    if (autoColumnSpanSum > 0) {
      autoColumnSpanSum--;
      autoColumnSpans[i] += 1;
    }
  }

  let disabledAdd = false;
  if (maxCount && maxCount > 0 && list && list.length >= maxCount) {
    disabledAdd = true;
  }

  function renderErrors(msg) {
    if (!msg) {
      return null;
    }

    if (typeof msg === 'string') {
      return <div className={`${prefixCls}-error-msg`}>{msg}</div>;
    } else {
      return msg;
    }
  }

  const defaultValue = (list, fieldName, index, colIndex) => {
    const obj = {};
    list.map((ele, index) => {
      obj[`${fieldName}[${getKey(index)}][${colIndex}]`] = ele[colIndex];
    })
    return obj
  }

  function renderInputItem(ele, index, colItem, colIndex) {
    const { title, required, placeholder, rules } = colItem;
    const itemPlaceholder = placeholder ? placeholder : `${t('form.placeholder.prefix')} ${title}`;

    let itemRules = rules || null;
    if (required) {
      itemRules = [
        {
          required: true,
          message: itemPlaceholder,
        },
      ];
    }

    return (
      <FormItem
        name={`${fieldName}[${getKey(index)}][${colIndex}]`}
        rules={itemRules}
      >
        <Input data-testid="field-input"
          size={size}
          placeholder={itemPlaceholder} />
      </FormItem>
    );
  }

  function renderSelectItem(ele, index, colItem, colIndex) {
    const { title, required, placeholder, rules, selectOptions = [], isSelectUniq } = colItem;
    const itemPlaceholder = placeholder ? (
      placeholder
    ) : (
      <>
        {t('form.selectplaceholder.prefix')}
        &nbsp;
        {title}
      </>
    );

    let itemRules = rules || null;
    if (required) {
      itemRules = [
        {
          required: true,
          message: itemPlaceholder,
        },
      ];
    }
    let fieldVals = [] as any[];
    if (renderTimes.current > 0) {
      fieldVals = getFieldValue(fieldName) || [];
    }

    let tmpSelectOptions = selectOptions;

    if (isSelectUniq && fieldVals && fieldVals.length > 0) {
      const selectedVals = fieldVals
        .filter((selEle, selIdx) => {
          return selIdx !== getKey(index);
        })
        .map(selEle => selEle[colIndex]);
      tmpSelectOptions = selectOptions.filter(
        optionEle => selectedVals.indexOf(optionEle.value) < 0,
      );
    }

    return (
      <FormItem
        name={`${fieldName}[${getKey(index)}][${colIndex}]`}
        rules={itemRules}
      >
        <Select
          data-testid="select"
          size={size}
          allowClear
          placeholder={itemPlaceholder}
          showSearch={true}
          style={{ width: '100%' }}
        >
          {tmpSelectOptions.map((option, optionIdx) => {
            return (
              <Option
                data-testid="select-option"
                key={`${fieldName}[${getKey(index)}][${colIndex}].col${optionIdx}`}
                value={option.value}
              >
                {option.title}
              </Option>
            );
          })}
        </Select>
      </FormItem>
    );
  }

  function renderCustomItem(ele, index, colItem, colIndex) {
    const { title, required, placeholder, rules, component } = colItem;
    const itemPlaceholder = placeholder ? placeholder : `${t('form.placeholder.prefix')}${title}`;

    let itemRules = rules || null;
    if (required) {
      itemRules = [
        {
          required: true,
          message: itemPlaceholder,
        },
      ];
    }

    return (
      <FormItem
        name={`${fieldName}[${getKey(index)}][${colIndex}]`}
        rules={itemRules}
      >
        {component}
      </FormItem>
    )
  }

  renderTimes.current++;
  return (
    <ConfigProvider {...props.antConfig}>
      <div className={wrapperClassName} style={style}>
        {list.map((ele, index) => {
          return (
            <Row
              data-testid="row"
              wrap
              style={{ maxWidth: '100%' }}
              gutter={16}
              key={`${fieldName}-row-${index}`}
            >
              {columns.map((colItem, colIndex) => {
                return (
                  <Col
                    key={`${fieldName}-col-${index}-${colIndex}`}
                    span={colItem.colSpan || getColSpan(columns, colIndex, autoColumnSpans)}
                    className={colItem.showColon ? `${prefixCls}-item-title` : ''}
                  >
                    <Form
                      form={form}
                      initialValues={defaultValue(list, fieldName, index, colIndex)}
                    >
                      {colItem.type === 'input' && renderInputItem(ele, index, colItem, colIndex)}
                      {colItem.type === 'select' && renderSelectItem(ele, index, colItem, colIndex)}
                      {colItem.type === 'custom' && renderCustomItem(ele, index, colItem, colIndex)}
                    </Form>
                  </Col>
                );
              })}

              <Col span={1}>
                <MinusCircleOutlined
                  data-testid="btn-remove"
                  className={`${prefixCls}-item-del-btn`}
                  onClick={() => remove(index)}
                />
              </Col>
            </Row>
          );
        })}
        <Button
          data-testid="btn-add"
          disabled={disabledAdd}
          size={size}
          type="dashed"
          onClick={() => {
            push([] as any);
          }}
          style={{ width: '100%' }}
        >
          {props.addNode ? (
            props.addNode
          ) : (
            <span>
              <PlusOutlined />
              {/* 增加自定义参数 */}
              {t('form.item.add')}
            </span>
          )}
        </Button>
        <DEmptyLine height={10} />
        {errorMessage && renderErrors(errorMessage)}
      </div>
    </ConfigProvider>
  );
};

export default BasicFormItems;
