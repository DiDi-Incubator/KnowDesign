import React, { useState, useEffect } from "react";
import { Drawer, Layout, Tree, Input, Table } from '../../index';
const { DirectoryTree } = Tree;
const { Search } = Input;
const { Content, Sider } = Layout;
import {
  DownOutlined
} from '@ant-design/icons';
import { IconFont } from '../icon-project';
import SearchSelect from '../search-select';
import './style/indicator-drawer.less';


interface DataNode {
  title?: string;
  key?: string;
  code?: string;
  metricName?:string;
  metricDesc?: string;
  isLeaf?: boolean;
  children?: DataNode[];
}
interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  visible: boolean;
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
    isLeaf: false,
    children: [
      { 
        title: 'leaf 0-0', 
        key: '0-0-0', 
        isLeaf: true, 
        children: [
          {
            metricName: 'table',
            metricDesc: '0-0-0-0',
            code: '0-0'
          },
          {
            metricName: 'table0',
            metricDesc: '0-0-0-1',
            code: '0-1'
          }
        ]
      },
      { 
        title: 'leaf 0-1', 
        key: '0-0-1', 
        isLeaf: true,
        children: [
          {
            metricName: 'table1',
            metricDesc: '0-0-0-1',
            code: '1-1'
          }
        ]
      },
    ],
  },
  {
    title: '进程',
    key: '0-1',
    isLeaf: false,
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true, leaf: 1 },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true, leaf: 1 },
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

const data = [
  {
    key: '1',
    name: '巴乐',
    desc: '指标描述'
  },
  {
    key: '2',
    name: '旺财',
    desc: '指标描述'
  },
];

const IndicatorDrawer: React.FC<propsType> = ({ onClose, visible }) => {
  const [autoExpandParent, setautoExpandParent] = useState<boolean>(true);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [treeDataAll, settreeDataAll] = useState(tree);
  const [treeList, settreeList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, setTableData] = useState(data);
  const [tableMap, setTableMap] = useState({});
  const [treeData, settreeData] = useState([]);
  const [treeMap, setTreeMap] = useState({});

  useEffect(() => {
    const treeListNew=[];
    const generateList = data => {
      
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key, title } = node;
        treeListNew.push({ key, title });
        if (node.children) {
          generateList(node.children);
        }
      }
      
    };
    generateList(treeDataAll);
    settreeList(treeListNew);

    searchChange('');
    const tree = updatetreeDataAll(treeDataAll, 1);
    settreeData(tree);
    setExpandedKeys([tree[0].key]);
    console.log(tree, 8989898);
    console.log(tableMap);
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
    setTreeMap({...treeMap});
    
  }, [treeData]);

  useEffect(() => {
    searchChange('');
  }, [treeList]);

  const treeExpand = (expandedKeys, { nativeEvent }) => {
    if (isTargetSwitcher(nativeEvent.path)) setExpandedKeys(expandedKeys);
    // setExpandedKeys(expandedKeys);
  }

  const updatetreeDataAll = (list: DataNode[], level: number): DataNode[] => {
    return list.map(node => {
      // 实际接口用到
      // node.key = node.code;
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
          setTableMap({...tableMap});

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

  const searchChange = (value) => {
    // const expandedKeys = treeList
    //   .map(item => {
    //     if (item.title.indexOf(value) > -1) {
    //       return getParentKey(item.key, treeDataAll);
    //     }
    //     return null;
    //   })
    //   .filter((item, i, self) => item && self.indexOf(item) === i);
    // setExpandedKeys(expandedKeys);
    setSearchValue(value);
    
  }

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
  
  const tableSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: tableSelectChange,
  };

  const treeSelect = (val) => {
    if (tableMap[val]) {
      setTableData(tableMap[val]);
    } else {
      // const table = [];
      console.log(treeMap[val]);
      let table = [];
      if (treeMap[val]) {
        table = treeMap[val].reduce((total, currentValue) => {
          if (currentValue.tableData) {
            total = total.concat(currentValue.tableData);
          }
          
          return total;
        }, []);
      }

      setTableData(table);
    }
    
  }

  
  return (
    <>
      <Drawer
        title="指标筛选"
        width="868px"
        className="dd-indicator-drawer"
        onClose={onClose} 
        visible={visible}>
          {/* <SearchInput onSearch={searchChange} placeholder="请输入指标名称"/> */}
          <SearchSelect onSearch={searchChange} placeholder="请输入指标名称" suffixIcon={<IconFont type="icon-sousuo"/>}/>
          <Layout 
            style={{background: '#fff', marginTop: '16px'}}>
            <Sider 
              style={{
                background: '#fff',
                padding: '20px',
                border: '1px solid #EFF2F7',
              }}
              width="224px">
              
              <DirectoryTree
                showIcon={true}
                onExpand={treeExpand}
                blockNode={true}
                icon={(props) => {
                  const icon = !props.isLeaf ? <IconFont type="icon-wenjianjia"/> : '';
                  return icon;
                }}
                switcherIcon={<IconFont type="icon-jiantou1"/>}
                defaultExpandAll={autoExpandParent}
                expandedKeys={expandedKeys}
                onSelect={treeSelect}
                treeData={treeData}
              />
            </Sider>
            <Content style={{marginLeft: '24px'}}>
              <Table 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={tableData} 
                pagination={{...pagination}}
                rowClassName={(r, i) => {
                  return i % 2 === 0 ? '' : 'line-fill-color'
                }} 
              />
            </Content>
          </Layout>
      </Drawer>
    </>
  )

};

export default IndicatorDrawer;