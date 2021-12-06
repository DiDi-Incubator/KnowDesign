import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Popover, Tag, Tooltip } from 'antd';
import Container from '../../container';
import { propsType } from '../type';
import { copyContentFn } from '../../../utils/tools';
import { getBasisInfoConfig, renderColumnTagShow, defaultContainerLayout } from './config';
import './basis-info.less';

export const ProDescription: React.FC<propsType> = (props: propsType) => {
  const { title, dataSource = {}, config = [], labelWidth, labelStyle, titleStyle, needColon = false, containerLayout = defaultContainerLayout, descriptionStyle } = props;
  const [optionList, setOptionList] = useState(getBasisInfoConfig(dataSource, config));
  const [noEdit, setNoEdit] = useState(false); // 控制编辑时保持只有一个元素

  useEffect(() => {
    setOptionList(props.getBasisInfoConfig ? props.getBasisInfoConfig(props.dataSource, props.config) : getBasisInfoConfig(props.dataSource, props.config));
    return () => {
      setOptionList([]);
    }
  }, [props])

  return (
    <div className={`basis-info`} style={descriptionStyle}>
      {title && (
        <div className="basis-title" style={titleStyle}>
          {title}
        </div>
      )}
      {/* Container布局组件，当前awd为自适应布局 */}
      <Container {...containerLayout} >
        {optionList && optionList.map((item, key) => {
          return (
            <div key={item?.key || key} className={`basis-info-item`}>
              <span className={`basis-info-item-label${needColon ? ' needColon' : ''}`} style={{ width: Number(labelWidth) || 80, ...labelStyle, ...item?.labelStyle }}>
                {item?.label}
              </span>
              <div className={`basis-info-item-content`}>
                {(item?.renderCustom || item?.customType) && item?.content && item?.customType !== 'default' ? (
                  renderColumnTagShow(item, { noEdit, setNoEdit })
                ) : item?.content && JSON.stringify(item?.content)?.length > 30 ? (
                  <Tooltip placement="bottomLeft" title={item?.content}>
                    {item?.content}
                  </Tooltip>
                ) : (
                      <span>{item?.content}</span>
                    )}
                {item?.customType !== 'edit' && item?.copy ? (
                  <svg
                    onClick={() => {
                      copyContentFn(item?.content as string);
                    }}
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-fuzhi"></use>
                  </svg>
                ) : null}
              </div>
            </div>
          )
        })}
      </Container>
    </div >
  );
};

