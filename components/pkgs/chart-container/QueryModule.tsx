import React, { useState, useEffect, useImperativeHandle } from "react";
import { Select, Row, Col } from 'antd';
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
  currentKey,
  indicatorSelectModule
}) => {

  const [collectTaskList, setCollectTaskList] = useState([
    {
      title: "全部",
      value: "all",
    },
    {
      title: "tP0",
      value: "p0",
    },
    {
      title: "tP1",
      value: "p1",
    },
    {
      title: "tP2",
      value: "p2",
    },
  ]);
  const [pathList, setPathList] = useState<any[]>([]);
  const [hostList, setHostList] = useState<any[]>([]);
  const [agentList, setAgentList] = useState([])
  const [logCollectTaskId, setlogCollectTaskId] = useState<number>(null);
  const [hostName, setHostName] = useState<string>(null);
  const [pathId, setPathId] = useState<number>(null);
  const [agent, setAgent] = useState<number>(null);

  useEffect(() => {
    console.log('indicatorSelectModule-==', indicatorSelectModule)
    const menuList = indicatorSelectModule?.menuList || [];
    if (menuList?.length > 0) {
      menuList.forEach(item => {
        if (item.key === '0') {
          getAgent();
        } else {
          getHostList();
          getPathList();
          getTaskList();
        }
      })
    }
  }, [indicatorSelectModule?.menuList]);

  const getHostList = async () => {
    const res: any = await request('/api/v1/normal/host/list'); // 待修改
    const data = res.data;
    
    setHostList(data);
  }
  const getPathList = async () => {
    const res: any = await request('/api/v1/normal/path/list'); /// 待修改
    const data = res.data;
    // eventBus.emit('queryListChange', {
    //   pathList: data
    // });
    setPathList(data);
  }
  const getTaskList = async () => {
    const res: any = await request('/api/v1/normal/task/list'); // 待修改
    const data = res.data;
    // eventBus.emit('queryListChange', {
    //   collectTaskList: data
    // });
    setCollectTaskList(data);
  }
  const getAgent = async () => {
    const res: any = await request('/api/v1/normal/agent/list'); // 待修改
    const data = res.data;
    eventBus.emit('queryListChange', {
      agentList: data
    });
    // setAgentList(data);
  }
  const logCollectTaskIdChange = (vals) => {
    console.log(vals);
  }
  const logCollectTaskIdSearch = (val) => {
    console.log(val);
  }
  const pathChange = (vals) => {
    console.log(vals);
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
                onSearch={logCollectTaskIdSearch}
                filterOption={(text, option) => {
                  return option.props.label?.toLowerCase().indexOf(text.toLowerCase()) >= 0
                }
                }
              >
                {collectTaskList.map(item => (
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
                filterOption={(text, option) => {
                  return option.props.label?.toLowerCase().indexOf(text.toLowerCase()) >= 0
                }
                }
              >
                {pathList.map(item => (
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
                onChange={pathChange}
                filterOption={(text, option) => {
                  return option.props.label?.toLowerCase().indexOf(text.toLowerCase()) >= 0
                }
                }
              >
                {hostList.map(item => (
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
                onChange={logCollectTaskIdChange}
                onSearch={logCollectTaskIdSearch}
                filterOption={(text, option) => {
                  return option.props.label?.toLowerCase().indexOf(text.toLowerCase()) >= 0
                }
                }
              >
                {agentList.map(item => (
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