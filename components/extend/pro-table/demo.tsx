import React, { useState } from 'react';
import { ProTable, Select, Button, IconFont, RenderTableOpts } from 'knowdesign';
import moment from 'moment';

interface MiniSelectInterface extends React.FC<any> {
  Option: typeof Select.Option;
}

const CustomSelect: MiniSelectInterface = (props) => {
  return (
    <>
      <span>每页展示</span>
      <Select bordered={false} suffixIcon={<IconFont type="icon-xiala" />} {...props} />
    </>
  );
};

CustomSelect.Option = Select.Option;

const getFormCol = () => {
  return [
    {
      type: 'datePicker',
      title: '日期选择',
      dataIndex: 'date1',
      placeholder: ['请选择日期'],
    },
    {
      type: 'dateRangePicker',
      title: '日期范围选择',
      dataIndex: 'date2',
      placeholder: ['开始日期', '结束日期'],
    },
    {
      type: 'timePicker',
      title: '时间选择',
      dataIndex: 'time1',
      placeholder: ['请选择时间'],
    },
    {
      type: 'timeRangePicker',
      title: '时间范围选择',
      dataIndex: 'time2',
      placeholder: ['开始时间', '结束时间'],
    },
    {
      type: 'input',
      title: '用户账号',
      dataIndex: 'username',
      placeholder: '请输入用户账号',
      componentProps: {
        maxLength: 128,
      },
    },
    {
      type: 'input',
      title: '用户实名',
      dataIndex: 'realName',
      placeholder: '请输入用户实名',
      componentProps: {
        maxLength: 128,
      },
    },
    {
      type: 'select',
      title: '城市',
      dataIndex: 'city',
      placeholder: '请选择',
      options: [
        {
          title: '北京',
          value: 1,
        },
        {
          title: '南京',
          value: 2,
        },
      ],
    },
  ];
};

const getFormText: { searchText: string; resetText: string } = {
  searchText: '查询',
  resetText: '重置',
};
// 获取 操作项相关配置
const getOperationList = (props?: any) => {
  return [
    {
      label: '编辑',
      type: 'icon-bianji',
      clickFunc: (record) => {
        console.log(record, 'edit click');
      },
    },
    {
      label: '删除',
      type: 'icon-shanchu',
      clickFunc: (record) => {
        console.log(record, 'delete click');
      },
    },
    {
      label: '默认',
      type: 'icon-jiahao',
      clickFunc: (record) => {
        console.log(record, 'default click');
      },
    },
    {
      label: '操作记录',
      type: 'icon-caozuojilu',
      clickFunc: (record) => {
        console.log(record, '测试 click');
      },
    },
    {
      label: '设置',
      type: 'icon-shezhi',
      clickFunc: (record) => {
        console.log(record, '测试 click');
      },
    },
  ];
};

