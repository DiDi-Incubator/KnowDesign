import React, { useState, useEffect } from 'react';
import { Input, Button, Table, ConfigProvider, Tooltip } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import QueryForm, { IQueryFormProps } from "../query-form";
import IconProject from '../icon-project';
import FilterTableColumns from './filterTableColumns';
import './index.less';
// 表格国际化无效问题手动加
import antdZhCN from 'antd/es/locale/zh_CN';

export const DTablerefix = 'd-table';

export const pagination = {
  // position: 'bottomRight',
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100', '200', '500'],
  showTotal: (total: number) => `共 ${total} 条`,
  // hideOnSinglePage: true,
};

export interface ITableBtn {
  clickFunc?: () => void;
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default' | 'custom';
  customFormItem?: string | JSX.Element;
  // isRouterNav?: boolean;
  label: string | JSX.Element;
  className?: string;
  // needConfirm?: boolean;
  // aHref?: string;
  // confirmText?: string;
  noRefresh?: boolean;
  loading?: boolean;
  disabled?: boolean;
  // invisible?: boolean; // 不可见
}

export interface ISearchInput {
  placeholder?: string;
  submit: (params?: any) => any;
  width?: string;
  searchTrigger?: string;
}

export interface IDTableProps {
  showHeader?: boolean;
  paginationProps?: any;
  noPagination?: boolean;
  rowKey: string;
  columns: any[];
  dataSource: any[];
  loading?: boolean;
  reloadData?: (params?: any) => any;
  getOpBtns?: (params?: any) => ITableBtn[];
  getJsxElement?: (params?: any) => JSX.Element;
  tableHeaderSearchInput?: ISearchInput;
  attrs?: any;
  searchInputRightBtns?: ITableBtn[];
  showQueryForm?: boolean;
  queryFormProps?: any;
  isShow?: any;
  tableId?: string;
}

