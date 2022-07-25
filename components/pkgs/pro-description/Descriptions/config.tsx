import React, { ReactNode } from 'react';
import { optionItemType, propsType } from '../type';
import { Button, Popover, Tag, Tooltip } from '../../../index';
// import { EditDescription } from './EditDescription';

const classNamePrefix = 'basis-info';

// 布局默认值
export const defaultContainerLayout = {
  gutter: 10,
  awd: true,
  xl: 8,
  xxl: 6
};

// content自定义类型列表
const customTypeList = {
  // 'edit': (optionItem, config?: any) => <EditDescription optionItem={optionItem} config={config} />,
  'highlight': (optionItem, config?: any) => {
    const { content } = optionItem ?? {};
    if (!Array.isArray(content)) {
      return <span style={{ color: '#1890ff' }}>{content ?? '-'}</span>;
    } else {
      return <span style={{ color: '#1890ff' }}>{`${content.length}个`}</span>;
    }
  },
  'tag': (optionItem, config?: any) => {
    const { content } = optionItem ?? {};
    if (!Array.isArray(content)) return <Tag color="green">{content}</Tag> ?? '-';
    if (content.length <= 3)
      return content.map((item: React.ReactNode, index: string | number | null | undefined) => <Tag key={index}>{item}</Tag>);
    return (
      <div className={`${classNamePrefix}-table-item-tags`}>
        {content.slice(0, 3).map((item: React.ReactNode, key: string | number | null | undefined) => (
          <Tag key={key}>{item}</Tag>
        ))}
        <Popover
          placement="bottom"
          content={
            <div className="table-popover">
              {content.map((item: React.ReactNode, key: string | number | null | undefined) => (
                <Tag key={key}>{item}</Tag>
              ))}
            </div>
          }
          trigger="hover"
        >
          <Button className="item-content" size="small" type="dashed">
            共{content.length}个
            </Button>
        </Popover>
      </div>
    );
  },
}

// 将数据处理成符合Description的格式
export const getBasisInfoConfig = (data: any, basisInfoConfig: optionItemType[]): optionItemType[] => {
  const list = basisInfoConfig && basisInfoConfig?.filter(ele => !ele?.invisible).map((item, index, arr) => {
    if (item === arr.slice(-1)?.[0]) {
      return {
        ...item,
        content: data[item?.key] || data[item?.key] === 0 ? data[item?.key] : '-',
      }
    }
    return {
      ...item,
      content: data[item?.key] || data[item?.key] === 0 ? data[item?.key] : '-',
    }
  });
  return list;
};

// 渲染需要处理的详情内容的方法
export const renderColumnTagShow = (optionItem: optionItemType, config?: any): string | ReactNode | any => {
  const { customType, content, renderCustom, needTooltip, tooltipPlace , tooltipNode, ellipsis = true } = optionItem ?? {};
  let sortContent : any = content;
  if (renderCustom) {
    if (typeof renderCustom === 'function') {
      if (typeof content === 'object') {
        sortContent = JSON.stringify(content)
      } 
      return needTooltip 
        ? <Tooltip placement={tooltipPlace || "bottomLeft"} title={tooltipNode || renderCustom(sortContent)}>
            <span className={ellipsis ? 'base-info-item-content-text' : ''}>{renderCustom(sortContent)}</span>
          </Tooltip>
        : <span className={ellipsis ? 'base-info-item-content-text' : ''}>{renderCustom(sortContent)}</span>
    }
    return;
  }
  return customTypeList[customType] ? customTypeList[customType](optionItem, config) : sortContent;
};