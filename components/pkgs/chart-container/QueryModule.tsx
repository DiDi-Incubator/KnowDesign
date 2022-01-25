import React, { useState, useEffect, useImperativeHandle } from "react";
import { Select, Row, Col, message } from '../../index';
const { Option } = Select;
import { request } from '../../utils/request';
import './style/query-module.less';
import { eventBus } from './index';
import { IindicatorSelectModule } from './index';


interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  currentKey: string;
  indicatorSelectModule: IindicatorSelectModule;
}

const QueryModule: React.FC<propsType> = ({
  currentKey
}) => {

  const [collectTaskList, setCollectTaskList] = useState<any[]>([]);
  const [pathList, setPathList] = useState<any[]>([]);
  const [hostList, setHostList] = useState<any[]>([]);
  const [agentList, setAgentList] = useState([
    {
      title: "全部",
      label: "全部",
      value: "all",
      id: 0
    },
    {
      title: "tP0",
      label: "tP0",
      value: "p0",
      id: 1
    },
    {
      title: "tP1",
      label: "tP1",
      value: "p1",
      id: 2
    },
    {
      title: "tP2",
      label: "tP2",
      value: "p2",
      id: 3
    },
  ])
  const [logCollectTaskId, setlogCollectTaskId] = useState<number>(null);
  const [hostName, setHostName] = useState<string>(null);
  const [pathId, setPathId] = useState<number>(null);
  const [agent, setAgent] = useState<number>(null);

  useEffect(() => {
    eventBus.on('queryListChange', (val) => {
      setAgentList(val.agentList);
      setCollectTaskList(val.collectTaskList);
    });
  }, []);

  useEffect(() => {
    if (logCollectTaskId) {
      getHostList();
      getPathList();
    } 
  }, [logCollectTaskId]);

  useEffect(() => {
    eventBus.emit('queryChartContainerChange', {
      logCollectTaskId,
      hostName,
      pathId,
      agent
    });
  }, [logCollectTaskId, hostName, pathId, agent])

  const getHostList = async () => {
    if (!logCollectTaskId) {
      message.warning('请先选择采集任务');
      return;
    }
    const res: any = await request(`/api/v1/normal/host/collect-task/${logCollectTaskId}`);
    const data = res.data;
    const processedData = data?.map(item => {
      return {
        ...item,
        value: item.hostId,
        title: item.hostName
      }
    })
    setHostList(processedData);
  }
  const getPathList = async () => {
    
    const res: any = await request(`/api/v1/normal/collect-task/${logCollectTaskId}`);
    const data = res.data;
    const processedData = data?.fileLogCollectPathList?.map(item => {
      return {
        ...item,
        value: item.id,
        title: item.path
      }
    })
    setPathList(processedData);
  }
  
  const logCollectTaskIdChange = (vals) => {
    console.log(vals);
    setlogCollectTaskId(vals.value);
  }
  const hostChange = (vals) => {
    setHostName(vals.value);
  }
  const pathChange = (vals) => {
    setPathId(vals.value);
  }
  const agentChange = (vals) => {
    console.log(vals)
    setAgent(vals.value);
    
  }

  const pathFocus = () => {
    if (!logCollectTaskId) {
      message.warning('请先选择采集任务');
      return;
    }
  }
  const hostFocus = () => {
    if (!logCollectTaskId) {
      message.warning('请先选择采集任务');
      return;
    }
  }

  return (
    <>
      <div className="query-select">
        {currentKey === '1' &&
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Select
                showSearch
                placeholder="请选择采集任务"
                labelInValue={true}
                optionFilterProp="label"
                onChange={logCollectTaskIdChange}
                filterOption={(text, option) => {
                  return option.props.label?.toLowerCase().indexOf(text.toLowerCase()) >= 0
                }
                }
              >
                {collectTaskList?.map(item => (
                  <Option key={item.value} value={item.value} label={item.title}>{item.title}</Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <Select
                showSearch
                placeholder="请选择path"
                labelInValue={true}
                optionFilterProp="label"
                onChange={pathChange}
                onFocus={pathFocus}
                filterOption={(text, option) => {
                  return option.props.label?.toLowerCase().indexOf(text.toLowerCase()) >= 0
                }
                }
              >
                {pathList?.map(item => (
                  <Option key={item.value} value={item.value} label={item.title}>{item.title}</Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <Select
                showSearch
                placeholder="请选择host"
                labelInValue={true}
                optionFilterProp="label"
                onChange={hostChange}
                onFocus={hostFocus}
                filterOption={(text, option) => {
                  return option.props.label?.toLowerCase().indexOf(text.toLowerCase()) >= 0
                }
                }
              >
                {hostList?.map(item => (
                  <Option key={item.value} value={item.value} label={item.title}>{item.title}</Option>
                ))}
              </Select>
            </Col>
          </Row>}
          {currentKey === '0' &&
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Select
                showSearch
                placeholder="请选择Agent"
                labelInValue={true}
                optionFilterProp="label"
                onChange={agentChange}
                filterOption={(text, option) => {
                  return option.props.label?.toLowerCase().indexOf(text.toLowerCase()) >= 0
                }
                }
              >
                {agentList?.map(item => (
                  <Option key={item.value} value={item.value} label={item.title}>{item.title}</Option>
                ))}
              </Select>
            </Col>
            
          </Row>}
      </div>
    </>
  )

};

export default QueryModule;