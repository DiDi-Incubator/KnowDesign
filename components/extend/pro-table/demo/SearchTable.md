---
order: 5
title: 带有搜索的Table
---

## zh-CN

带有搜索框和列自定义的表格
> `tableHeaderSearchInput` 具体属性请查看  [ISearchInput](#ISearchInput),
`columns` 配置属性 `filterTitle` 为 `true` 时开启列的自定义按钮（`注意：开启列自定义时，默认当前列不可以被隐藏`）。更多属性查看 [ColumnsType](#https://ant.design/components/table-cn/#Column)

## en-US

Add Table of Queryform

```tsx
import React, { useState } from "react";
import { ProTable, Select, Button, IconFont, Tag, renderTableOpts } from 'knowdesign';

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
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
            sorter:(a,b)=>{
                return a.age-b.age;
            },
        },
        {
            title: "LineClampTwo",
            dataIndex: "lineClampTwo",
            key: "lineClampTwo",
            lineClampTwo: true,
            needTooltip:true,
            width: 200,
        },
        {
            title: "LineClampOne",
            dataIndex: "lineClampOne",
            key: "lineClampOne",
            lineClampOne: true,
            needTooltip:true,
            width: 300,
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
            filterTitle: true,
            render: (t, r) => {
            const btn = getOperationList();
            return renderTableOpts(btn, r)
            }
        },
    ];
    return columns;
};

const SearchTable = () => {
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
        for (let key = 0; key < 5; key++) {
            data.push({
                key,
                name: 'John Brown' + key,
                age: 40 - key,
                lineClampTwo: `展示两行，超出省略；展示两行，超出省略；展示两行，超出省略；展示两行，超出省略；展示两行，超出省略`,
                lineClampOne: `展示一行，超出省略；展示一行，超出省略；展示一行，超出省略；展示一行，超出省略；展示一行，超出省略`,
                tags: ['nice', 'developer'],
            })
        }
        return Promise.resolve({
            bizData: data,
            pagination: {
                total: 10,
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

    const onTableChange = (pagination, filters, sorter) => {
        console.log(pagination,'pagination')
        console.log(filters,'filters')
        console.log(sorter,'sorter')
        setPagination((value) => {
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
            tableProps={{
                tableId: 'search_table', // 用于本地存储不展示列数据
                loading,
                rowKey: "key",
                dataSource,
                columns: getTableColumns(),
                paginationProps: { ...pagination },
                tableHeaderSearchInput: { // 搜索框
                    submit: (e) => {
                        console.log(e, 'submit')
                    },
                    searchInputType:'search',
                    searchAttr:{
                        placeholder:'请输入关键字',
                        className:'customClassName',
                    },
                    searchTrigger: 'enter' // 触发搜索的条件
                },
                getJsxElement: () => getJsxElement(),
                pgSelectComponentText:'每页展示',
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
  <SearchTable />,
  mountNode
)
```

