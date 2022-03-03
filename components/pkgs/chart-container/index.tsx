import React, { useEffect, useState } from "react";
import { Collapse, Button, Radio, Tooltip, Empty } from '../../index';
const { Panel } = Collapse;
import { arrayMoveImmutable } from 'array-move';
import {
  CaretRightOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { IconFont } from '../icon-project';
import moment from 'moment';
import { request } from '../../utils/request';
import DragGroup from '../drag-group';
import TimeModule from './TimeModule';
import IndicatorDrawer from './IndicatorDrawer';
import QueryModule from "./QueryModule";
import { Utils } from '../../utils';

import emptyPng from './image/empty.png';
import './style/index.less';


const { EventBus } = Utils;
// EventBus 实例
export const eventBus = new EventBus();

interface Ireload {
  reloadIconShow?: boolean;
  lastTimeShow?: boolean;
}

interface IdragModule {
  dragItem: React.ReactElement;
  requstUrl?: string;
  isGroup?: boolean;
  groupsData?: any[];
}

export interface Imenu {
  key: '0' | '1';
  name: string;
  url: string;
}
export interface IindicatorSelectModule {
  hide?: boolean;
  drawerTitle?: string;
  menuList?: Imenu[];
}

export interface IfilterData {
  hostName?: string;
  logCollectTaskId?: string | number;
  pathId?: string | number;
  agent?: string;
}
interface propsType {
  dragModule: IdragModule;
  reloadModule: Ireload;
  indicatorSelectModule?: IindicatorSelectModule;
  isGold?: boolean;
  filterData?: IfilterData;
}

const SizeOptions = [
  {
    label: 'S',
    value: 8
  },
  {
    label: 'M',
    value: 12
  },
  {
    label: 'L',
    value: 24
  },
]

const ChartContainer: React.FC<propsType> = ({ filterData, dragModule, reloadModule, indicatorSelectModule, isGold = false }) => {

  let [groups, setGroups] = useState<any[]>(dragModule.groupsData);
  const [gridNum, setGridNum] = useState<number>(8);
  const [gutterNum, setGutterNum] = useState<any>([16, 16]);
  const [dateStrings, setDateStrings] = useState<number[]>([moment().valueOf() - 60 * 60 * 1000, moment().valueOf()]);
  const [lastTime, setLastTime] = useState<string>(moment().format('YYYY.MM.DD.hh:mm:ss'));
  const [indicatorDrawerVisible, setIndicatorDrawerVisible] = useState(false);
  const [queryData, setQueryData] = useState({});

  const [collectTaskList, setCollectTaskList] = useState<any[]>([
    {
    "id": 2,
    "value": 2,
    "logCollectTaskName": "日志采集任务_测试",
    "title": "日志采集任务_测试",
    "logCollectTaskRemark": null,
    "services": null,
    "logCollectTaskType": 0,
    "oldDataFilterType": 0,
    "collectStartBusinessTime": null,
    "collectEndBusinessTime": null,
    "limitPriority": 1,
    "logCollectTaskStatus": 1,
    "sendTopic": "data",
    },
    {
      "id": 21,
      "value": 21,
      "logCollectTaskName": "日志采集任务_测试1",
      "title": "日志采集任务_测试1",
      "logCollectTaskRemark": null,
      "services": null,
      "logCollectTaskType": 0,
      "oldDataFilterType": 0,
      "collectStartBusinessTime": null,
      "collectEndBusinessTime": null,
      "limitPriority": 1,
      "logCollectTaskStatus": 1,
      "sendTopic": "data",
      }
    ]);
  const [agentList, setAgentList] = useState([
    {
    "id": 2,
    "hostName": "10-255-1-196",
    "title": "10-255-1-196",
    "value": "10-255-1-196",
    "ip": "127.0.0.1",
    "collectType": 2,
    "cpuLimitThreshold": 0,
    "byteLimitThreshold": 0,
    "version": null,
    "metricsSendTopic": "metric",
    "metricsSendReceiverId": 3,
    "errorLogsSendTopic": "errorlog",
    "errorLogsSendReceiverId": 3,
    "advancedConfigurationJsonString": "",
    "healthLevel": null
    },
    {
      "id": 1,
      "hostName": "10-255-1-198",
      "title": "10-255-1-1988",
      "value": "10-255-1-198",
      "ip": "127.0.0.1",
      "collectType": 2,
      "cpuLimitThreshold": 0,
      "byteLimitThreshold": 0,
      "version": null,
      "metricsSendTopic": "metric",
      "metricsSendReceiverId": 3,
      "errorLogsSendTopic": "errorlog",
      "errorLogsSendReceiverId": 3,
      "advancedConfigurationJsonString": "",
      "healthLevel": null
      }
    ]);

  useEffect(() => {
    // setTimeout(() => {
    //   eventBus.emit('chartInit', {
    //     dateStrings,
    //   });
    // })

    eventBus.on('queryChartContainerChange', (data) => {
      const res = JSON.parse(JSON.stringify(queryData));
      data?.agent ? res.agent = data?.agent : '';
      if (data?.logCollectTaskId) {
        res.logCollectTaskId = data.logCollectTaskId;
        res.hostName = data.hostName;
        res.pathId = data.pathId;
      }
      
      setQueryData(res);
      if (indicatorSelectModule?.menuList?.length !== 2) {
        eventBus.emit('chartReload', {
          dateStrings,
          ...res
        });
      }  
    })
    indicatorSelectModule.menuList.forEach(item => {
      if (item.key === '0') {
        getAgent();
      } else {
        getTaskList();
      }
    })
    return () => {
      eventBus.removeAll('queryChartContainerChange');
    }
  }, []);

  useEffect(() => {
    eventBus.emit('queryListChange', {
      agentList,
      collectTaskList,
      isCollect: true
    });
  }, [collectTaskList]);

  useEffect(() => {
    eventBus.emit('queryListChange', {
      agentList,
      collectTaskList,
      isCollect: false
    });
  }, [agentList]);

  useEffect(() => {
    eventBus.emit('queryChartContainerChange', {
      ...filterData
    });
  }, [filterData]);

  useEffect(() => {
    setGroups(dragModule.groupsData);
  }, [dragModule.groupsData]);

  const dragEnd = ({ oldIndex, newIndex, collection, isKeySorting }, e) => {
    console.log(oldIndex, newIndex, collection, isKeySorting, e);
    if (indicatorSelectModule?.menuList?.length !== 2 && dragModule.isGroup || indicatorSelectModule?.menuList?.length === 1) {
      for (let i = 0; i < groups.length; i++) {
        let item = groups[i];
        if (item.groupId == collection) {
          item.lists = arrayMoveImmutable(item.lists, oldIndex, newIndex);
          break;
        }
      }
    } else {
      groups = arrayMoveImmutable(groups, oldIndex, newIndex);
    }
    setGroups(JSON.parse(JSON.stringify(groups)));
    dragReload();
  }

  const sizeChange = (e) => {
    setGridNum(e.target.value);
    eventBus.emit('chartResize');
  }

  const timeChange = ((dateStrings) => {
    setDateStrings(dateStrings);
    setTimeout(() => {
      eventBus.emit('chartReload', {
        dateStrings,
        ...queryData
      });
    }, 0);
  })

  const reload = () => {
    const timeLen = dateStrings[1] - dateStrings[0] || 0;
    setLastTime(moment().format('YYYY.MM.DD.hh:mm:ss'));
    setDateStrings([moment().valueOf() - timeLen, moment().valueOf()]);
    setTimeout(() => {
      eventBus.emit('chartReload', {
        dateStrings,
        ...queryData
      });
    }, 0);
  }

  const dragReload = () => {
    const timeLen = dateStrings[1] - dateStrings[0] || 0;
    setLastTime(moment().format('YYYY.MM.DD.hh:mm:ss'));
    setDateStrings([moment().valueOf() - timeLen, moment().valueOf()]);
    setTimeout(() => {
      eventBus.emit('dragReload', {
        dateStrings,
        ...queryData
      });
    }, 0);
  }

  const indicatorSelect = () => {
    setIndicatorDrawerVisible(true);
    eventBus.emit('queryListChange', {
      agentList,
      collectTaskList
    });
  }

  const IndicatorDrawerClose = () => {
    setIndicatorDrawerVisible(false);
  }

  const indicatorSelectSure = (groups) => {
    setGroups(groups);
    IndicatorDrawerClose();
  }


  const getTaskList = async () => {
    const res: any = await request('/api/v1/normal/collect-task'); // 待修改
    const data = res || [];
    if (data.length > 0) {
      const processedData = data?.map(item => {
        return {
          ...item,
          value: item.id,
          title: item.logCollectTaskName
        }
      })
      setCollectTaskList(processedData);
    }
    
  }

  const getAgent = async () => {
    const res: any = await request('/api/v1/op/agent');
    const data = res || [];
    if (data.length > 0) {
      const processedData = data?.map(item => {
        return {
          ...item,
          value: item.hostName,
          title: item.hostName
        }
      })
  
      setAgentList(processedData);
    }
    
  }

  const handleEmitReload = () => {
    reload();
  }

  return (
    <>
      <div className="dd-chart-container">
        {indicatorSelectModule?.menuList?.length <= 1 && !isGold
          && <div className="query-module-container">
              <QueryModule 
                layout='horizontal'
                filterData={filterData}    
                indicatorSelectModule={indicatorSelectModule} 
                currentKey={indicatorSelectModule?.menuList[0]?.key} />
            </div>}

        <div className="dd-chart-container-header clearfix">
          <div className="dd-chart-container-header-r">
            {
              reloadModule && reloadModule.reloadIconShow &&
              <div className="reload-module">
                <Button
                  type="link"
                  icon={<ReloadOutlined />}
                  onClick={reload}
                >刷新</Button>
                {reloadModule && reloadModule.lastTimeShow && <span className="last-time">上次刷新时间: {lastTime}</span>}

              </div>
            }

            <TimeModule timeChange={timeChange} rangeTimeArr={dateStrings} />
            <Radio.Group
              optionType="button"
              options={SizeOptions}
              onChange={sizeChange}
              value={gridNum}
            />
            {(!indicatorSelectModule?.hide || indicatorSelectModule?.menuList?.length > 0) && !isGold
              && <Tooltip title="点击指标筛选，可选择指标" placement="bottom">
                <Button
                  className="button-zhibiaoshaixuan"
                  icon={<IconFont type="icon-zhibiaoshaixuan" />}
                  onClick={indicatorSelect} />
              </Tooltip>
                
            }
            
          </div>
        </div>
        {groups?.length > 0 ? 
          indicatorSelectModule?.menuList?.length !== 2 && dragModule.isGroup || indicatorSelectModule?.menuList?.length === 1 ? (
            groups.map((item, index) => (
              item?.lists?.length > 0 && 
                <Collapse
                  key={index}
                  defaultActiveKey={['1']}
                  ghost={true}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                >
                  <Panel header={item.groupName} key="1">
                    <DragGroup
                      dragContainerProps={{
                        onSortEnd: dragEnd,
                        axis: "xy",
                        // useDragHandle: true
                      }}
                      dragItemProps={{
                        collection: item.groupId,
                      }}
                      containerProps={{
                        grid: gridNum,
                        gutter: gutterNum
                      }}
                    >
                      {item?.lists?.map((item, index) => (
                        React.cloneElement(dragModule.dragItem, {
                          ...item,
                          code: item.code,
                          key: index,
                          requstUrl: dragModule.requstUrl,
                          eventBus,
                          showLargeChart: !isGold
                        })
                      ))}
                    </DragGroup>
                  </Panel>
                </Collapse>
              
            ))
          ) : (
            <div className="no-group-con">
              <DragGroup
                dragContainerProps={{
                  onSortEnd: dragEnd,
                  axis: "xy"
                }}
                dragItemProps={{
                  // collection: Math.random(),
                }}
                containerProps={{
                  grid: gridNum,
                  gutter: gutterNum
                }}
              >
                
                  {groups.map((item, index) => (
                    React.cloneElement(dragModule.dragItem, {
                      ...item,
                      code: item.code,
                      key: index,
                      requstUrl: dragModule.requstUrl,
                      eventBus,
                      showLargeChart: !isGold
                    })
                  ))}
                
              </DragGroup>
            </div>
          )
        : <div>
           <Empty
              description="数据为空，请选择指标~"
              image={Empty.PRESENTED_IMAGE_CUSTOM}
            />
          </div>
        }

        

      </div>
      {(!indicatorSelectModule?.hide || isGold) &&
        <IndicatorDrawer
          visible={indicatorDrawerVisible}
          emitReload={handleEmitReload}
          onClose={IndicatorDrawerClose}
          onSure={indicatorSelectSure}
          isGroup={dragModule.isGroup}
          isGold={isGold}
          indicatorSelectModule={indicatorSelectModule} />}
    </>
  )

};

export default ChartContainer;