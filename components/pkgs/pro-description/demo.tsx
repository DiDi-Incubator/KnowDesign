import React, { useState } from "react";
import { ProDescriptions } from "./Descriptions";
import { optionItemType, BASIS_TYPE } from "./type";
import { IconFont, Tag } from "../../index";

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

const hostTypeMap = {
  0: '物理机',
  1: '容器',
  // 2:'VM虚拟机',
};

// const getAgentInfo = (info: any) => {
//   const columns = [
//     {
//       label: 'Agent版本号',
//       key: 'version',
//     },
//     {
//       label: '版本描述',
//       key: 'described',
//     },
//     {
//       label: 'CPU核数上限',
//       key: 'cpuLimitThreshold',
//     },
//     {
//       label: 'CPU核数上限',
//       key: 'cpuLimitThreshold1',
//     },
//   ];

//   return columns;
// };

const getAgentSeniorInfo = (info: any) => {
  const columns = [
    {
      label: '指标流接收集群',
      key: 'metricsSendReceiverId',
    },
    {
      label: '错误日志接收集群',
      key: 'errorLogsSendReceiverId',
    },
    {
      label: '指标流接收Topic',
      key: 'metricsLogsSendTopic',
    },
    {
      label: '错误日志接收Topic',
      key: 'errorLogsSendTopic',
    },
    {
      label: '指标流生产端属性',
      key: 'metricsProducerConfiguration',
    },
    {
      label: '错误日志生产端属性',
      key: 'errorLogsProducerConfiguration',
      copy:true,
    },
    {
      label: '配置信息',
      key: 'advancedConfigurationJsonString',
    },
  ];

  return columns;
};

const getHostInfo = (info: any) => {
  const columns = [
    {
      label: '主机IP',
      key: 'ip',
      span: 1,
    },
    {
      label: '主机类型',
      key: 'container',
      renderCustom: (t: any) => {
        return '主机类型';
      },
      span: 1,
    },
    {
      label: '宿主机名',
      key: 'parentHostName',
      invisible: info?.container === 0,
      span: 1,
    },
    {
      label: 'Agent版本名',
      key: 'agentVersion',
    },
    {
      label: '已开启日志采集任务数',
      key: 'openedLogCollectTaskNum',
    }, {
      label: '已开启日志采集路径数',
      key: 'openedLogPathNum',
    },
    // {
    //   label: '最近 agent 启动时间',
    //   key: 'lastestAgentStartupTime',
    //   render: (t: number) => moment(t).format(timeFormat),
    //   invisible: !(info.agentId !== null),
    // },
    {
      label: '所属机房',
      key: 'machineZone',
    },
    {
      label: '新增时间',
      key: 'hostCreateTime',
      // renderCustom: (t: number) => {
      //   console.log(t, 'moment(t).format(timeFormat)');
      //   return moment(t).format(timeFormat);
      // },
      // span: 1,
    },
  ];

  return columns;
};

const getAgentInfo = (info: any) => {
  const columns = [
    {
      label: 'Agent版本号',
      key: 'version',
      span: 1,
    },
    {
      label: 'Agent健康度',
      key: 'healthLevel',
      renderCustom: (t: number) => {
        const render: JSX.Element = (
          <span style={{ fontSize: '20px' }}>
            {t == 0 ? <IconFont type="icon-hong" /> : t == 1 ? <IconFont type="icon-huang" /> : t == 2 ? <IconFont type="icon-lv" /> : null}
          </span>
        );
        return render;
      },
      span: 1,
    },
    {
      label: '指标流接收Topic',
      key: 'metricsLogsSendTopic',
    },
    {
      label: 'Agent健康度描述信息',
      key: 'agentHealthDescription',
      span: 1,
    },
    {
      label: 'Agent CPU 限流阈值(单位：核)',
      key: 'cpuLimitThreshold',
      span: 1,
    },
    {
      label: '指标流接收集群 id',
      key: 'metricsSendReceiverId',
      span: 1,
    },
    {
      label: '错误日志接收集群 id',
      key: 'errorLogsSendReceiverId',
      span: 1,
    },
    {
      label: '指标流接收Topic',
      key: 'metricsSendTopic',
      span: 1,
    },
    {
      label: '错误日志接收Topic',
      key: 'errorLogsSendTopic',
      span: 1,
    },
    {
      label: '指标流生产端属性',
      key: 'metricsProducerConfiguration',
      span: 1,
      renderCustom:(t)=>{
        return <div>
          <span>
            123122412515136316
          {t+t}
          </span>
        </div>
      },
      needTooltip:true
    },
    {
      label: '错误日志生产端属性',
      key: 'errorLogsProducerConfiguration',
      span: 1,
      copy:true,
    },
  ];

  return columns;
};
const test1Data = {
  "id": 2,
  "hostName": "10-255-1-196",
  "ip": "127.0.0.1",
  "collectType": 2,
  "cpuLimitThreshold": 1,
  "byteLimitThreshold": 0,
  "version": "1.0.0",
  "metricsSendTopic": "metric",
  "metricsSendReceiverId": 3,
  "errorLogsSendTopic": "3",
  "errorLogsSendReceiverId": 3,
  "advancedConfigurationJsonString": "",
  "healthLevel": null,
  metricsLogsSendTopic: 'errorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerCo',
  metricsProducerConfiguration: 'errorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerCo',
  errorLogsProducerConfiguration: 'errorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfiguration'
}

const test2Data = {
  "hostId": 4,
  "agentId": 2,
  "hostName": "10-255-1-196",
  "ip": "10.255.1.196",
  "container": 0,
  "serviceList": [
    {
      "id": 3,
      "servicename": "应用_测试"
    },
    {
      "id": 5,
      "servicename": "test_app"
    },
    {
      "id": 6,
      "servicename": "test_app2"
    }
  ],
  "agentVersion": "1.0.0",
  "agentHealthLevel": 1,
  "machineZone": "",
  "department": "",
  "hostCreateTime": 1646191863000,
  "parentHostName": "",
  "openedLogCollectTaskNum": 1,
  "openedLogPathNum": 1,
  "lastestAgentStartupTime": null
}




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
    <>
      <ProDescriptions
        title={<span>自定义标题</span>}
        dataSource={test1Data}
        column={{ xxl: 2}}
        config={getAgentInfo(test1Data)}
        contentStyle={{minWidth:'180px'}}
      />
      <ProDescriptions
        title={<span>自定义标题</span>}
        dataSource={test2Data}
        column={{ xxl: 2}}
        contentStyle={{minWidth:'180px'}}
        config={getHostInfo(test2Data)}
      />
    </>
  );
};