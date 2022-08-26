import React, { useState, useEffect } from 'react';
import { Radio, DatePicker, Input, Popover, Space } from '../../index';
import { IconFont } from '../icon-project';
const { RangePicker } = DatePicker;
import moment, { Moment } from 'moment';

interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  timeChange: Function;
  rangeTimeArr?: number[];
}

const TimeOptionsDefault = [
  {
    label: '最近 15 分钟',
    value: 15 * 60 * 1000,
  },
  {
    label: '最近 1 小时',
    value: 60 * 60 * 1000,
  },
  {
    label: '最近 6 小时',
    value: 6 * 60 * 60 * 1000,
  },
  {
    label: '最近 12 小时',
    value: 12 * 60 * 60 * 1000,
  },
  {
    label: '最近 1 天',
    value: 24 * 60 * 60 * 1000,
  },
];

const DRangeTime: React.FC<propsType> = ({ timeChange, rangeTimeArr }) => {
  const [time, setTime] = useState<number>(15 * 60 * 1000);
  const [rangeTime, setrangeTime] = useState<[Moment, Moment]>([
    moment(new Date().getTime() - time),
    moment(new Date().getTime()),
  ]);
  const [isRelative, setIsRelative] = useState(true);
  const [dates, setDates] = useState([]);
  const [TimeOptions, setfirst] = useState(TimeOptionsDefault);
  const [inputValue, setInputValue] = useState<string>(null);
  const [hackValue, setHackValue] = useState<any>(null);
  const [popVisible, setPopVisible] = useState(false);

  useEffect(() => {
    if (rangeTimeArr?.length > 0) {
      setrangeTime([moment(rangeTimeArr[0]), moment(rangeTimeArr[1])]);
      const rangeTimeLen = rangeTimeArr[1] - rangeTimeArr[0];
      setTime(Math.floor(rangeTimeLen / 1000) * 1000);
    }
  }, [rangeTimeArr]);

  useEffect(() => {
    if (!!time) {
      const timeOption = TimeOptions.find((item) => item.value === time);
      timeOption ? setIsRelative(true) : setIsRelative(false);
      timeOption && setInputValue(timeOption?.label);
      setPopVisible(false);
    }
  }, [time]);

  const periodtimeChange = (e) => {
    const time = e.target.value;
    setTime(time);
    setrangeTime([moment(new Date().getTime() - time), moment(new Date().getTime())]);
    timeChange([new Date().getTime() - time, new Date().getTime()], true);
    setIsRelative(true);
  };
  const rangeTimeChange = (dates, dateStrings) => {
    if (!!dates) {
      setrangeTime(dates);
      timeChange([moment(dateStrings[0]).valueOf(), moment(dateStrings[1]).valueOf()], false); // 毫秒数
      dateStrings[0] && setInputValue(`${dateStrings[0]} ~ ${dateStrings[1]}`);
      setTime(null);
      setIsRelative(false);
      setPopVisible(false);
    }
  };
  const onOpenChange = (open) => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };
  const visibleChange = (visible: any) => {
    setPopVisible(visible);
  };
  const disabledDate = (current) => {
    if (current && (current > moment().endOf('day') || current < moment().subtract(30, 'days'))) {
      return true;
    }
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 6;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 6;
    return tooEarly || tooLate;
  };
  const clickContent = (
    <div className="dd-time-range-module">
      {/* <span>时间：</span> */}
      <div className="flx_con">
        <div className="flx_l">
          <h6 className="time_title">选择时间范围</h6>
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            className="time-radio-group"
            // options={TimeOptions}
            onChange={periodtimeChange}
            value={time}
          >
            <Space direction="vertical" size={16}>
              {TimeOptions.map((item, index) => (
                <Radio value={item.value} key={index}>
                  {item.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
        <div className="flx_r">
          <h6 className="time_title">自定义时间范围</h6>
          <RangePicker
            showTime={{
              format: 'HH:mm',
            }}
            format="YYYY-MM-DD HH:mm"
            separator="~"
            onCalendarChange={(val) => setDates(val)}
            disabledDate={disabledDate}
            suffixIcon={<IconFont type="icon-riqi" style={{ color: '#74788D' }}></IconFont>}
            value={hackValue || rangeTime}
            onChange={rangeTimeChange}
            onOpenChange={onOpenChange}
          />
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div id="d-range-time">
        <Popover
          trigger={['click']}
          content={clickContent}
          placement="bottomRight"
          overlayClassName="d-range-time-popover"
          visible={popVisible}
          onVisibleChange={visibleChange}
        >
          <span className="input-span">
            <Input
              className={
                isRelative ? 'relativeTime d-range-time-input' : 'absoluteTime d-range-time-input'
              }
              value={inputValue}
              readOnly={true}
              // bordered={false}
              suffix={
                <IconFont type="icon-jiantou1" rotate={90} style={{ color: '#74788D' }}></IconFont>
              }
            />
          </span>
        </Popover>
      </div>
    </>
  );
};

export default DRangeTime;
