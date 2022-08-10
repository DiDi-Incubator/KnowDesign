---
order: 3
title: 带有查询表单的Table
---

## zh-CN

带有查询表单和自定义列的表格

> `showQueryForm = true` 开启查询表单;
`tableScreen = true` 开启查询表单控制按钮;
`tableCustomColumns = true` 开启自定义列控制按钮，注意：[tableCustomColumns为true的时候，如果需要本地持久化的自定义列，请填写属性tableId，如果多个表格需要自定义列持久化，请保持tableId的唯一性];

## en-US

Add Table of Queryform

```tsx
import React, { useState } from "react";
import { ProTable, Select, Button, IconFont, Tag } from 'knowdesign';
import { renderTableOpts } from 'knowdesign/common-pages/render-table-opts';

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
      type: "datePicker",
      title: "日期选择",
      dataIndex: "date1",
      placeholder: ['请选择日期']
    },
    {
      type: "dateRangePicker",
      title: "日期范围选择",
      dataIndex: "date2",
      placeholder: ['开始日期', '结束日期']
    },
    {
      type: "timePicker",
      title: "时间选择",
      dataIndex: "time1",
      placeholder: ['请选择时间']
    },
    {
      type: "timeRangePicker",
      title: "时间范围选择",
      dataIndex: "time2",
      placeholder: ['开始时间', '结束时间']
    },
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
// columns config
const getTableColumns = () => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 200,
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            lineClampTwo: true,
            needTooltip:true,
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                    color = 'volcano';
                    }
                    return (
                    <Tag style={{padding:'5px'}} color={color} key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                    );
                })}
                </>
            ),
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

const QueryFormTable = () => {
    const [loading, setloading] = useState(false);
    const [formData, setFormData] = useState({});
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        position: "bottomRight",
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
    });

    const [dataSource, setDataSource] = useState([]);

    const queryUserList = () => {
        const data = [];
        for (let key = 0; key < 20; key++) {
            data.push({
                key,
                name: 'John Brown' + key,
                age: 40 - key,
                address: `New York No. ${key} Lake Park`,
                tags: ['nice', 'developer'],
            })
        }
        return Promise.resolve({
            bizData: data,
            pagination: {
                total: 20,
            },
        });
    };

    const fetchUserList = () => {
        const { current, pageSize } = pagination;
        setloading(true);
        queryUserList()
        .then((res: any) => {
            if (res) {
            setDataSource(res.bizData);
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
    }

    const onTableChange = (pagination, filters, sorter) => {
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
        <Button type="primary">Add</Button>
        <Button>Edit</Button>
        </>
    }

    React.useEffect(() => {
        fetchUserList();
    }, [formData, pagination.current, pagination.pageSize]);

    return (
      <ProTable
        showQueryForm={true} // 是否展示queryForm筛选
        queryFormProps={{
          ...getFormText,
          columns: getFormCol(),
          onSearch: handleSubmit,
          onChange: handleChange,
          initialValues: formData,
          isResetClearAll: true,
        }}
        tableProps={{
          tableId: 'query_form_table', // 用于本地存储不展示列数据
          loading,
          rowKey: "key",
          dataSource,
          tableScreen: true, // 是否展示控制queryForm展开收起按钮
          tableCustomColumns: true, // 是否展示自定义列配置按钮
          columns: getTableColumns(),
          paginationProps: { ...pagination },
          getJsxElement: () => getJsxElement(),
          attrs: {
            onChange: onTableChange,
            scroll: {
              x: 'max-content',
            },
          }
        }}
      />
    );
};

ReactDOM.render(
  <QueryFormTable />,
  mountNode
)
```

