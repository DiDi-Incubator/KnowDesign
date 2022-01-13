import React from "react";
import { Collapse, Card } from 'antd';
const { Panel } = Collapse;
import {
  CaretRightOutlined,
} from '@ant-design/icons';
import DragGroup from '../drag-group';



interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  dragEnd: Function;
  groupId: string | number;
  index: number;
}

const GroupItem: React.FC<propsType> = ({ children, dragEnd, groupId, index }) => {
  const sortEnd = ({ oldIndex, newIndex, collection }) => {
    dragEnd({ oldIndex, newIndex, collection });
  }
  return (
    <>
      <Collapse
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        ghost
      >
        <Panel header="This is panel header 1" key="1">
          <DragGroup 
          dragContainerProps={{
            onSortEnd: sortEnd,
            axis: "xy"
          }}
          dragItemProps={{
            collection: groupId
          }}>
            {children}
          </DragGroup>
        </Panel>
      </Collapse>  
    </>
  )

};

export default GroupItem;