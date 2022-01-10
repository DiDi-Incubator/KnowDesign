import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import SingleChart from './index';
import { Input, Button, Select, Radio, Space } from "antd";
import { Utils } from '../../utils'
const { EventBus } = Utils;
const busInstance = new EventBus();

const EnlargedChart = (props) => {
  const { eventName, eventBus, onEvents, showLargeChart, onMount, title, ...rest } = props;
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(1)
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const updateAxisPointer = (e) => {
    console.log(e, 'eee');
  };

  const handleRefresh = () => {
    busInstance.emit('singleReload', {
      time
    });
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setTime(val);
    busInstance.emit('singleReload', {
      time: val
    });
  };

  useEffect(() => {
    busInstance.emit("singleReload", {
      time
    })
  });

  return <>
    <FullscreenOutlined
      onClick={showDrawer}
    />
    <Drawer
      width={1000}
      title={title}
      placement="right"
      size="large"
      onClose={onClose}
      visible={visible}
    >
      <Space>
        <Button onClick={() => handleRefresh()}>刷新</Button>
        <Radio.Group defaultValue={time} buttonStyle="solid" onChange={handleChange}>
          <Radio.Button value={1}>近15分钟</Radio.Button>
          <Radio.Button value={2}>近一小时</Radio.Button>
          <Radio.Button value={3}>近一天</Radio.Button>
        </Radio.Group>
      </Space>
      {visible && <SingleChart {...rest} eventBus={busInstance} onEvents={{
        updateAxisPointer: updateAxisPointer,
      }}></SingleChart>}
    </Drawer>
  </>
}

export default EnlargedChart;