import React, { ReactNode, useState } from "react";
import { Collapse, Button, Radio } from 'antd';
const { Panel } = Collapse;
import { arrayMoveImmutable } from 'array-move';

import {
  CaretRightOutlined,
  SettingOutlined
} from '@ant-design/icons';
import DragGroup from '../drag-group';
import TimeModule from './TimeModule';
import './index.less';



interface propsType {
  dragItemChildren: React.ReactElement;
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
const ChartContainer: React.FC<propsType> = ({ dragItemChildren }) => {

  const [groups, setGroups] = useState<any[]>(data);
  const [gutterNum, setgutterNum] = useState<number>(8);

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
  }

  const timeChange = ((dates, dateStrings) => {
    console.log(dates, dateStrings)
  })

  return (
    <>
      <div className="dd-chart-container">
        <div className="dd-chart-container-header clearfix">
          <div className="dd-chart-container-header-r">
            <TimeModule timeChange={timeChange} />
            <Radio.Group
              optionType="button"
              options={SizeOptions}
              onChange={sizeChange}
              value={gutterNum}
            />
            <Button type="text" icon={<SettingOutlined />} /> 
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
                  collection: item.groupId
                }}
                containerProps={{
                  grid: gutterNum
                }}
              >
                {item.lists.map((item, index) => (
                  React.cloneElement(dragItemChildren, { data: item, key: index })
                ))}
              </DragGroup>
            </Panel>
          </Collapse>
        ))}
      </div>

    </>
  )

};

export default ChartContainer;