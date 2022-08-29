import React from 'react';
import { SortableElement, SortableHandle, SortableContainerProps } from 'react-sortable-hoc';
import { IconFont } from '../icon-project';

export interface ISortableElement {
  index: number;
  collection?: string | number;
  disabled?: boolean;
}

interface propsType {
  children: React.ReactNode;
  dragItemProps: ISortableElement;
  dragContainerProps?: SortableContainerProps;
}

const DragHandle = SortableHandle(() => (
  <IconFont className="drag-handle-icon" type="icon-tuozhuai" />
));

const SortableItem = SortableElement(({ children, dragContainerProps }) => (
  <div
    className="drag-sort-item"
    style={{
      cursor: !dragContainerProps?.useDragHandle ? 'move' : 'auto',
    }}
  >
    {dragContainerProps?.useDragHandle && <DragHandle />}

    {children}
  </div>
));

const DragableItem: React.FC<propsType> = ({ children, dragItemProps, dragContainerProps }) => {
  return (
    <SortableItem {...dragItemProps} dragContainerProps={dragContainerProps}>
      {children}
    </SortableItem>
  );
};

export default DragableItem;
