import { Tooltip, IconFont } from '../../../index';
import Descriptions from './DDescriptions';
import React, { memo, useEffect, useState, useCallback,useRef } from 'react';
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
}

const defaultContentStyle = {}

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
  // const [refWidth, setRefWidth] = useState<any>(null);
  // const [contentWidth, setContentWidth] = useState(0);
  // const descRef = useCallback((node)=>{
  //   if(node !== null){
  //     setRefWidth(node.getBoundingClientRect().width)
  //   }
  // },[]);
  // const resizeRef = useRef<HTMLDivElement>(null);
  // const resizeChange = () => {
  //   setRefWidth(resizeRef?.current?.offsetWidth)
	// };

  // useEffect(() => {
  //   // 监听
  //   window.addEventListener('resize', resizeChange);
  //   // 销毁
  //   return () => window.removeEventListener('resize', resizeChange);
  // }, []);

  const {
    title,
    dataSource = {},
    config = [],
    labelWidth="150px",
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
    customTitle
  } = props;

  const [optionList, setOptionList] = useState<any>(null);
  useEffect(() => {
    setOptionList(props.getBasisInfoConfig ? props.getBasisInfoConfig(props.dataSource, props.config) : getBasisInfoConfig(props.dataSource, props.config));
    return () => {
      setOptionList([]);
    }
  }, [props])

  // useEffect(()=>{
  //   const newColumns = {...defaultColumn, ...column};
  //   const windowWidth = window.innerWidth;
  //   let newLabelWidth = 150;
  //   if(labelWidth && !labelStyle?.width){
  //     newLabelWidth = labelWidth.includes('%') ? refWidth * (parseInt(labelWidth) / 100) : parseInt(labelWidth);
  //   }else if(labelStyle?.width){
  //     newLabelWidth = labelStyle?.width.includes('%') ? refWidth * (parseInt(labelStyle?.width) / 100) : parseInt(labelStyle?.width);
  //   }
  //   console.log(newLabelWidth,'newLabelWidth');
  //   if(windowWidth >= 1440){
  //     setContentWidth((refWidth/newColumns.xxl)-newLabelWidth)
  //   }else if(windowWidth < 1440 && windowWidth >= 992){
  //     setContentWidth((refWidth/newColumns.xl)-newLabelWidth)
  //   }else if(windowWidth < 993 && windowWidth >= 768){
  //     setContentWidth((refWidth/newColumns.lg)-newLabelWidth)
  //   }else if(windowWidth < 768 && windowWidth >= 576){
  //     setContentWidth((refWidth/newColumns.sm)-newLabelWidth)
  //   }else if(windowWidth < 576){
  //     setContentWidth((refWidth/newColumns.xs)-newLabelWidth)
  //   }
  // },[refWidth])

  return (
      <Descriptions
        className={`base-info${bordered ? ' borderedClass' : ''}`}
        layout={layout}
        title={title && noDefaultTitle ? defaultTitle(title) : customTitle ? customTitle() : null}
        column={{ ...defaultColumn, ...column }}
        bordered={bordered}
        labelStyle={{ ...defaultLabelStyle , ...labelStyle }}
        contentStyle={{...contentStyle}}
      >
        {optionList && optionList.map((item, index) => (
          <Descriptions.Item key={index} label={`${item.label}${needColon ? ' :' : ''}`} span={item.span ?? 1} >
            <div className={`base-info-item-content`}>
              {/* {item?.content?.length > 40 || JSON.stringify(item?.content).length > 40 ? (
                <Tooltip placement="bottomLeft" title={item?.content} >
                  {item?.content}
                </Tooltip>
              ) : (
                  <span>{item?.content}</span>
                )} */}
              {(item?.renderCustom || item?.customType) && (item?.content || item?.content === 0) && item?.customType !== 'default' ? (
                renderColumnTagShow(item)
                // renderColumnTagShow(item, { noEdit, setNoEdit })
              ) : (item?.content && JSON.stringify(item?.content)?.length > 40)||item.needTooltip? (
                // <Tooltip placement="bottomLeft" title={item?.content}>
                //   <span className={'base-info-item-content-text'}>{item?.content}</span>
                // </Tooltip>
                <Tooltip placement={item.tooltipPlace || "bottomLeft"} title={item?.content}>
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
