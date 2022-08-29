import React, { useEffect, useState } from 'react';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Input, message, Tooltip } from 'knowdesign';

export const EditDescription = (props) => {
  const { content, required, validator, onSubmit } = props.optionItem;
  const { noEdit, setNoEdit } = props.config;
  const [data, setData] = useState(content); // 控制提交
  const [value, setValue] = useState(content); // 控制表单
  const [isEdit, setEdit] = useState(false); // 是否可编辑
  const [validatorStr, setValidatorStr] = useState(''); // 校验文本
  const [validatorVisible, setValidatorVisible] = useState(false); // 校验Tooltip显示

  const strToJson = (str) => {
    try {
      var json = eval('(' + str + ')');
      return json;
    } catch {
      return {};
    }
  };

  useEffect(() => {
    setData(content);
    setValue(content);
  }, [content]);

  const onChange = (e) => {
    setValidatorVisible(false);
    setValue(e.target.value);
  };

  const confirmClick = async () => {
    if (required && (value === '' || value === null || value === undefined)) {
      setValidatorStr('填写项不能为空');
      setValidatorVisible(true);
      return;
    }
    if (validator && !strToJson(validator)(value, setValidatorStr)) {
      setValidatorVisible(true);
      return;
    }

    onSubmit ? await onSubmit(value) : setData(value); // 传入单行提交事件
    setEdit(false);
    setNoEdit(false);
    setValidatorVisible(false);
  };
  return (
    <>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        {isEdit && (
          <Tooltip
            mouseLeaveDelay={0.2}
            visible={validatorVisible}
            title={validatorStr}
            placement="topLeft"
          >
            <Input
              style={{
                flex: 1,
                width: '100%',
              }}
              // onBlur={() => {
              //   setEdit(false)
              //   setNoEdit(false)
              // }}
              defaultValue={value}
              value={value}
              onChange={onChange}
            />
          </Tooltip>
        )}
        {!isEdit &&
          (data.length > 40 ? (
            <Tooltip placement="topLeft" title={data}>
              <span style={{ flex: 1 }}>{data}</span>
            </Tooltip>
          ) : (
            <span style={{ flex: 1 }}>{data}</span>
          ))}
        {!isEdit && (
          <EditOutlined
            onClick={() => {
              if (noEdit) {
                message.warning('只能编辑一个');
                return;
              }
              !onSubmit && setValue(data); // 未传onSubmit时控制回显同步
              setEdit(true);
              setNoEdit(true);
            }}
          />
        )}
        {isEdit && (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <CheckOutlined style={{ color: '#1890ff' }} onClick={confirmClick} />
            <CloseOutlined
              style={{ color: '#1890ff' }}
              onClick={() => {
                setEdit(false);
                setNoEdit(false);
                setValidatorVisible(false);
                setValue(data);
              }}
            />
          </span>
        )}
      </span>
    </>
  );
};
