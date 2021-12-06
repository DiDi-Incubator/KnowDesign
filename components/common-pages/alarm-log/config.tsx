import * as React from "react";
import { Cascader, Button, Tooltip, Popconfirm, Divider } from "antd";
import { Utils } from "../../utils";
import { renderTableLabels } from '../render-table-labels';
import { CheckCircleFilled, MinusCircleFilled } from "@ant-design/icons";
const { formatDate } = Utils
export interface ITableBtn {
  clickFunc?: () => void;
  type?: string;
  customFormItem?: string | JSX.Element;
  isRouterNav?: boolean;
  label: string | JSX.Element;
  className?: string;
  needConfirm?: boolean;
  aHref?: string;
  confirmText?: string;
  noRefresh?: boolean;
  loading?: boolean;
  disabled?: boolean;
  invisible?: boolean; // 不可见
}

export const getProjectQueryXForm = () => {
  return [
    {
      type: "select",
      title: "告警级别",
      dataIndex: "priority",
      options: [
        {
          title: "一级告警",
          value: 1,
        },
        {
          title: "二级告警",
          value: 2,
        },
        {
          title: "三级告警",
          value: 3,
        },
      ],
    },
    {
      type: "input",
      title: "告警名称",
      dataIndex: "name",
      placeholder: "请输入策略名称",
      initialValue: "all",
      componentProps: {
        maxLength: 128,
      },
    },
    {
      type: "input",
      title: "告警对象",
      dataIndex: "objectId",
      placeholder: "请输入告警对象ID",
      initialValue: "all",
      componentProps: {
        maxLength: 128,
      },
    },
    {
      type: "input",
      title: "告警组",
      dataIndex: "operator",
      placeholder: "请输入告警组",
      initialValue: "all",
      componentProps: {
        maxLength: 128,
      },
    },
    {
      type: "input",
      title: "告警用户",
      dataIndex: "operator",
      placeholder: "请输入告警用户",
      initialValue: "all",
      componentProps: {
        maxLength: 128,
      },
    },
    {
      type: "select",
      title: "状态",
      dataIndex: "status",
      options: [
        {
          title: "启用",
          value: 0,
        },
        {
          title: "停用",
          value: 1,
        },
      ],
    },
  ];
};

export const getFormText: { searchText: string; resetText: string } = {
  searchText: "查询",
  resetText: "重置",
};

export const getProjectColumns = () => {
  const columns = [
    {
      title: "使用部门",
      dataIndex: "dept",
      key: "dept",
    },
    {
      title: "项目负责人",
      dataIndex: "chargeUser",
      key: "chargeUser",
      render: (_value: any, _row: { chargeUserIdList: [] }) =>
        renderTableLabels({
          list: _row.chargeUserIdList,
          limit: 2,
        }),
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "状态",
      dataIndex: "isRunning",
      key: "isRunning",
      // eslint-disable-next-line react/display-name
      render: (_value: boolean) => {
        return (
          <span>
            {_value ? (
              <>
                <CheckCircleFilled style={{ color: "#46D677", marginRight: "4px" }} />
                <span>启用</span>
              </>
            ) : (
              <>
                <MinusCircleFilled style={{ color: "#F4A838", marginRight: "4px" }} />
                <span>禁用</span>
              </>
            )}
          </span>
        );
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (_value: any) => {
        formatDate(_value, "YYYY-MM-DD HH:mm:ss");
      },
    },
  ];
  return columns;
};

export const readableForm = [
  {
    readonly: true,
    label: "IP",
    prop: "operatorIp",
    readText: "",
  },
  {
    readonly: true,
    label: "账号",
    prop: "operatorUsername",
    readText: "",
  },
  {
    readonly: true,
    label: "时间",
    prop: "createTime",
    readText: "",
  },
  {
    readonly: true,
    label: "操作类型",
    prop: "operateType",
    readText: "",
  },
  {
    readonly: true,
    label: "对象分类",
    prop: "targetType",
    readText: "",
  },
  {
    readonly: true,
    label: "操作类型",
    prop: "target",
    readText: "",
  },
];
export const writableForm = [
  {
    label: "项目名称:",
    name: "projectName",
    formProps: {
      maxLength: 128,
    },
    itemProps: {
      rules: [{ required: true, message: "项目名称不能为空" }],
    },
  },
  {
    label: "使用部门:",
    name: "dept",
    itemProps: {
      rules: [{ required: true, message: "使用部门不能为空" }],
    },
  },
  {
    label: "负责人:",
    name: "chargeUserId",
    itemProps: {
      rules: [{ required: true, message: "负责人不能为空" }],
    },
  },
  {
    type: "textarea",
    label: "描述:",
    name: "description",
    itemProps: {
      rules: [{ required: true, message: "描述不能为空" }],
    },
    formProps: {
      maxLength: 512,
    },
  },
  {
    type: "radio",
    label: "状态:",
    name: "isRunning",
    submit: (e) => console.log(e),

    itemProps: {
      rules: [{ required: true, message: "状态不能为空" }],
    },
    options: [
      {
        label: "是",
        value: true,
      },
      {
        label: "否",
        value: false,
      },
    ],
  },
];
