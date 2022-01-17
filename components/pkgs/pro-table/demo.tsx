import React, { useState } from "react";
import { ProTable, Select, Button, IconFont } from '../../index';
import { renderTableOpts } from '../../common-pages/render-table-opts'
import './style/index.less';
import moment from "moment";

interface MiniSelectInterface extends React.FC<any> {
  Option: typeof Select.Option;
}

const CustomSelect: MiniSelectInterface = props => {
  return <>
    <span>自定义文案</span>
    <Select bordered={false} suffixIcon={<IconFont type='icon-xiala' />} {...props} />
  </>
};

CustomSelect.Option = Select.Option;


const getFormCol = () => {
  return [
    {
      type: "input",
      title: "用户账号",
      dataIndex: "username",
      placeholder: "请输入用户账号",
      componentProps: {
        maxLength: 128,
      },
    },
    {
      type: "input",
      title: "用户实名",
      dataIndex: "realName",
      placeholder: "请输入用户实名",
      componentProps: {
        maxLength: 128,
      },
    },
    {
      type: "select",
      title: "城市",
      dataIndex: "city",
      placeholder: "请选择",
      options: [
        {
          title: '北京',
          value: 1
        },
        {
          title: '南京',
          value: 2
        }
      ]
    }
  ];
};

const getFormText: { searchText: string; resetText: string } = {
  searchText: "查询",
  resetText: "重置",
};
// 获取 操作项相关配置
const getOperationList = (props?: any) => {
  return [
    {
      label: '编辑',
      type: 'icon-bianji',
      clickFunc: (record) => {
        console.log(record, 'edit click')
      },
    },
    {
      label: '删除',
      type: 'icon-shanchu',
      clickFunc: (record) => {
        console.log(record, 'delete click')
      },
    },
    {
      label: '默认',
      type: 'icon-jiahao',
      clickFunc: (record) => {
        console.log(record, 'default click')
      },
    },
    {
      label: '操作记录',
      type: 'icon-caozuojilu',
      clickFunc: (record) => {
        console.log(record, '测试 click')
      },
    },
    {
      label: '设置',
      type: 'icon-shezhi',
      clickFunc: (record) => {
        console.log(record, '测试 click')
      },
    },
  ];
};

const getTableCol = () => {
  const columns = [
    {
      title: "主机名",
      dataIndex: "hostName",
      key: "hostName",
      width: 500,
    },
    {
      title: "主机IP",
      dataIndex: "hostIp",
      key: "hostIp",
    },
    {
      title: "主机类型",
      dataIndex: "containerList",
      key: "containerList",
    },
    {
      title: "承载应用",
      dataIndex: "serviceList",
      key: "serviceList",
    },
    {
      title: "Agent版本号",
      dataIndex: "agentVersion",
      key: "agentVersion",
    },
    {
      title: "Agent健康度",
      dataIndex: "agentHealthLevel",
      key: "agentHealthLevel",
      render: (t, r) => {
        return <div style={{ height: '20px' }}>
          <IconFont type={`icon-${t}`} style={{ width: 20, height: 20, fontSize: '20px' }} />
        </div>
      }
    },
    {
      title: "所属机房",
      dataIndex: "machineZone",
      key: "machineZone",
    },
    {
      title: "新增时间",
      dataIndex: "hostCreateTime",
      key: "hostCreateTime",
      render: (t: number) => moment(t).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      fixed: 'right',
      render: (t, r) => {
        const btn = getOperationList();
        return renderTableOpts(btn, r)
      }
    },
  ];
  return columns;
};

export default () => {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    position: "bottomRight",
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50", "100", "200", "500"],
    showTotal: (total: number) => `共 ${total} 条目`,
    // locale: {
    //   items_per_page: '条',
    // },
    // selectComponentClass: CustomSelect,
  });

  const [data, setData] = useState([]);

  const queryUserList = () => {
    return Promise.resolve({
      bizData: [
        {
          hostName: 'default:l',
          hostIp: '172.16.101.69',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'lv',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect2',
          hostIp: '172.16.111.39',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'huang',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect3',
          hostIp: '172.56.101.69',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'hong',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect4',
          hostIp: '172.20.101.69',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'hong',
          machineZone: '第二机房',
          hostCreateTime: 1640589209224,
        },
        {
          hostName: 'default:log-collect5',
          hostIp: '172.16.101.19',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'lv',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect6',
          hostIp: '172.16.101.29',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'huang',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect7',
          hostIp: '171.16.101.69',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'lv',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect8',
          hostIp: '172.16.101.65',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'hong',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect9',
          hostIp: '172.16.101.89',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'lv',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect10',
          hostIp: '172.16.111.69',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'huang',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect11',
          hostIp: '172.16.101.70',
          containerList: "容器",
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'lv',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
      ],
      pagination: {
        total: 11,
      },
    });
  };

  const fetchUserList = () => {
    const { current, pageSize } = pagination;
    const params = {
      ...formData,
      page: current,
      size: pageSize,
    };
    setloading(true);
    queryUserList()
      .then((res: any) => {
        if (res) {
          setData(res.bizData);
          setPagination((origin) => {
            return {
              ...origin,
              total: res.pagination.total,
            };
          });
        }
      })
      .finally(() => {
        setloading(false);
      });
  };

  const handleSubmit = (data) => {
    const formData = {
      ...data,
    };
    setFormData(formData);
  };

  const handleChange = (formData) => {
    setFormData(formData);
  }

  // const onChangePagination = (current: any, pageSize: any) => {
  //   setPagination((value) => {
  //     return {
  //       ...value,
  //       current,
  //       pageSize,
  //     };
  //   });
  // };

  const onTableChange = (pagination, filters, sorter) => {
    console.log(pagination, 'pagination')

    setPagination((value) => {
      console.log(value, 'valuess')
      return {
        ...value,
        ...pagination
      };
    });
  };

  const getJsxElement = () => {
    return <>
      <span className='iconfont icon-wenjianjia'>123124214</span>
      <Button>卸载</Button>
      <Button>升级</Button>
      <Button>安装</Button>
      <Button type="primary">新增主机</Button>
    </>
  }

  React.useEffect(() => {
    fetchUserList();
  }, [formData, pagination.current, pagination.pageSize]);

  return (
    <ProTable
      showQueryForm={true} // 是否展示queryForm筛选
      // pgSelectComponentText='测试1'
      isCustomPg={true} // 是否启用自定义分页样式 默认true
      queryFormProps={{
        ...getFormText,
        columns: getFormCol(),
        onSearch: handleSubmit,
        onChange: handleChange,
        initialValues: formData,
        isResetClearAll: true,
      }}
      tableProps={{
        tableId: 'agent_table', // 用于本地存储不展示列数据
        loading,
        rowKey: "hostIp",
        dataSource: data,
        tableScreen: true, // 是否展示控制queryForm展开收起按钮
        tableCustomColumns: true, // 是否展示自定义列配置按钮
        columns: getTableCol(),
        paginationProps: { ...pagination },
        tableHeaderSearchInput: { // 左侧搜索框
          submit: (e) => {
            console.log(e, 'submit')
          },
          searchTrigger: 'enter' // 触发搜索的条件
        },
        getJsxElement: () => getJsxElement(),
        attrs: {
          // className: 'frameless-table', // 无边框表格添加类名
          // bordered: true,   // 表格边框
          rowClassName: (r, i) => { // 自定义行类名
            return i % 2 === 0 ? '' : 'line-fill-color';
          },
          scroll: {
            x: 'max-content'
          },
          onChange: onTableChange
        }
      }}
    />
  );
};
