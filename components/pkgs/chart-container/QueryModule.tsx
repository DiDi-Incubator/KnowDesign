import React, { useState, useEffect, useImperativeHandle } from "react";
import { Select, Row, Col, message, Tooltip } from '../../index';
const { Option } = Select;
import { request } from '../../utils/request';
import './style/query-module.less';
import { eventBus } from './index';
import { IconFont } from '../icon-project';
import { IindicatorSelectModule } from './index';


interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  currentKey: string;
  indicatorSelectModule: IindicatorSelectModule;
  layout?: 'horizontal' | 'vertical'
}

const QueryModule: React.FC<propsType> = ({
  currentKey,
  indicatorSelectModule,
  layout
}) => {

  const [collectTaskList, setCollectTaskList] = useState<any[]>([]);
  const [pathList, setPathList] = useState<any[]>([]);
  const [hostList, setHostList] = useState<any[]>([]);
  const [agentList, setAgentList] = useState<any[]>([
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
  const [logCollectTaskId, setlogCollectTaskId] = useState<number | string>(null);
  const [hostName, setHostName] = useState<string>(null);
  const [pathId, setPathId] = useState<number | string>(null);
  const [agent, setAgent] = useState<number | string>(null);

  useEffect(() => {
    eventBus.on('queryListChange', (val) => {
      if (val.isCollect && currentKey !== '0') {
        setCollectTaskList(val.collectTaskList);
      } else {
        setAgentList(val.agentList);
      }
      
    });
    return () => {
      eventBus.removeAll('queryListChange');
    }
  }, []);

  useEffect(() => {
    if (collectTaskList[0]?.value) {
      setlogCollectTaskId(collectTaskList[0]?.value);
    } else {
      setlogCollectTaskId(null);
    }
    
  }, [collectTaskList[0]?.value]);

  useEffect(() => {
    if (agentList[0]?.value) {
      setAgent(agentList[0]?.value);
    } else {
      setAgent(null);
    }
    
  }, [agentList[0]?.value]);

  useEffect(() => {
    if (!!logCollectTaskId) {
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
    console.log('getHostList', res)
    const data = res.data || res;
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
    console.log('getPathList:', res);
    const data = res.data || res || [];
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
        <div className={layout === 'horizontal' ? 'horizontal' : 'vertical'}>
          {currentKey === '1' &&
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div className="label-name">采集任务：</div>
                <Select
                  showSearch
                  suffixIcon={<IconFont type='icon-xiala'/>}
                  placeholder="请选择采集任务"
                  labelInValue={true}
                  value={{value:logCollectTaskId}}
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
                <div className="label-name">path：</div>
                <Tooltip title='请先选择采集任务'>
                  <Select
                    showSearch
                    suffixIcon={<IconFont type='icon-xiala'/>}
                    placeholder="请选择path"
                    labelInValue={true}
                    disabled={logCollectTaskId !==null ? false : true}
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
                </Tooltip>
                
              </Col>
              <Col span={8}>
                <div className="label-name">host：</div>
                <Tooltip title='请先选择采集任务'>
                  <Select
                    showSearch
                    suffixIcon={<IconFont type='icon-xiala'/>}
                    placeholder="请选择host"
                    labelInValue={true}
                    disabled={logCollectTaskId !==null ? false : true}
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
                </Tooltip>
              </Col>
            </Row>}
          {currentKey === '0' &&
            <Row gutter={[16, 16]}>
              <Col span={indicatorSelectModule?.menuList?.length > 1 ? 24 : 8}>
                <div className="label-name">Agent：</div>
                <Select
                  showSearch
                  suffixIcon={<IconFont type='icon-xiala'/>}
                  placeholder="请选择Agent"
                  style={{width: indicatorSelectModule?.menuList?.length > 1 ? '224px' : 'auto'}}
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
        
      </div>
    </>
  )

};

export default QueryModule;