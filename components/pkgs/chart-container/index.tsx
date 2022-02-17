import React, { useEffect, useState } from "react";
import { Collapse, Button, Radio } from '../../index';
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
interface propsType {
  dragModule: IdragModule;
  reloadModule: Ireload;
  indicatorSelectModule?: IindicatorSelectModule;
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

const data = [{
  groupId: 1,
  groupName: 'group1',
  lists: [{
    id: 1,
    title: '测试001',
    type: 'pie',
    name: '1-1'
  }, {
    id: 2,
    title: '测试002',
    type: 'line',
    name: '1-2'
  }, {
    id: 3,
    title: '测试003',
    type: 'line',
    name: '1-3'
  }, {
    id: 4,
    title: '测试004',
    type: 'line',
    name: '1-4'
  }, {
    id: 5,
    title: '测试005',
    type: 'line',
    name: '1-5'
  }]
},
{
  groupId: 2,
  groupName: 'group2',
  lists: [{
    id: 1,
    title: '测试007',
    type: 'line',
    name: '2-1'
  }, {
    id: 2,
    title: '测试008',
    type: 'line',
    name: '2-2'
  }]
}]
const ChartContainer: React.FC<propsType> = ({ dragModule, reloadModule, indicatorSelectModule }) => {

  let [groups, setGroups] = useState<any[]>(dragModule.groupsData);
  const [gridNum, setGridNum] = useState<number>(8);
  const [gutterNum, setGutterNum] = useState<any>([16, 16]);
  const [dateStrings, setDateStrings] = useState<number[]>([moment().valueOf() - 60 * 60 * 1000, moment().valueOf()]);
  const [lastTime, setLastTime] = useState<string>(moment().format('YYYY.MM.DD.hh:mm:ss'));
  const [indicatorDrawerVisible, setIndicatorDrawerVisible] = useState(false);
  const [queryData, setQueryData] = useState({});

  const [collectTaskList, setCollectTaskList] = useState<any[]>([
    {
      title: "全部",
      value: "0",
    },
    {
      title: "tP0",
      value: "1",
    },
    {
      title: "tP1",
      value: "2",
    },
    {
      title: "tP2",
      value: "3",
    },
  ]);
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      eventBus.emit('chartInit', {
        dateStrings,
      });
    })

    eventBus.on('queryChartContainerChange', (data) => {
      setQueryData(data);
      eventBus.emit('chartReload', {
        dateStrings,
        ...data
      });
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
    setGroups(dragModule.groupsData);
  }, [dragModule.groupsData, dragModule.isGroup]);

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
  }

  const sizeChange = (e) => {
    setGridNum(e.target.value);
    eventBus.emit('chartResize');
  }

  const timeChange = ((dateStrings) => {
    setDateStrings(dateStrings);
    eventBus.emit('chartReload', {
      dateStrings,
      ...queryData
    });
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
    console.log('getTaskList:', res, data);
    const processedData = data?.map(item => {
      return {
        ...item,
        value: item.id,
        title: item.logCollectTaskName
      }
    })
    setCollectTaskList(processedData);
  }

  const getAgent = async () => {
    const res: any = await request('/api/v1/op/agent');
    const data = res || [];
    const processedData = data?.map(item => {
      return {
        ...item,
        value: item.id,
        title: item.hostName
      }
    })

    setAgentList(processedData);
  }

  const handleEmitReload = () => {
    reload();
  }

  return (
    <>
      <div className="dd-chart-container">
        {indicatorSelectModule?.menuList?.length <= 1
          && <div className="query-module-container">
              <QueryModule 
                layout='horizontal'    
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
            {(!indicatorSelectModule?.hide || indicatorSelectModule?.menuList?.length > 0) 
              && <Button
                  className="button-zhibiaoshaixuan"
                  icon={<IconFont type="icon-zhibiaoshaixuan" />}
                  onClick={indicatorSelect} />
            }
            
          </div>
        </div>

        {
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
                        axis: "xy"
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
                          code: item.id,
                          key: index,
                          requstUrl: dragModule.requstUrl,
                          eventBus
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
                      code: item.id,
                      key: index,
                      requstUrl: dragModule.requstUrl,
                      eventBus
                    })
                  ))}
                
              </DragGroup>
            </div>
          )
        }

      </div>
      {!indicatorSelectModule?.hide &&
        <IndicatorDrawer
          visible={indicatorDrawerVisible}
          emitReload={handleEmitReload}
          onClose={IndicatorDrawerClose}
          onSure={indicatorSelectSure}
          isGroup={dragModule.isGroup}
          indicatorSelectModule={indicatorSelectModule} />}
    </>
  )

};

export default ChartContainer;