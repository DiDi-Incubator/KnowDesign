---
order: 0
title: 基本
---
``` tsx
import React, { useState } from "react";
import { ProTable } from "@didi/d1-packages";

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

const getTableCol = () => {
  const columns = [
    {
      title: "用户账号",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "用户实名",
      dataIndex: "realName",
      key: "realName",
    },
    {
      title: "所属部门",
      dataIndex: "deptList",
      key: "deptList",
      render: (list) => list.map((item) => item.deptName).join(">"),
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "最后更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
  ];
  return columns;
};

export const Demo =  () => {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    position: "bottomRight",
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50", "100", "200", "500"],
    showTotal: (total: number) => `共 ${total} 条`,
  });

  const [data, setData] = useState([]);

  const queryUserList = () => {
    return Promise.resolve({
      bizData: [
        {
          id: 1,
          username: "xiaoming",
          realName: "明明",
          deptList: [
            {
              deptName: "滴滴云",
            },
            {
              deptName: "业务研发",
            },
          ],
          phone: 1232312312,
          email: "2123123@weqw.com",
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
  }

  const onChangePagination = (current: any, pageSize: any) => {
    setPagination((value) => {
      return {
        ...value,
        current,
        pageSize,
      };
    });
  };

  React.useEffect(() => {
    fetchUserList();
  }, [formData, pagination.current, pagination.pageSize]);

  return (
    <ProTable
      showQueryForm={true}
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
        loading,
        rowKey: "id",
        dataSource: data,
        columns: getTableCol(),
        paginationProps: { ...pagination, onChange: onChangePagination },
      }}
    />
  );
};

ReactDOM.render(
  <Demo />,
  mountNode
)
```