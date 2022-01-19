import React, { useEffect, useState } from "react";
import { Collapse, Button, Radio } from '../../index';
const { Panel } = Collapse;
import { arrayMoveImmutable } from 'array-move';
import {
  CaretRightOutlined,
  SettingOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { IconFont } from '../icon-project';
import moment from 'moment';
import { request } from '../../utils/request';
import DragGroup from '../drag-group';
import TimeModule from './TimeModule';
import IndicatorDrawer from './IndicatorDrawer';
import { Utils } from '../../utils';
import './style/index.less';

const { EventBus }  = Utils;
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

interface Imenu {
  key: '0' | '1';
  name: string;
  url: string;
}
 export interface IindicatorSelectModule {
  hide?: boolean;
  drawerTitle?: string;
  menuList: Imenu[];
}
interface propsType {
  dragModule: IdragModule;
  reloadModule: Ireload;
  indicatorSelectModule: IindicatorSelectModule;
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
  const [gutterNum, setgutterNum] = useState<number>(8);
  const [dateStrings, setDateStrings] = useState<number[]>([moment().valueOf() - 60 * 60 * 1000, moment().valueOf()]);
  const [lastTime, setLastTime] = useState<string>(moment().format('YYYY.MM.DD.hh:mm:ss'));
  const [indicatorDrawerVisible, setIndicatorDrawerVisible] = useState(false);

  useEffect(() => {
    eventBus.emit('chartInit', {
      dateStrings: 60 * 60 * 1000,
    });
  }, []);

  

  const dragEnd = ({ oldIndex, newIndex, collection,isKeySorting }, e) => {
    console.log(oldIndex, newIndex, collection, isKeySorting, e);
    if (dragModule.isGroup) {
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
    setgutterNum(e.target.value);    
    eventBus.emit('chartResize');
  }

  const timeChange = ((dateStrings) => {
    setDateStrings(dateStrings);
    eventBus.emit('chartReload', {
      dateStrings,
    });
  })

  const reload = () => {
    const timeLen = dateStrings[1] - dateStrings[0] || 0;
    setLastTime(moment().format('YYYY.MM.DD.hh:mm:ss'));
    setDateStrings([moment().valueOf() - timeLen, moment().valueOf()])
    eventBus.emit('chartReload', {
      dateStrings,
    });
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
 
  return (
    <>
      <div className="dd-chart-container">
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
            
            <TimeModule timeChange={timeChange} rangeTimeArr={dateStrings}/>
            <Radio.Group
              optionType="button"
              options={SizeOptions}
              onChange={sizeChange}
              value={gutterNum}
            />
            <Button 
              className="button-zhibiaoshaixuan" 
              icon={<IconFont type="icon-zhibiaoshaixuan"/>}
              onClick={indicatorSelect} /> 
          </div>
        </div>

        {
          dragModule.isGroup ? (
            groups.map((item, index) => (
              <Collapse
                key={index}
                defaultActiveKey={['1']}
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
                      grid: gutterNum
                    }}
                  >
                    {item.lists.map((item, index) => (
                      React.cloneElement(dragModule.dragItem, { code: item.id, key: index, requstUrl: dragModule.requstUrl, eventBus })
                    ))}
                  </DragGroup>
                </Panel>
              </Collapse>
            ))
          ) : (
              <DragGroup
                dragContainerProps={{
                  onSortEnd: dragEnd,
                  axis: "xy"
                }}
                dragItemProps={{
                  // collection: Math.random(),
                }}
                containerProps={{
                  grid: gutterNum
                }}
              >
                {groups.map((item, index) => (
                  React.cloneElement(dragModule.dragItem, { code: item.id, key: index, requstUrl: dragModule.requstUrl, eventBus })
                ))}
              </DragGroup>
            
          )
        }
        
      </div>
      { !indicatorSelectModule?.hide && 
        <IndicatorDrawer 
          visible={indicatorDrawerVisible} 
          onClose={IndicatorDrawerClose} 
          onSure={indicatorSelectSure}
          isGroup={dragModule.isGroup}
          indicatorSelectModule={indicatorSelectModule} /> }                   
    </>
  )

};

export default ChartContainer;