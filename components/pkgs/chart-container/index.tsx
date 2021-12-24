import React, { useState } from "react";
import { Collapse, Card } from '../../basic';
const { Panel } = Collapse;
import { arrayMoveImmutable } from 'array-move';

import {
  CaretRightOutlined,
} from '@ant-design/icons';
import DragGroup from '../drag-group';



interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  
}

const data = [{
  groupId: 1,
  groupName: 'group1',
  lists: [{
    id: 1,
    name: '1-1'
  }, {
    id: 2,
    name: '1-2'
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
const ChartContainer: React.FC<propsType> = ({ children }) => {

  const [groups, setGroups] = useState(data);

  const dragEnd = ({ oldIndex, newIndex, collection }) => {
    for (let i = 0; i < groups.length; i++ ) {
      let item = groups[i];
      if (item.groupId == collection) {
        item.lists = arrayMoveImmutable(item.lists, oldIndex, newIndex);
        break;
      }
    }
    setGroups(JSON.parse(JSON.stringify(groups)));
  }
  return (
    <>
      {groups.map((item, index) => (
        <Collapse
          key={index}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          ghost
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
                grid: 8
              }}
            >
              {item.lists.map((item, index) => (
                React.Children.map(children, (child: any) => {
                  return React.cloneElement(child, {data: item, key: index})
                })
              ))}
            </DragGroup>
          </Panel>
        </Collapse> 
      ))}  
    </>
  )

};

export default ChartContainer;