import React, { useState } from 'react';
import ProTable from './index';
import { Button, RenderTableOpts } from 'knowdesign';
const getFormCol = () => {
  return [
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
      title: '用户账号',
      dataIndex: 'username',
      key: 'username',
      invisible: true,
    },
    {
      title: '用户实名',
      dataIndex: 'realName',
      key: 'realName',
      invisible: true,
    },
    {
      title: '所属部门',
      dataIndex: 'deptList',
      key: 'deptList',
      render: (list) => list.map((item) => item.deptName).join('>'),
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '最后更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
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
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100', '200', '500'],
    simple: true,
  });

  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const queryUserList = () => {
    return Promise.resolve({
      bizData: [
        {
          id: 1,
          username: 'xiaoming',
          realName: '明明',
          deptList: [
            {
              deptName: '滴滴云',
            },
            {
              deptName: '业务研发',
            },
          ],
          phone: 1232312312,
          email: '2123123@weqw.com',
        },
      ],
      pagination: {
        total: 10,
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
  };

  const onChangePagination = (current: any, pageSize: any) => {
    setPagination((value) => {
      return {
        ...value,
        current,
        pageSize,
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

  const expandedRowRender = () => {
    const columns: any = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: (text) => {
          return <span>Finished</span>;
        },
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return (
      <ProTable
        tableProps={{
          showHeader: false,
          rowKey: '1',
          columns,
          dataSource: data,
          attrs: {
            pagination: false,
            // className: 'table-small-bgcolor',
            size: 'small',
            // rowClassName: 'table-small-bgcolor',
          },
        }}
      />
    );
  };

  React.useEffect(() => {
    fetchUserList();
  }, [formData, pagination.current, pagination.pageSize]);

  return (
    <ProTable
      // showQueryForm={true}

      queryFormProps={{
        ...getFormText,
        defaultCollapse: true,
        columns: getFormCol(),
        onSearch: handleSubmit,
        onChange: handleChange,
        initialValues: formData,
        isResetClearAll: true,
      }}
      tableProps={{
        tableId: 'test',
        loading,
        rowKey: 'id',
        dataSource: [],
        columns: getTableCol(),
        isCustomPg: false,
        paginationProps: { ...pagination, onChange: onChangePagination },
        searchInputRightBtns: [
          {
            type: 'primary',
            label: 'Add',
            clickFunc: () => {
              console.log('111Add');
            },
          },
        ],
        // tableCustomColumns: true,
        tableHeaderSearchInput: {
          submit: (e) => {
            console.log(e, 'submit');
          },
          searchTrigger: 'enter',
        },
        getJsxElement: () => getJsxElement(),
        attrs: {
          // className: 'frameless-table',
          bordered: false,
          lineFillColor: true, // 表格是否隔行变色
          rowClassName: (r, i) => {
            return i % 2 === 0 ? '' : 'line-fill-color';
          },
          expandable: {
            expandedRowRender,
            onExpand: (expanded: any, r: any) => {
              // if (expanded) {
              //   getRowDetailData(r.status, r.key);
              // } else {
              //   // ! 去除已关闭的子表格标识，赋值成为新的数据
              //   const newexpandedData = expandedData.filter((item) => item.id !== r.key);
              //   setExpandedData(newexpandedData);
              // }
            },
            // columnWidth: '100%',
            // fixed: 'left',
          },
        },
      }}
    />
  );
};
