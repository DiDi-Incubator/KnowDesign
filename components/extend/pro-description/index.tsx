import React, { memo, useEffect, useState } from 'react';
import { Tooltip, IconFont, Utils } from 'knowdesign';
import Descriptions from './DDescriptions';
import { getBasisInfoConfig, defaultContainerLayout, renderColumnTagShow } from './config';
import { optionItemType, propsType } from './type';

const { copyContentFn } = Utils;
// interface optionItemType {
//   label: string;
//   content?: any;
//   copy?: boolean;
//   span?: number;
// }

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
};

const defaultLayout = 'horizontal';

const defaultLabelStyle = {
  minWidth: '100px',
  width: '200px',
  textAlign: 'right',
  marginRight: '5px',
  whiteSpace: 'nowrap',
  lineHeight: '42px',
  padding: '0 10px 0 0',
  color: '#74788D',
  backgroundColor: '#F8F9FA',
  borderColor: '#EFF2F7',
};

const defaultContentStyle = {};

const defaultTitle = (title) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '13px' }}>{title}</div>
      <div
        className={'title-line'}
        style={{
          height: '1px',
          background: '#F6F6F6',
          width: '100%',
          marginLeft: '10px',
        }}
      ></div>
    </div>
  );
};

const ProDescription: React.FC<propsType> = memo((props: propsType) => {
  const {
    title,
    dataSource = {},
    config = [],
    labelWidth = '150px',
    labelStyle,
    titleStyle,
    contentStyle = defaultContentStyle,
    needColon = false,
    containerLayout = defaultContainerLayout,
    descriptionStyle,
    bordered = true,
    layout = defaultLayout,
    noDefaultTitle = true,
    column,
    customTitle,
  } = props;
  console.log(props, 'props');
  const [optionList, setOptionList] = useState<any>(null);
  useEffect(() => {
    setOptionList(
      props.getBasisInfoConfig
        ? props.getBasisInfoConfig(dataSource, config)
        : getBasisInfoConfig(dataSource, config),
    );
    return () => {
      setOptionList([]);
    };
  }, [props]);

  return (
    <Descriptions
      className={`base-info${bordered ? ' borderedClass' : ''}`}
      layout={layout}
      title={
        title ? (noDefaultTitle ? defaultTitle(title) : title) : customTitle ? customTitle() : null
      }
      column={{ ...defaultColumn, ...column }}
      bordered={bordered}
      labelStyle={bordered ? { ...defaultLabelStyle, ...labelStyle } : labelStyle}
      contentStyle={{ ...contentStyle }}
    >
      {optionList &&
        optionList.map((item: optionItemType, index: number) => (
          <Descriptions.Item
            key={index}
            label={`${item.label}${needColon ? ' :' : ''}`}
            span={item.span ?? 1}
          >
            <div className={`base-info-item-content`}>
              {(item?.renderCustom || item?.customType) &&
              (item?.content || item?.content === 0) &&
              item?.customType !== 'default' ? (
                renderColumnTagShow(item)
              ) : (item?.content && JSON.stringify(item?.content)?.length > 40) ||
                item.needTooltip ? (
                <Tooltip placement={item.tooltipPlace || 'bottomLeft'} title={item?.content}>
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
                  type="icon-bianji"
                />
              ) : null}
            </div>
          </Descriptions.Item>
        ))}
    </Descriptions>
  );
});

export default ProDescription;
