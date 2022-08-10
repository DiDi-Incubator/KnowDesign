---
order: 0
title: 基本
---


``` tsx
import React from "react";
import { IconFont, ProDescriptions } from "knowdesign";

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
ReactDOM.render(
  <Demo />,
  mountNode
)
```