import React, { useState, useEffect, useImperativeHandle } from "react";
import { Table, Layout, Tree, Row, Col, Select } from '../../index';
const { DirectoryTree } = Tree;
const { Content, Sider } = Layout;
import { IconFont } from '../icon-project';
import SearchSelect from '../search-select';
import { request } from '../../utils/request';
import QueryModule from './QueryModule';
import { IindicatorSelectModule } from './index';
import './style/indicator-drawer.less';

import MetricData from './metric-tree';


interface DataNode {
  title?: string;
  key?: string | number;
  code?: string | number;
  metricName?: string;
  metricDesc?: string;
  isLeaf?: boolean;
  children?: DataNode[];
  checked?: boolean | null;
  isLeafNode: boolean; // true: 指标；false:指标类型树
}
interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  requestUrl: string;
  cRef: any;
  hide: boolean;
  currentKey: string;
  indicatorSelectModule: IindicatorSelectModule;
  initIndicatorsShow: Function;
}

const isTargetSwitcher = path =>
  path.some(element => {
    if (!element.classList) return false;
    const res = Array.from(element.classList).find((item: string) => {
      return item.indexOf('-tree-switcher') > -1;
    })
    return !!res;
  });

const tree = [
  {
    title: '系统',
    key: '0-0',
    code: '0-0',
    metricName: '系统',
    metricDesc: '系统-0-0',
    isLeaf: false,
    children: [
      {
        title: 'leaf 0-0',
        key: '0-0-0',
        code: '0-0-0',
        isLeaf: true,
        children: [
          {
            metricName: 'table',
            metricDesc: '0-0-0-0',
            code: '0-0-0-0',
            key: '0-0-0-0',
            checked: true
          },
          {
            metricName: 'table0',
            metricDesc: '0-0-0-1',
            code: '0-0-0-1',
            key: '0-0-0-1',
            checked: false
          }
        ]
      },
      {
        title: 'leaf 0-1',
        key: '0-0-1',
        code: '0-0-1',
        isLeaf: true,
        children: [
          {
            metricName: 'table1',
            metricDesc: '0-0-1-1',
            code: '0-0-1-1',
            key: '0-0-1-1',
            checked: true
          }
        ]
      },
    ],
  },
  {
    title: '进程',
    key: '0-1',
    code: '0-1',
    isLeaf: false,
    metricName: '进程',
    metricDesc: '进程-0-1',
    children: [
      {
        title: 'leaf 1-0',
        key: '0-1-0',
        code: '0-1-0',
        isLeaf: true,
        children: [
          {
            metricName: 'able2',
            metricDesc: '0-1-1-1',
            code: '0-1-1-1',
            key: '0-1-1-1',
            checked: true
          }
        ]
      },
      { title: 'leaf 1-1', key: '0-1-1', code: '0-1-1', isLeaf: true, leaf: 1 },
    ],
  },
];

const columns = [
  {
    title: '指标名称',
    dataIndex: 'metricName',
  },
  {
    title: '指标描述',
    dataIndex: 'metricDesc',
  }
];

const SelectComponent = props => {
  return <>
    <span>每页显示</span>
    <Select bordered={false} suffixIcon={<IconFont type="icon-xiala" />} {...props} />
  </>
};

SelectComponent.Option = Select.Option;

const paginationInit = {
  current: 1,
  pageSize: 10,
  className: 'pro-table-pagination-custom',
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "50", "100", "200", "500"],
  showTotal: (total: number) => `共 ${total} 条`,
  locale: {
    items_per_page: '条',
  },
  selectComponentClass: SelectComponent
}

