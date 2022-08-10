import React, { useState } from "react";
import { IconFont, ProDescriptions } from "@didi/dcloud-design";

// mock数据
const basisInfoData = {
  name: "myj-test-deployment",
  create: "root",
  cluster: "cluster203",
  annotations: [
    "boos",
    "myj-test-deployment",
    "deployment",
    "app-test-deployment",
  ],
  updateStrategy: "滚动更新",
  namespace: "myj-test-deployment",
  description: "测试Nginx应用测试Nginx应用测试Nginx应用测试Nginx应用测试Nginx应用测试Nginx应用",
  selector: "app-test-deployment",
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
    },
    {
      label: '指标流接收Topic',
      key: 'metricsLogsSendTopic',
    },
    {
      label: 'Agent健康度描述信息',
      key: 'agentHealthDescription',
    },
    {
      label: 'Agent CPU 限流阈值',
      key: 'cpuLimitThreshold',
    },
    {
      label: '指标流接收集群 id',
      key: 'metricsSendReceiverId',
    },
    {
      label: '错误日志接收集群 id',
      key: 'errorLogsSendReceiverId',
    },
    {
      label: '指标流接收Topic',
      key: 'metricsSendTopic',
    },
    {
      label: '错误日志接收Topic',
      key: 'errorLogsSendTopic',
    },
    {
      label: '指标流生产端属性',
      key: 'metricsProducerConfiguration',
      renderCustom:(t)=>{
        try {
          const text = JSON.parse(t);
          return text
        } catch (error) {
          return '-'
        }
      },
      needTooltip:true
    },
    {
      label: '错误日志生产端属性',
      key: 'errorLogsProducerConfiguration',
      copy:true,
    },
  ];

  return columns;
};


const test_data = {
  id: 2,
  hostName: "10-255-1-196",
  ip: "127.0.0.1",
  collectType: 2,
  cpuLimitThreshold: 1,
  byteLimitThreshold: 0,
  version: "1.0.0",
  metricsSendTopic: "metric",
  metricsSendReceiverId: 3,
  errorLogsSendTopic: "3",
  errorLogsSendReceiverId: 3,
  advancedConfigurationJsonString: "",
  healthLevel: 1,
  metricsLogsSendTopic: 'errorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerCo',
  metricsProducerConfiguration: 'errorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerCo',
  errorLogsProducerConfiguration: 'errorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfiguration'
}

// const getBasisInfoConfig = (data: any, basisInfoConfig: optionItemType[]): optionItemType[] => {
//   const list = basisInfoConfig && basisInfoConfig?.filter(ele => !ele?.invisible).map((item, index, arr) => {
//   if (item === arr.slice(-1)?.[0]) {
//       console.log(item,'item')
//       return {
//         ...item,
//         content: data[item?.key] || data[item?.key] === 0 ? data[item?.key] : '-',
//       }
//     }
//     return {
//       ...item,
//       content: data[item?.key] || data[item?.key] === 0 ? data[item?.key] : '-',
//     }
//   });
//   return list;
// };

export default () => {
  return (
    <>
      <ProDescriptions
        title={<span>自定义标题</span>}
        dataSource={test_data}
        column={{ xxl: 2 }}
        config={getAgentInfo(test_data)}
        // getBasisInfoConfig={getBasisInfoConfig}
      />
    </>
  );
};

const Demo = ()=>{
  const getAgentInfo = (info: any) => {
    const columns = [
      {
        label: 'Agent版本号',
        key: 'version',
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
      },
      {
        label: '指标流接收Topic',
        key: 'metricsLogsSendTopic',
      },
      {
        label: 'Agent健康度描述信息',
        key: 'agentHealthDescription',
      },
      {
        label: 'Agent CPU 限流阈值',
        key: 'cpuLimitThreshold',
      },
      {
        label: '指标流接收集群 id',
        key: 'metricsSendReceiverId',
      },
      {
        label: '错误日志接收集群 id',
        key: 'errorLogsSendReceiverId',
      },
      {
        label: '指标流接收Topic',
        key: 'metricsSendTopic',
      },
      {
        label: '错误日志接收Topic',
        key: 'errorLogsSendTopic',
      },
      {
        label: '指标流生产端属性',
        key: 'metricsProducerConfiguration',
        renderCustom:(t)=>{
          try {
            const text = JSON.parse(t);
            return text
          } catch (error) {
            return '-'
          }
        },
        needTooltip:true
      },
      {
        label: '错误日志生产端属性',
        key: 'errorLogsProducerConfiguration',
        copy:true,
      },
    ];
  
    return columns;
  };
  
  const test_data = {
    id: 2,
    hostName: "10-255-1-196",
    ip: "127.0.0.1",
    collectType: 2,
    cpuLimitThreshold: 1,
    byteLimitThreshold: 0,
    version: "1.0.0",
    metricsSendTopic: "metric",
    metricsSendReceiverId: 3,
    errorLogsSendTopic: "3",
    errorLogsSendReceiverId: 3,
    advancedConfigurationJsonString: "",
    healthLevel: 1,
    metricsLogsSendTopic: 'errorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerCo',
    metricsProducerConfiguration: 'errorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerCo',
    errorLogsProducerConfiguration: 'errorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfigurationerrorLogsProducerConfiguration'
  }

  return (
    <ProDescriptions
      title={<span>自定义标题</span>}
      dataSource={test_data}
      column={{ xxl: 2 }}
      config={getAgentInfo(test_data)}
    />
  )
}