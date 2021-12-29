import React, { useState } from "react";
import { Radio, DatePicker } from 'antd';
import moment, { Moment } from "moment";
const { RangePicker } = DatePicker;



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

const TimeModule: React.FC<propsType> = ({ timeChange }) => {
  const [time, setTime] = useState<number>(60 * 60 * 1000);
  const [rangeTime, setrangeTime] = useState<[Moment, Moment]>([moment(new Date().getTime() - time), moment(new Date().getTime())]);
  const periodtimeChange = (e) => {
    const time = e.target.value;
    setTime(time);
    setrangeTime([moment(new Date().getTime() - time), moment(new Date().getTime())]);
  }
  const rangeTimeChange = (dates, dateStrings) => {
    console.log(dates, dateStrings);
    timeChange(dates, dateStrings);
    setTime(null);
  }
  return (
    <>
      <div>
        <span>时间：</span>
        <Radio.Group
          optionType="button"
          options={TimeOptions}
          onChange={periodtimeChange}
          value={time}
        />
        <RangePicker 
          showTime
          value={rangeTime}
          onChange={rangeTimeChange} 
        />
      </div>
    </>
  )

};

export default TimeModule;