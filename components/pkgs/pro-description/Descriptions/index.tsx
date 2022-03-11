import { Tooltip, IconFont } from '../../../index';
import Descriptions from './DDescriptions';
import React, { memo, useEffect, useState } from 'react';
import { getBasisInfoConfig, defaultContainerLayout, renderColumnTagShow } from './config';
import { propsType } from '../type';
import './style/index.less';
import { copyContentFn } from '../../../utils/tools';
interface optionItemType {
  label: string;
  content?: any;
  copy?: boolean;
  span?: number;
}

// interface propsType {
//   title?: string;
//   optionList: optionItemType[];
//   column?: number;
// }

const defaultColumn = {
  xxl: 3,
  xl: 2,
  lg: 2,
  md: 2,
  sm: 2,
  xs: 1,
}

const defaultLayout = 'horizontal';

const defaultLabelStyle = {
  minWidth: '80px',
  // width: '150px',
  textAlign: 'right',
  marginRight: '5px',
  whiteSpace: 'nowrap',
  lineHeight: '42px',
  padding: '0 10px 0 0',
  color: '#74788D',
  backgroundColor: '#F8F9FA',
  borderColor: '#EFF2F7',
}

const defaultTitle = (title) => {
  return <div style={{
    display: 'flex',
    alignItems: 'center',
  }}>
    <div style={{ fontSize: '13px' }}>{title}</div>
    <div className={'title-line'} style={{
      height: '1px',
      background: '#F6F6F6',
      width: '100%',
      marginLeft: '10px'
    }}></div>
  </div>
}

export const ProDescriptions: React.FC<propsType> = memo((props: propsType) => {
  const {
    title,
    dataSource = {},
    config = [],
    labelWidth,
    labelStyle = defaultLabelStyle,
    titleStyle,
    needColon = false,
    containerLayout = defaultContainerLayout,
    descriptionStyle,
    bordered = true,
    layout = defaultLayout,
    noDefaultTitle = true,
    column = defaultColumn,
    customTitle
  } = props;
  const [optionList, setOptionList] = useState<any>(null);

  useEffect(() => {
    setOptionList(props.getBasisInfoConfig ? props.getBasisInfoConfig(props.dataSource, props.config) : getBasisInfoConfig(props.dataSource, props.config));
    return () => {
      setOptionList([]);
    }
  }, [props])
  return (
    <Descriptions
      className={`base-info${bordered ? ' borderedClass' : ''}`}
      layout={layout}
      title={title && noDefaultTitle ? defaultTitle(title) : customTitle ? customTitle() : null}
      column={{ ...defaultColumn, ...column }}
      bordered={bordered}
      labelStyle={{ width: labelWidth ? labelWidth : '150px', ...labelStyle }}
    >
      {optionList && optionList.map((item, index) => (
        <Descriptions.Item key={index} label={`${item.label}${needColon ? ' :' : ''}`} span={item.span ?? 1}>
          <div className={`base-info-item-content`}>
            {/* {item?.content?.length > 40 || JSON.stringify(item?.content).length > 40 ? (
              <Tooltip placement="bottomLeft" title={item?.content} >
                {item?.content}
              </Tooltip>
            ) : (
                <span>{item?.content}</span>
              )} */}
            {(item?.renderCustom || item?.customType) && item?.content && item?.customType !== 'default' ? (
              renderColumnTagShow(item)
              // renderColumnTagShow(item, { noEdit, setNoEdit })
            ) : item?.content && JSON.stringify(item?.content)?.length > 40 ? (
              <Tooltip placement="bottomLeft" title={item?.content}>
                <span className={'base-info-item-content-text'}>{item?.content}</span>
              </Tooltip>
            ) : (
                  <span className={'base-info-item-content-text'}>{item?.content}</span>
                )}
            {item.copy ? (
              <IconFont
                style={{ marginLeft: '5px' }}
                onClick={() => {
                  copyContentFn(item?.content as string);
                }}
                type='icon-bianji'
              />
            ) : null}
          </div>
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
});
