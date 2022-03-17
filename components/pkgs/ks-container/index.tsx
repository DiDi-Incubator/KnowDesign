import React, { useEffect, useState } from "react";
import { Collapse, Button, Radio, Tooltip, Empty, Select } from '../../index';
const { Panel } = Collapse;
const { Option } = Select;
import { arrayMoveImmutable } from 'array-move';
import {
  CaretRightOutlined,
  SyncOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { IconFont } from '../icon-project';
import moment from 'moment';
import { request } from '../../utils/request';
import DragGroup from '../drag-group';
import DRangeTime from '../d-range-time';
import IndicatorDrawer from './IndicatorDrawer';
import NodeScope from "./NodeScope";
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

export interface IfilterData {
  hostName?: string;
  logCollectTaskId?: string | number;
  pathId?: string | number;
  agent?: string;
}

export interface IcustomScope {
  label: string;
  value: string | number;
}

interface InodeScopeModule {
  customScopeList: IcustomScope[]
  change?: Function;
}
interface propsType {
  dragModule: IdragModule;
  indicatorSelectModule?: IindicatorSelectModule;
  nodeScopeModule?: InodeScopeModule;
}

const SizeOptions = [
  {
    label: '3列',
    value: 8
  },
  {
    label: '2列',
    value: 12
  },
  {
    label: '1列',
    value: 24
  },
]

const customScopeList = [
  {
    "alive": true,
    "brokerId": 0,
    "host": "10.255.0.187",
    "port": 0,
    "rack": "string",
    value: 0,  // brokerId
    label: '10.255.0.187' // host
  },
  {
    "alive": true,
    "brokerId": 0,
    "host": "10.255.0.187",
    "port": 0,
    "rack": "string",
    value: 1,  // brokerId
    label: '10.255.0.188' // host
  },
  {
    "alive": true,
    "brokerId": 0,
    "host": "10.255.0.187",
    "port": 0,
    "rack": "string",
    value: 2,  // brokerId
    label: '10.255.0.189' // host
  }
]

let relativeTimer;

const KsContainer: React.FC<propsType> = ({ dragModule, indicatorSelectModule, nodeScopeModule }) => {

  let [groups, setGroups] = useState<any[]>(dragModule.groupsData);
  const [gridNum, setGridNum] = useState<number>(8);
  const [gutterNum, setGutterNum] = useState<any>([16, 16]);
  const [dateStrings, setDateStrings] = useState<number[]>([moment().valueOf() - 60 * 60 * 1000, moment().valueOf()]);
  const [indicatorDrawerVisible, setIndicatorDrawerVisible] = useState(false);
  const [queryData, setQueryData] = useState({});

  const [isRelative, setIsRelative] = useState(true);
  const [customList, setcustomList] = useState<IcustomScope[]>(customScopeList);
  const [scopeData, setscopeData] = useState<{
    isRelative: boolean;
    data: any
  }>({
    isRelative: true,
    data: {}
  })

  useEffect(() => {

    
  }, []);

  useEffect(() => {
    setGroups(dragModule.groupsData);
  }, [dragModule.groupsData]);

  useEffect(() => {
    if (isRelative) {
      relativeTimer = window.setInterval(() => {
        reload();
      }, 1 * 60 * 1000);
    } else {
      relativeTimer && window.clearInterval(relativeTimer);
    }
    return () => {
      relativeTimer && window.clearInterval(relativeTimer);
    }
  }, [isRelative, dateStrings]);
  
  const dragEnd = ({ oldIndex, newIndex, collection, isKeySorting }, e) => {
    // console.log(oldIndex, newIndex, collection, isKeySorting, e);
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
    reload();
  }

  const sizeChange = (value) => {
    setGridNum(value);
    eventBus.emit('chartResize');
  }

  const timeChange = ((dateStringsArr, isRelative) => {
    setDateStrings(JSON.parse(JSON.stringify(dateStringsArr)));
    setTimeout(() => {
      eventBus.emit('chartReload', {
        dateStrings: dateStringsArr,
        ...queryData
      });
    }, 0);
    setIsRelative(isRelative);
  })

  const reload = () => {
    const timeLen = dateStrings[1] - dateStrings[0] || 0;
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
  }

  const IndicatorDrawerClose = () => {
    setIndicatorDrawerVisible(false);
  }

  const indicatorSelectSure = (groups) => {
    setGroups(groups);
    IndicatorDrawerClose();
  }

  const handleEmitReload = () => {
    reload();
  }

  const nodeScopeChange = (data, isRelative?) => {
    console.log('nodeScopeChange=', data, isRelative)
  }

  return (
    <>
      <div className="ks-chart-container">

        <div className="ks-chart-container-header clearfix">
          <Button
            type="text"
            className="reload-icon"
            icon={<SyncOutlined />}
            onClick={reload}
          ></Button>
          <DRangeTime timeChange={timeChange} rangeTimeArr={dateStrings} />
          <div className="ks-chart-container-header-r">
            <NodeScope change={nodeScopeChange} customList={customList}/>
            {/* <Radio.Group
              optionType="button"
              buttonStyle="solid"
              options={SizeOptions}
              onChange={sizeChange}
              value={gridNum}
            /> */}
            <Select
              value={gridNum}
              style={{ width: 70 }}
              onChange={sizeChange}
            >
              {SizeOptions.map(item => (
                <Option value={item.value} key={item.value}>{item.label}</Option>
              ))}
            </Select>
            {(!indicatorSelectModule?.hide || indicatorSelectModule?.menuList?.length > 0)
              && <Tooltip title="点击指标筛选，可选择指标" placement="bottom">
                <Button
                  className="button-zhibiaoshaixuan"
                  type='text'
                  icon={<SettingOutlined />}
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
                          key: item.title,
                          requstUrl: dragModule.requstUrl,
                          eventBus,
                          showLargeChart: true
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
                      key: item.title,
                      requstUrl: dragModule.requstUrl,
                      eventBus,
                      showLargeChart: true
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
      {(!indicatorSelectModule?.hide) &&
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

export default KsContainer;