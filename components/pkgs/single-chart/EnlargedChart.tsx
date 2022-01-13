import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { FullscreenOutlined, ReloadOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
import { Input, Button, Select, Radio, Space } from "antd";
import moment from 'moment';
import TimeModule from '../chart-container/TimeModule';
import { Utils } from '../../utils'
import { lineChartProps } from './LineChart'
const { EventBus } = Utils;
const busInstance = new EventBus();

const EnlargedChart = (props: lineChartProps & {
  requestParams?: any;
}) => {
  const { connectEventName, eventBus, onEvents, onMount, title, requestParams, ...rest } = props;
  console.log(requestParams, 'requestParams');
  
  const [dateStrings, setDateStrings] = useState<string[]>([]);
  const [lastTime, setLastTime] = useState<string>(moment().format('YYYY.MM.DD.hh:mm:ss'));
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
    setTimeout(() => {
      busInstance.emit("chartInit", {
        dateStrings
      })
    });
  };

  const onClose = () => {
    setVisible(false);
  };

  const updateAxisPointer = (e) => {
    console.log(e, 'eee');
  };

  const handleRefresh = () => {
    busInstance.emit('singleReload', {
      dateStrings
    });
  };

  const timeChange = ((dateStrings) => {
    console.log(dateStrings)
    setDateStrings(dateStrings);
    busInstance.emit('chartReload', {
      dateStrings,
    });
  });

  return <>
    <Button icon={<FullscreenOutlined />} onClick={showDrawer}>
    </Button>

    <Drawer
      width={1080}
      title={title}
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Space>
        <div className="reload-module">
          <Button
            type="link"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
          >刷新</Button>
          <span className="last-time">上次刷新时间: {lastTime}</span></div>
        <TimeModule timeChange={timeChange} />
      </Space>
      {visible && <LineChart {...rest} eventBus={busInstance} onEvents={{
        updateAxisPointer: updateAxisPointer,
      }}></LineChart>}
    </Drawer>
  </>
}

export default EnlargedChart;