const IndicatorDrawer: React.FC<propsType> = ({
  requestUrl,
  cRef,
  hide,
  currentKey,
  indicatorSelectModule,
  initIndicatorsShow
}) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState([]); // 当前选中tree的key

  const [searchValue, setSearchValue] = useState<string>('');
  const [serachRes, setSerachRes] = useState([]);
  const [treeDataAllFetch, setTreeDataAllFetch] = useState<any[]>(MetricData);
  const [treeDataAll, setTreeDataAll] = useState<any[]>([]);
  const [tableAllList, settableAllList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, setTableData] = useState([]); // 当前table数据
  const [treeData, settreeData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [pagination, setPagination] = useState(paginationInit);

  useImperativeHandle(cRef, () => ({
    getGroups: () => {
      return sure();
    }
  }));

  useEffect(() => {
    getAllIndicators();
  }, []);

  useEffect(() => {
    setTreeDataAll(loop(treeDataAllFetch));
  }, [treeDataAllFetch]);

  useEffect(() => {
    const tableAllListNew = [];
    const generateList = (data => {

      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        if (!node.isLeafNode) {
          if (node.children) {
            generateList(node.children);
          }
          
        } else {
          tableAllListNew.push({ ...node, searchName: node.metricName });
        }
      }

    });
    generateList(treeDataAll);
    settableAllList(tableAllListNew);

    const tree = getTreeData(JSON.parse(JSON.stringify(treeDataAll)));
    settreeData(setLeaf(tree));
    setExpandedKeys([tree[0]?.key]);
    setSelectedKeys([tree[0]?.key]);

    const tableRes = getTableData(treeDataAll || [], tree[0]?.key)
    setTableData(tableRes[0]);
    setSelectedRowKeys(tableRes[1]);

  }, [treeDataAll]);

  useEffect(() => {
    if (selectedKeys[0] && !isSearch) {
      const tableRes = getTableData(treeDataAll || [], selectedKeys[0])
      setTableData(tableRes[0]);
      setSelectedRowKeys(tableRes[1]);
    }
  }, [selectedKeys]);

  const loop = data =>
    data.map(item => {
      
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          title: item.metricName,
          key: item.code,
          checked: indicatorSelectModule?.menuList?.length === 2 ? false : item.checked, // 指标探查没有默认选择项，却要前端处理--
          children: loop(item.children),
          type: currentKey
        };
      }

      return {
        ...item,
        title: item.metricName,
        checked: indicatorSelectModule?.menuList?.length === 2 ? false : item.checked,
        key: item.code,
        type: currentKey
      };
    });

  const setLeaf = data =>
    data.map(item => {
      
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          isLeaf: false,
          children: setLeaf(item.children)
        };
      }

      return {
        ...item,
        isLeaf: true
      };
    });

  const getTableData = (lists: any, treeKey: any, res = [], selectedRowKeys = [], selectedRows = [], isChild?: boolean) => {
    for (let i = 0; i < lists.length; i++) {
      if (isChild) {
        if (lists[i].isLeafNode) {
          res.push(lists[i]);
          lists[i].checked && selectedRowKeys.push(lists[i].key);
          lists[i].checked && selectedRows.push(lists[i]);
        } else {
          lists[i]?.children && getTableData(lists[i]?.children, treeKey, res, selectedRowKeys, selectedRows, true);
        }
      } else {
        if (lists[i].key === treeKey && !lists[i].isLeafNode) {
          lists[i]?.children && getTableData(lists[i]?.children, treeKey, res, selectedRowKeys, selectedRows, true);
        } else {
          if (!lists[i].isLeafNode) {
            lists[i]?.children && getTableData(lists[i]?.children, treeKey, res, selectedRowKeys, selectedRows);
          }
        }
      }
      
    }
    return [res, selectedRowKeys, selectedRows];
  }

  const getAllIndicators = async () => {
    
    const res: any = await request(requestUrl);
    const data = res || [];
    
    if (data?.children) {
      if (Array.isArray(data.children)) {
        setTreeDataAllFetch(data.children);
      }
    }
    // initIndicatorsShow();  
  }

  const treeExpand = (expandedKeys, { nativeEvent }) => {
    setAutoExpandParent(false);
    if (isTargetSwitcher(nativeEvent.path)) setExpandedKeys(expandedKeys);
  }

  const getTreeData = (list: DataNode[]) => {
    if (!list) {
      return;
    }
    
    for(let i = 0; i < list.length; i++) {
      // list[i].key = list[i].code;
      // list[i].title = list[i].metricName;
      
      if (list[i].isLeafNode) {
        list.splice(i, 1);
        getTreeData(list);
        break;

      } else {
        getTreeData(list[i]?.children);
      }
    }
    return list;
  }

  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key == key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const setTableChecked = (list, rowkey, checked) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].key === rowkey && list[i].isLeafNode) {
        list[i].checked = checked;
        break;
      } else {
        if (!list[i].isLeafNode && list[i]?.children) {
          setTableChecked(list[i].children, rowkey, checked)
        }
      }
    }
    return list;
  }

  const tableSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    
  }

  const tableSelectSingle = (row, selected, selectedRows) => {
    // setTableMapSelect(row.key, selected, treeDataAll);
    setTableChecked(treeDataAll, row.key, selected);
    setTreeDataAll(treeDataAll);
  }

  const tableRowSelectAll = (selected, selectedRows, changeRows) => {
    changeRows.forEach(item => {
      // setTableMapSelect(item.key, selected, treeDataAll);
      setTableChecked(treeDataAll, item.key, selected);
    });
    setTreeDataAll(treeDataAll);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: tableSelectChange,
    onSelect: tableSelectSingle,
    onSelectAll: tableRowSelectAll
  };

  const treeSelect = (val) => {
    setSelectedKeys(val);
    setSearchValue('');
    setIsSearch(false);
  };

  const searchSelect = ((val) => {
    setSearchValue(val);
    const parentKey0 = getParentKey(val, treeDataAll);
    setAutoExpandParent(true);
    setExpandedKeys([parentKey0]);
    setSelectedKeys([parentKey0]);

    const table = tableAllList.filter(item => item.key === val);
    setIsSearch(true);
    setTableData(table);
  });

  const searchChange = (value) => {
    const res = [];
    tableAllList.forEach(item => {
      if (item.metricName?.indexOf(value) > -1) {
        res.push(item);
      }
    })
    setSerachRes(res);
  };

  const sure = () => {
    const groups = treeDataAll.map(groupItem => {
      const tableRes = getTableData(treeDataAll || [], groupItem.key)
      return {
        groupName: groupItem.metricName,
        groupId: groupItem.code,
        lists: tableRes[2]
      }
    })
    return groups;
  }

  const pageChange = (page, pageSize) => {
    setPagination({
      ...pagination,
      pageSize,
      current: page
    })
  }

  return (
    <>
      <div className={hide ? 'hide' : ''}>
        
        <Row gutter={[16, 16]}>
          {
            indicatorSelectModule?.menuList?.length > 1 && 
              <Col span={currentKey === '0' ? 7 : 17}>
                {indicatorSelectModule?.menuList?.length > 1 && <QueryModule currentKey={currentKey} indicatorSelectModule={indicatorSelectModule} />}
              </Col>
          }
          
          <Col span={indicatorSelectModule?.menuList?.length > 1 ? 7 : 24}>
            {indicatorSelectModule?.menuList?.length > 1 && <div className="label-name"></div>}
            <SearchSelect
              style={{ float: indicatorSelectModule?.menuList?.length > 1 ? 'right': 'left'}}
              onSearch={searchChange}
              onSelect={searchSelect}
              searchVal={searchValue}
              serachRes={serachRes}
              placeholder="请输入指标名称"
              suffixIcon={<IconFont type="icon-sousuo" />} />
          </Col>
        </Row>
        
        <Layout
          style={{ background: '#fff', marginTop: '16px' }}>
          <Sider
            style={{
              background: '#fff',
              border: '1px solid #EFF2F7',
            }}
            width="224px">

            <DirectoryTree
              showIcon={true}
              multiple={false}
              autoExpandParent={autoExpandParent}
              onExpand={treeExpand}
              blockNode={true}
              icon={(props) => {
                const parentKey = getParentKey(props.eventKey, treeData);
                const icon = !props.isLeaf ? <IconFont type="icon-wenjianjia" /> : '';
                return icon;
              }}
              switcherIcon={<IconFont type="icon-jiantou1" />}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              onSelect={treeSelect}
              treeData={treeData}
            />
          </Sider>
          <Content style={{ marginLeft: '24px' }}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
              pagination={{
                 ...pagination,
                 onChange: pageChange
              }}
              rowClassName={(r, i) => {
                return i % 2 === 0 ? '' : 'line-fill-color'
              }}
            />
          </Content>
        </Layout>
      </div>
    </>
  )

};

export default IndicatorDrawer;