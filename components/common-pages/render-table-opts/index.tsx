import React from "react";
import { Popconfirm, Divider, Dropdown, Tooltip } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import { IconFont } from '../../pkgs/icon-project';
import './index.less'
export interface ITableBtn {
  clickFunc?: (params?: any) => void;
  type?: string;
  customFormItem?: string | JSX.Element;
  isRouterNav?: boolean;
  label: string | JSX.Element;
  className?: string;
  needConfirm?: boolean;
  aHref?: string;
  confirmText?: string;
  noRefresh?: boolean;
  loading?: boolean;
  disabled?: boolean;
  invisible?: boolean;
  renderCustomIcon?: () => string | JSX.Element;
}

interface IMoreBtnsProps {
  btns: ITableBtn[];
  data: object;
}

export const MoreBtns = (props: IMoreBtnsProps) => {
  const { btns, data } = props;
  const btnsMenu = (
    <ul className="table-dropdown-btns">
      {btns.map((v, index) => {
        if (v.invisible) return null;

        if (v.isRouterNav) {
          return (
            <li key={index} className="epri-theme">
              {v.label}
            </li>
          );
        }

        // if (v.needTooltip) {
        //   return (
        //     <Tooltip placement="topLeft" title={v.tooltipText ? v.tooltipText : '更多功能请关注商业版'}>
        //       <span key={index}><a style={{ color: '#00000040' }}>{v.label}</a></span>
        //     </Tooltip>
        //   )
        // }

        if (v.clickFunc) {
          if (v.type && v.type === 'custom') {
            return v?.renderCustomIcon ?
              <li key={index} onClick={() => v.clickFunc(data)}>
                {v?.renderCustomIcon()}
              </li>
              :
              <li key={index}>
                <a type="javascript;" key={index} onClick={() => v.clickFunc(data)}>
                  {v.label}
                </a>
              </li>
          }
          if (v.type) {
            return <li key={index} onClick={() => v.clickFunc(data)}>
              <IconFont type={v.type} /><span className={'table-dropdown-btns-icon-content'}>{v.label}</span>
            </li>
          }
          return (
            <li key={index} onClick={() => v.clickFunc(data)} className="epri-theme">
              <a>{v.label}</a>
            </li>
          );
        }
        return (
          <li key={index} className="epri-theme">
            <a>{v.label}</a>
          </li>
        );
      })}
    </ul>
  );
  return (
    <Dropdown
      overlay={btnsMenu}
      trigger={['click', 'hover']}
      placement="bottomLeft"
    >
      <span>
        <EllipsisOutlined style={{ color: '#1473FF' }} />
      </span>
    </Dropdown>
  );
};


export const renderTableOpts = (btns: ITableBtn[], record: any) => {
  const freeBtns = btns.length <= 2 ? btns : ([] as ITableBtn[]).concat(btns).splice(0, 2);
  const moreBtns = ([] as ITableBtn[]).concat(btns).splice(2);

  if (!freeBtns.length) {
    return <a>{"无"}</a>;
  }

  return (
    <>
      <span className={`table-operation`}>
        {freeBtns.map((item, index) => {
          if (item.invisible) return null;

          const getVerticalLine = () => {
            if (index < 1) return;
            // return <></>
            return <Divider type="vertical" style={{ height: "12px", background: "#DCDFE6", margin: "0 10px" }} />;
          };

          if (item.isRouterNav) {
            return (
              <span key={index}>
                {getVerticalLine()}
                <span>{item.label}</span>
              </span>
            );
          }

          if (item.needConfirm) {
            return (
              <Popconfirm
                disabled={item.disabled}
                key={index}
                title={`确认${item.confirmText}?`}
                onConfirm={() => (item as { clickFunc: (record: any) => void }).clickFunc(record)}
                okText="确认"
                cancelText="取消"
              >
                {getVerticalLine()}
                <a type="javascript;">{item.label}</a>
              </Popconfirm>
            );
          }

          if (item.clickFunc) {
            if (item.type && item.type === 'custom') {
              return item?.renderCustomIcon ?
                <span key={index} onClick={() => (item as { clickFunc: (record: any) => void }).clickFunc(record)}>
                  {item?.renderCustomIcon()}
                </span>
                :
                <span key={index}>
                  {getVerticalLine()}
                  <a type="javascript;" key={index} onClick={() => (item as { clickFunc: (record: any) => void }).clickFunc(record)}>
                    {item.label}
                  </a>
                </span>
            }
            if (item.type) {
              return <span key={index} onClick={() => (item as { clickFunc: (record: any) => void }).clickFunc(record)}>
                <Tooltip title={item.label} >
                  <IconFont type={item.type} />
                </Tooltip>
              </span>
            }
            return (
              <span key={index}>
                {getVerticalLine()}
                <a type="javascript;" key={index} onClick={() => (item as { clickFunc: (record: any) => void }).clickFunc(record)}>
                  {item.label}
                </a>
              </span>
            );
          }

          return (
            <span key={index}>
              {getVerticalLine()}
              <a>{item.label}</a>
            </span>
          );
        })}
        {btns.length > 2 ? <MoreBtns btns={moreBtns} data={record} /> : null}
      </span>
    </>
  );
};