export const DTable = (props: IDTableProps) => {
  const [isShow, setIsShow] = useState(false);
  const [filterColumns, setFilterColumns] = useState([]);
  const [filterColumnsVisible, setFilterColumnsVisible] = useState(false);

  const clickFunc = () => {
    setIsShow(!isShow)
  }

  const filterTableColumns = (columns) => {
    setFilterColumnsVisible(true)
  }

  const renderSearch = () => {
    if (!props?.tableHeaderSearchInput) return;
    const { searchInputRightBtns = [] } = props;
    const { placeholder = null, submit, width, searchTrigger = 'change' } = props?.tableHeaderSearchInput;
    return (
      <div className={`${DTablerefix}-box-header-search`}>
        <div>
          <Input
            placeholder={placeholder || '请输入关键字'}
            style={{ width: width || 200 }}
            onChange={(e) => searchTrigger === 'change' && submit(e.target.value)}
            onPressEnter={(e: any) => searchTrigger === 'enter' && submit(e.target.value)}
            onBlur={(e: any) => searchTrigger === 'blur' && submit(e.target.value)}
            suffix={<SearchOutlined style={{ color: '#ccc' }} />}
          />
        </div>
        <div className={`${DTablerefix}-box-header-search-custom`}>
          {searchInputRightBtns.length > 0 ? searchInputRightBtns.map((item, index) => {
            if (item?.type === 'custom') {
              return (
                <span style={{ marginLeft: 10 }} className={item.className} key={index}>
                  {item?.customFormItem || item.label}
                </span>
              );
            }
            return item.noRefresh ? (
              <Button type={item.type} className={item.className} key={index}>
                {item.label}
              </Button>
            ) : (
                <Button type={item.type} disabled={item.disabled} loading={item.loading} key={index} className={item.className} onClick={item.clickFunc}>
                  {' '}
                  {item.label}{' '}
                </Button>
              );
          }) : <>
              <span style={{ marginLeft: 10 }}>
                <IconProject type='edit' onClick={clickFunc} />
              </span>
              <span style={{ marginLeft: 10 }}>
                <IconProject type='delete' onClick={() => filterTableColumns(columns)} />
              </span>
            </>}
        </div>
      </div>
    );
  };

  const renderTableInnerOp = (reloadFunc: any, btns?: ITableBtn[], element?: JSX.Element) => {
    return (
      <div className={`${DTablerefix}-box-header-btn`}>
        {reloadFunc && <ReloadOutlined className="reload" onClick={reloadFunc} />}
        {btns?.map((item, index) => {
          return item.noRefresh ? (
            <Button className={item.className} key={index}>
              {item.label}
            </Button>
          ) : (
              <Button disabled={item.disabled} loading={item.loading} key={index} className={item.className} onClick={item.clickFunc}>
                {' '}
                {item.label}{' '}
              </Button>
            );
        })}
        {element}
      </div>
    );
  };

  const renderColumns = (columns: any[]) => {
    console.log(columns, 'columns-ss')
    return columns.filter(item => !item.invisible).map((currentItem: any) => {
      return {
        ...currentItem,
        showSorterTooltip: false,
        onCell: () => {
          return {
            style: {
              maxWidth: currentItem.width,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            },
          };
        },
        render: (...args) => {
          const value = args[0];
          const renderData = currentItem.render
            ? currentItem.render(...args)
            : value === '' || value === null || value === undefined
              ? '-'
              : value;
          const notTooltip = currentItem.render || renderData === '-';
          return !notTooltip ? (
            <Tooltip placement="bottomLeft" title={renderData}>
              <span>{renderData}</span>
            </Tooltip>
          ) : (
              renderData
            );
        },
      };
    });
  };

  const {
    rowKey,
    loading,
    dataSource,
    columns,
    paginationProps = pagination,
    noPagination,
    reloadData,
    getOpBtns = () => [],
    getJsxElement = () => <></>,
    attrs,
    showHeader = true,
    showQueryForm,
    queryFormProps,
    tableId = ''
  } = props;

  const newTableId = `${rowKey}-${tableId}`;

  useEffect(() => {
    const invisibleColumns = JSON.parse(localStorage.getItem(newTableId));

    if (invisibleColumns) {
      const newFilterColumns = columns.map(item => {
        return {
          ...item,
          invisible: !invisibleColumns.includes(item.dataIndex)
        }
      });

      setFilterColumns(newFilterColumns)
    } else {
      setFilterColumns(columns);
    }

  }, [columns]);

  // useEffect(() => {
  //   const invisibleColumns = JSON.parse(localStorage.getItem(newTableId));
  //   const newFilterColumns = [];
  //   for (const i of columns) {
  //     if (invisibleColumns.includes(i.key)) {
  //       newFilterColumns.push({
  //         ...i,
  //         invisible: true
  //       })
  //     } else {
  //       newFilterColumns.push(i)
  //     }
  //   }
  //   console.log(newFilterColumns, 'newFilterColumns');
  //   setFilterColumns(newFilterColumns);
  // }, [JSON.parse(localStorage.getItem(newTableId))]);

  return (
    <>
      <ConfigProvider locale={antdZhCN}>
        <div className={`${DTablerefix}`}>
          <div className={`${DTablerefix}-box`}>
            {showHeader && (
              <div className={`${DTablerefix}-box-header`}>
                {renderSearch()}
                {renderTableInnerOp(reloadData, getOpBtns(), getJsxElement())}
              </div>
            )}
            {showQueryForm && (
              <div className={`${DTablerefix}-box-query ${!isShow ? `${DTablerefix}-box-queryHidden` : `${DTablerefix}-box-queryShow`}`}>
                <QueryForm {...queryFormProps} />
              </div>
            )}
            <Table
              loading={loading}
              rowKey={rowKey}
              dataSource={dataSource}
              columns={renderColumns(filterColumns)}
              pagination={!noPagination ? { ...pagination, ...paginationProps } : false}
              {...attrs}
            />
            {
              columns.length > 0 && <FilterTableColumns {...{ columns, setFilterColumns, visible: filterColumnsVisible, setVisible: setFilterColumnsVisible, tableId: newTableId }} />
            }
          </div>
        </div>
      </ConfigProvider>

    </>
  );
};
