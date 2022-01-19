import React, { useState } from "react";
import { ProDescriptions } from "./Descriptions";
import { optionItemType, BASIS_TYPE } from "./type";
import { Tag } from "../../index";

// mock数据
const basisInfoData = {
  name: "myj-test-deployment",
  create: "root",
  cluster: "cluster203",
  annotations: [
    "boos",
    "myj-test-deployment",
    "deployment",
    "app:myj-test-deployment",
  ],
  updateStrategy: "滚动更新",
  namespace: "myj-test-deployment",
  description:
    "测试Nginx应用测试Nginx应用测试Nginx应用测试Nginx应用测试Nginx应用测试Nginx应用",
  selector: "app:myj-test-deployment",
};

export default () => {
  const [infoData, setInfoData] = useState<any>(basisInfoData);

  // 基础信息配置项
  const basisInfoConfig: optionItemType[] = [
    {
      label: "名称",
      key: "name",
      copy: true,
      // span: 4,
      // customType: 'edit',
      // required: true,
      // validator: (value, cb) => {
      //   if (!value) {
      //     cb('请输入')
      //     return false
      //   }
      // }
    },
    {
      label: "描述",
      key: "description",
      copy: true,
      // customType: 'edit',
      required: true
    },
    {
      label: "创建人",
      key: "create",
    },
    {
      label: "集群",
      key: "cluster",
    },
    {
      label: "注解",
      key: "annotations",
      // customType: BASIS_TYPE.highlight,
    },
    {
      label: "更新策略",
      key: "updateStrategy",
    },
    {
      label: "命名空间",
      key: "namespace",
      renderCustom: (contnet: any) => {
        // 可自定义渲染及展示的逻辑
        return (
          <Tag key={contnet} color="green">
            {contnet}
          </Tag>
        );
      },
      span: 2
    },
    {
      label: "选择器",
      key: "selector",
      copy: true,
    },
  ];
  return (
    <ProDescriptions
      title={<span>自定义标题</span>}
      dataSource={infoData}
      config={basisInfoConfig}
    />
  );
};