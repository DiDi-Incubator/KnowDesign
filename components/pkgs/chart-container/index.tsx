import React, { ReactNode, useState } from "react";
import { Collapse, Button, Radio } from 'antd';
const { Panel } = Collapse;
import { arrayMoveImmutable } from 'array-move';
import {
  CaretRightOutlined,
  SettingOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { IconFont } from '../icon-project';
import moment from 'moment';
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

interface IdragItemChildren {
  dom: React.ReactElement;
  requstUrl?: string;
}
interface propsType {
  dragItemChildren: IdragItemChildren;
  reloadModule: Ireload
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
    name: '1-1'
  }, {
    id: 2,
    name: '1-2'
  }, {
    id: 3,
    name: '1-3'
  }, {
    id: 4,
    name: '1-4'
  }, {
    id: 5,
    name: '1-5'
  }, {
    id: 6,
    name: '1-6'
  }]
},
{
  groupId: 2,
  groupName: 'group2',
  lists: [{
    id: 1,
    name: '2-1'
  }, {
    id: 2,
    name: '2-2'
  }]
}]
const ChartContainer: React.FC<propsType> = ({ dragItemChildren, reloadModule }) => {

  const [groups, setGroups] = useState<any[]>(data);
  const [gutterNum, setgutterNum] = useState<number>(8);
  const [dateStrings, setDateStrings] = useState<string[]>([]);
  const [lastTime, setLastTime] = useState<string>(moment().format('YYYY.MM.DD.hh:mm:ss'));
  const [indicatorDrawerVisible, setIndicatorDrawerVisible] = useState(false);

  const dragEnd = ({ oldIndex, newIndex, collection }) => {
    for (let i = 0; i < groups.length; i++) {
      let item = groups[i];
      if (item.groupId == collection) {
        item.lists = arrayMoveImmutable(item.lists, oldIndex, newIndex);
        break;
      }
    }
    setGroups(JSON.parse(JSON.stringify(groups)));
  }

  const sizeChange = (e) => {
    setgutterNum(e.target.value);    
    eventBus.emit('chartResize');
  }

  const timeChange = ((dateStrings) => {
    console.log(dateStrings)
    setDateStrings(dateStrings);
    eventBus.emit('chartReload', {
      dateStrings,
    });
  })

  const reload = () => {
    setLastTime(moment().format('YYYY.MM.DD.hh:mm:ss'));
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

  React.useEffect(() => {
    eventBus.emit('chartInit', {
      dateStrings: 1,
    });
  }, [])
 
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
            
            <TimeModule timeChange={timeChange} />
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


        {groups.map((item, index) => (
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
                  React.cloneElement(dragItemChildren.dom, { code: item.id, key: index, requstUrl: dragItemChildren.requstUrl, eventBus })
                ))}
              </DragGroup>
            </Panel>
          </Collapse>
        ))}
      </div>
      <IndicatorDrawer visible={indicatorDrawerVisible} onClose={IndicatorDrawerClose}></IndicatorDrawer>              
    </>
  )

};

export default ChartContainer;