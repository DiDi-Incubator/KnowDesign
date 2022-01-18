import React, { useState, useEffect } from 'react';
import { Input, Button, Table, ConfigProvider, Tooltip, Select, IconFont, Utils } from '../../index';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import QueryForm, { IQueryFormProps } from "../query-form";
import FilterTableColumns from './filterTableColumns';
import CustomSelect from './customSelect';
import './style/index.less';
// 表格国际化无效问题手动加
import antdZhCN from '../../basic/locale/zh_CN';

export const DTablerefix = 'd-table';


export const pagination = {
  // position: 'bottomRight',
  // showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100', '200', '500'],
  showTotal: (total: number) => `共 ${total} 个条目`,
  // hideOnSinglePage: true,
  // total: 500,
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
  tableId?: string;
  customLocale?: any;
  tableScreen?: boolean; // 控制queryForm显示隐藏的按钮
  tableCustomColumns?: boolean; // 表格自定义列
  tableHeaderTitle?: boolean; // 展示表格标题
  tableHeaderCustomColumns?: boolean; // 表格Header右侧自定义列
}

export const DTable = (props: IDTableProps) => {
  const [queryFormShow, setQueryFormShow] = useState(true);
  const [filterColumns, setFilterColumns] = useState([]);
  const [filterColumnsVisible, setFilterColumnsVisible] = useState(false);

  const clickFunc = () => {
    setQueryFormShow(!queryFormShow)
  }

  const filterTableColumns = (columns) => {
    setFilterColumnsVisible(true)
  }

  const renderSearch = () => {
    // if (!props?.tableHeaderSearchInput) return;
    const { searchInputRightBtns = [], tableScreen = false, tableCustomColumns = false, showQueryForm = false } = props;
    const { placeholder = null, submit, width, searchTrigger = 'change' } = props?.tableHeaderSearchInput || {};
    return (
      <div className={`${DTablerefix}-box-header-search`}>
        {props?.tableHeaderSearchInput && <div>
          <Input
            placeholder={placeholder || '请输入关键字'}
            style={{ width: width || 200 }}
            onChange={(e) => searchTrigger === 'change' && submit(e.target.value)}
            onPressEnter={(e: any) => searchTrigger === 'enter' && submit(e.target.value)}
            onBlur={(e: any) => searchTrigger === 'blur' && submit(e.target.value)}
            suffix={<SearchOutlined style={{ color: '#ccc' }} />}
          />
        </div>}
        <div className={`${DTablerefix}-box-header-search-custom`}>
          {searchInputRightBtns.length > 0 && searchInputRightBtns.map((item, index) => {
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
          })}
          {
            showQueryForm && tableScreen && <Button style={{ marginLeft: 8 }} onClick={clickFunc} icon={<IconFont type='icon-shaixuan' />} />
          }
          {
            tableCustomColumns && <Button style={{ marginLeft: 8 }} onClick={() => filterTableColumns(columns)} icon={<IconFont type='icon-zidingyibiaotou' />} />
          }
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
    tableId = null,
    customLocale,
    tableHeaderTitle = false,
    tableHeaderCustomColumns = false,
  } = props;

  // const newTableId = `${rowKey}-${tableId}`;

  useEffect(() => {
    if (tableId && Utils.getLocalStorage(tableId)) {

      const invisibleColumns = Utils.getLocalStorage(tableId);

      const newFilterColumns = columns.map(item => {
        return {
          ...item,
          invisible: invisibleColumns.includes(item.dataIndex || item.key)
        }
      });

      setFilterColumns(newFilterColumns)
    } else {
      setFilterColumns(columns);
    }
  }, [columns]);


  const renderTitle = () => {
    return <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ whiteSpace: 'nowrap' }}>{attrs.title || '基础配置信息'}</div>
        <div style={{ height: '1px', width: '100%', backgroundColor: '#cccccc', marginLeft: '10px' }}></div>
      </div>
      {tableHeaderCustomColumns && <div>
        <Button style={{ marginLeft: 8 }} onClick={() => filterTableColumns(columns)} icon={<IconFont type='icon-zidingyibiaotou' />} />
      </div>}
    </div>
  }

  return (
    <>
      <ConfigProvider locale={antdZhCN}>
        <div className={`${DTablerefix}`}>
          <div className={`${DTablerefix}-box`}>
            {showHeader && (
              <div className={`${DTablerefix}-box-header`} style={{ marginBottom: showQueryForm ? 0 : '24px' }}>
                {renderSearch()}
                {renderTableInnerOp(reloadData, getOpBtns(), getJsxElement())}
              </div>
            )}
            {showQueryForm && (
              <div className={`${DTablerefix}-box-query`} style={{ maxHeight: !queryFormShow ? 0 : '200px', marginTop: !queryFormShow ? 0 : '10px' }}>
                <QueryForm {...queryFormProps} onCollapse={() => setQueryFormShow(false)} />
              </div>
            )}
            <Table
              loading={loading}
              rowKey={rowKey}
              dataSource={dataSource}
              columns={renderColumns(filterColumns)}
              pagination={!noPagination ? { ...pagination, ...paginationProps } : false}
              {...{ title: tableHeaderTitle && renderTitle, ...attrs }}
            />
            {
              columns.length > 0 && <FilterTableColumns {...{ columns: filterColumns, setFilterColumns, visible: filterColumnsVisible, setVisible: setFilterColumnsVisible, tableId }} />
            }
          </div>
        </div>
      </ConfigProvider>

    </>
  );
};