const getTableCol = () => {
  const columns = [
    {
      title: '主机名',
      dataIndex: 'hostName',
      key: 'hostName',
      width: 200,
      fixed: 'left',
      lineClampTwo: true,
      needTooltip: true,
    },
    {
      title: '主机IP',
      dataIndex: 'hostIp',
      key: 'hostIp',
    },
    {
      title: '主机类型',
      dataIndex: 'containerList',
      key: 'containerList',
    },
    {
      title: '承载应用',
      dataIndex: 'serviceList',
      key: 'serviceList',
      width: 150,
      className: 'test_className',
      lineClampOne: true,
      needTooltip: true,
    },
    {
      title: 'Agent版本号',
      dataIndex: 'agentVersion',
      key: 'agentVersion',
    },
    {
      title: 'Agent健康度',
      dataIndex: 'agentHealthLevel',
      key: 'agentHealthLevel',
      needTooltip: true,
      tooltipPlace: 'top',
      tooltipNode: <span>test tooltipNode</span>,
      render: (t, r) => {
        return (
          <div style={{ height: '20px' }}>
            <IconFont type={`icon-${t}`} style={{ width: 20, height: 20, fontSize: '20px' }} />
          </div>
        );
      },
    },
    {
      title: '所属机房',
      dataIndex: 'machineZone',
      key: 'machineZone',
    },
    {
      title: '新增时间',
      dataIndex: 'hostCreateTime',
      key: 'hostCreateTime',
      render: (t: number) => moment(t).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      filterTitle: true,
      render: (t, r) => {
        const btn = getOperationList();
        return RenderTableOpts(btn, r);
      },
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
    position: 'bottomRight',
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100', '200', '500'],
    showTotal: (total: number) => `共 ${total} 条目`,
    locale: {
      items_per_page: '条',
    },
    selectComponentClass: CustomSelect,
  });

  const [data, setData] = useState([]);

  const queryUserList = () => {
    return Promise.resolve({
      bizData: [
        {
          hostName: 'default:ldefault:ldefault:ldefault:ldefault:ldefault:ldefault:l',
          hostIp: '172.16.101.69',
          containerList: '容器',
          serviceList: [
            'k8s_test,test1,123123,k8s_test,test1,123123,k8s_test,test1,123123,k8s_test,test1,123123',
          ],
          agentVersion: '1.1.0',
          agentHealthLevel: 'lv',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect2',
          hostIp: '172.16.111.39',
          containerList: '容器',
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'huang',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect3',
          hostIp: '172.56.101.69',
          containerList: '容器',
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'hong',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect4',
          hostIp: '172.20.101.69',
          containerList: '容器',
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'hong',
          machineZone: '第二机房',
          hostCreateTime: 1640589209224,
        },
        {
          hostName: 'default:log-collect5',
          hostIp: '172.16.101.19',
          containerList: '容器',
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'lv',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect6',
          hostIp: '172.16.101.29',
          containerList: '容器',
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'huang',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect7',
          hostIp: '171.16.101.69',
          containerList: '容器',
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'lv',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect8',
          hostIp: '172.16.101.65',
          containerList: '容器',
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'hong',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect9',
          hostIp: '172.16.101.89',
          containerList: '容器',
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'lv',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect10',
          hostIp: '172.16.111.69',
          containerList: '容器',
          serviceList: ['k8s_test,test1,123123'],
          agentVersion: '1.1.0',
          agentHealthLevel: 'huang',
          machineZone: '第二机房',
          hostCreateTime: 1640589209112,
        },
        {
          hostName: 'default:log-collect11',
          hostIp: '172.16.101.70',
          containerList: '容器',
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
    console.log(formData, 'handleSubmit');

    setFormData(formData);
  };

  const handleChange = (formData) => {
    console.log(formData, 'handleChange');
    setFormData(formData);
  };

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
    console.log(pagination, 'pagination');

    setPagination((value) => {
      console.log(value, 'valuess');
      return {
        ...value,
        ...pagination,
      };
    });
  };

  const getJsxElement = () => {
    return (
      <>
        <Button>卸载</Button>
        <Button>升级</Button>
        <Button>安装</Button>
        <Button type="primary">新增主机</Button>
      </>
    );
  };

  React.useEffect(() => {
    fetchUserList();
  }, [formData, pagination.current, pagination.pageSize]);

  return (
    <ProTable
      showQueryForm={true} // 是否展示queryForm筛选
      // pgSelectComponentText='测试1'
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
        rowKey: 'hostIp',
        dataSource: data,
        tableScreen: true, // 是否展示控制queryForm展开收起按钮
        tableCustomColumns: true, // 是否展示自定义列配置按钮
        columns: getTableCol() as any,
        paginationProps: { ...pagination },
        tableHeaderSearchInput: {
          // 左侧搜索框
          submit: (e) => {
            console.log(e, 'submit');
          },
          searchInputType: 'search',
          searchAttr: {
            placeholder: '请输入关键字',
            className: 'custonClassName',
          },
          // searchTrigger: 'enter' // 触发搜索的条件
        },
        tableHeaderTitle: true, // 展示表格自定义标题
        // tableHeaderTitleText: '你好', // 自定义标题文本内容
        tableHeaderCustomColumns: true, // 表格Header右侧自定义列
        // lineFillColor: false, // 表格是否隔行变色
        getJsxElement: () => getJsxElement(),
        attrs: {
          // className: 'frameless-table', // 纯无边框表格类名
          // bordered: true,   // 表格边框
          scroll: {
            x: 'max-content',
            y: '300px',
          },
          onChange: onTableChange,
        },
      }}
    />
  );
};
