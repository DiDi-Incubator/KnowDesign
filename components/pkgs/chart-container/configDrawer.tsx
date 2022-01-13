import React, { useState } from "react";
import { Drawer } from 'antd';
import moment, { Moment } from "moment";



interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  timeChange: Function;
}

const TimeOptions = [
  {
    label: '近15分钟',
    value: 15 * 60 * 1000
  },
  {
    label: '近1小时',
    value: 60 * 60 * 1000
  },
  {
    label: '近1天',
    value: 24 * 60 * 60 * 1000
  },
]

const ConfigDrawer: React.FC<propsType> = ({ timeChange }) => {
  const [time, setTime] = useState<number>(60 * 60 * 1000);
  
  return (
    <>
      <div>
        
      </div>
    </>
  )

};

export default ConfigDrawer;