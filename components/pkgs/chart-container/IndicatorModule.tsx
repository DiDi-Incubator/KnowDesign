import React, { useState, useEffect, useImperativeHandle } from "react";
import { Table } from '../../index';
import { Layout, Tree } from 'antd';
const { DirectoryTree } = Tree;
const { Content, Sider } = Layout;
import { IconFont } from '../icon-project';
import SearchSelect from '../search-select';
import { request } from '../../utils/request';
import QueryModule from './QueryModule';
import { IindicatorSelectModule } from './index';
import './style/indicator-drawer.less';


interface DataNode {
  title?: string;
  key?: string;
  code?: string;
  metricName?: string;
  metricDesc?: string;
  isLeaf?: boolean;
  children?: DataNode[];
}
interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  requestUrl: string;
  cRef: any;
  hide: boolean;
  currentKey: string;
  indicatorSelectModule: IindicatorSelectModule
}

const isTargetSwitcher = path =>
  path.some(element => {
    if (!element.classList) return false;
    return element.classList.contains("ant-tree-switcher");
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

const pagination = {
  current: 1,
  pageSize: 10,
  className: 'ant-pagination-custom',
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "50", "100", "200", "500"],
  showTotal: (total: number) => `共 ${total} 条`,
}

const IndicatorDrawer: React.FC<propsType> = ({
  requestUrl,
  cRef,
  hide,
  currentKey,
  indicatorSelectModule
}) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [serachRes, setSerachRes] = useState([]);
  const [treeDataAll, setTreeDataAll] = useState<any[]>(tree);
  const [tableAllList, settableAllList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableMap, setTableMap] = useState({});
  const [treeData, settreeData] = useState([]);
  const [treeMap, setTreeMap] = useState({});
  const [isSearch, setIsSearch] = useState(false);

  const [logCollectTask, setLogCollectTask] = useState([
    {
      title: "全部",
      value: "all",
    },
    {
      title: "tP0",
      value: "p0",
    },
    {
      title: "tP1",
      value: "p1",
    },
    {
      title: "tP2",
      value: "p2",
    },
  ]);
  const [pathList, setPathList] = useState<any[]>([]);
  const [hostList, setHostList] = useState<any[]>([]);
  

  useImperativeHandle(cRef, () => ({
    getGroups: () => {
      return sure();
    }
  }));

  useEffect(() => {
    getAllIndicators();
  }, []);

  useEffect(() => {
    const tableAllListNew = [];
    const generateList = (data => {

      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        if (node.children && node.children.length > 0) {
          generateList(node.children);
        } else {
          tableAllListNew.push({ ...node, searchName: node.metricName });
        }
      }

    });
    generateList(treeDataAll);
    settableAllList(tableAllListNew);

    const tree = updatetreeDataAll(JSON.parse(JSON.stringify(treeDataAll)), 1);

    settreeData(tree);
    setExpandedKeys([tree[0].key]);
    setSelectedKeys([tree[0].key]);

  }, [treeDataAll]);

  useEffect(() => {

    treeData.forEach(item => {

      treeMap[item.key] = item.children.map(item => {

        return {
          key: item.key,
          tableData: tableMap[item.key]
        }
      })
    })
    setTreeMap({ ...treeMap });

  }, [treeData]);

  useEffect(() => {
    Object.keys(treeMap).forEach(key => {
      tableMap[key] = treeMap[key].reduce((total, currentValue) => {
        if (currentValue.tableData) {
          total = total.concat(currentValue.tableData);
        }
        return total;
      }, []);
    });
  }, [treeMap]);

  useEffect(() => {
    if (selectedKeys[0] && !isSearch) {
      setSelectRowKey(selectedKeys[0]);
    }
  }, [selectedKeys, isSearch]);

  const getAllIndicators = async () => {
    const res: any = await request(requestUrl);
    const data = res.data;
    if (data?.children) {
      if (Array.isArray(data.children)) {
        setTreeDataAll(data.children);
      }
    }
  }

  const setSelectRowKey = (treeKey) => {
    let tableData = [];
    if (tableMap[treeKey]) {
      tableData = tableMap[treeKey];
    } else {
      const firstKeys = Object.keys(treeMap);
      for (let i = 0; i < firstKeys.length; i++) {
        const firstKey = firstKeys[i];
        if (treeKey === firstKey) {
          tableData = treeMap[firstKey].reduce((total, currentValue) => {
            if (currentValue.tableData) {
              total = total.concat(currentValue.tableData);
            }
            return total;
          }, []);

          break;
        }
      }
    }
    const rowkeys = [];
    tableData.forEach(item1 => {
      if (item1.checked) {
        rowkeys.push(item1.key);
      }
    })
    setTableData(tableData);
    setSelectedRowKeys(rowkeys);
    return rowkeys;
  }

  const treeExpand = (expandedKeys, { nativeEvent }) => {
    setAutoExpandParent(false);
    if (isTargetSwitcher(nativeEvent.path)) setExpandedKeys(expandedKeys);
  }

  const updatetreeDataAll = (list: DataNode[], level: number): DataNode[] => {
    return list.map(node => {
      // 实际接口用到 勿删
      node.key = node.code;
      // node.title = node.metricName;
      if (node.children) {
        if (level > 0) {
          return {
            ...node,
            children: updatetreeDataAll(node.children, level - 1),
          };
        } else {
          tableMap[node.key] = node.children.map(item => {
            return {
              ...item,
              key: item.code
            }
          });
          setTableMap({ ...tableMap });

          delete node.children;
          node.isLeaf = true;
        }

      }
      return node;
    });
  }


  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const loop = data =>
    data.map(item => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          title,
          children: loop(item.children),
          isLeaf: false
        };
      }

      return {
        ...item,
        title,
        isLeaf: true
      };
    });

  const setTableMapSelect = (rowkey, selected, treeDataAll) => {
    const level2Key = getParentKey(rowkey, treeDataAll);
    const level1Key = getParentKey(level2Key, treeDataAll);
    if (tableMap[level2Key]) {
      for (let i = 0; i < tableMap[level2Key].length; i++) {
        if (tableMap[level2Key][i].key === rowkey) {
          tableMap[level2Key][i].checked = selected;
          break;
        }

      }
    }
    if (tableMap[level1Key]) {
      for (let i = 0; i < tableMap[level1Key].length; i++) {
        if (tableMap[level1Key][i].key === rowkey) {
          tableMap[level1Key][i].checked = selected;
          break;
        }

      }
    }
  }

  const tableSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const tableSelectSingle = (row, selected, selectedRows) => {
    setTableMapSelect(row.key, selected, treeDataAll);
  }

  const tableRowSelectAll = (selected, selectedRows, changeRows) => {
    changeRows.forEach(item => {
      setTableMapSelect(item.key, selected, treeDataAll);
    });
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
    const key = val[0];
    if (tableMap[key]) {
      setTableData(tableMap[key]);
    } else {
      let table = [];
      if (treeMap[key]) {
        table = treeMap[key].reduce((total, currentValue) => {
          if (currentValue.tableData) {
            total = total.concat(currentValue.tableData);
          }
          return total;
        }, []);
      }

      setTableData(table);
    }

  };

  const searchSelect = ((val) => {
    setSearchValue(val);
    const parentKey0 = getParentKey(val, treeDataAll);

    setAutoExpandParent(true);
    setExpandedKeys([parentKey0]);
    setSelectedKeys([parentKey0]);
    const table = tableMap[parentKey0].filter(item => item.key === val);
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
    const groups = treeData.map((level1tree) => {
      const itemArr = treeMap[level1tree.key];
      const selectedRows = [];
      itemArr.forEach(item => {

        item.tableData?.forEach(item1 => {
          if (item1.checked) {
            selectedRows.push({ 
              ...item1, 
              id: item1.code, 
              name: item1.metricName,
              type: currentKey
            });
          }
        })

      })

      return {
        groupName: level1tree.metricName,
        groupId: level1tree.code,
        lists: selectedRows
      }
    })
    // onSure(groups);
    return groups;
  }

  return (
    <>

      {/* <SearchInput onSearch={searchChange} placeholder="请输入指标名称"/> */}
      <div className={hide ? 'hide' : ''}>
        <QueryModule currentKey={currentKey} indicatorSelectModule={indicatorSelectModule}/>
        <SearchSelect
          onSearch={searchChange}
          onSelect={searchSelect}
          searchVal={searchValue}
          serachRes={serachRes}
          placeholder="请输入指标名称"
          suffixIcon={<IconFont type="icon-sousuo" />} />
        <Layout
          style={{ background: '#fff', marginTop: '16px' }}>
          <Sider
            style={{
              background: '#fff',
              padding: '20px',
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
              pagination={{ ...pagination }}
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