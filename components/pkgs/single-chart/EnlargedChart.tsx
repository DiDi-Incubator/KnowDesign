import React, { useState, useEffect } from 'react';
import { FullscreenOutlined, ReloadOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
import { Input, Button, Select, Radio, Space, Drawer } from "../../index";
import moment from 'moment';
import TimeModule from '../chart-container/TimeModule';
import { Utils } from '../../utils'
import { lineChartProps } from './LineChart'
import LinkageTable from './linkageTable';
const { EventBus } = Utils;
const busInstance = new EventBus();

const EnlargedChart = (props: lineChartProps & {
  requestParams?: any;
}) => {
  const { connectEventName, eventBus, onEvents, onMount, title, requestParams, ...rest } = props;

  const [dateStrings, setDateStrings] = useState<any[]>();
  const [lastTime, setLastTime] = useState<string>(moment().format('YYYY.MM.DD.hh:mm:ss'));
  const [visible, setVisible] = useState(false);
  const [lineData, setlineData] = useState([]);
  const [sort, setSort] = useState({});

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    busInstance.emit('singleReload', {
      dateStrings
    });
    setVisible(false);
  };

  const onKeep = (isClose?: boolean) => {
    busInstance.emit('singleReload', {
      dateStrings,
      sort
    });
    isClose && setVisible(false);
  };

  useEffect(() => {
    onKeep();
  }, [sort]);


  const updateAxisPointer = (e) => {
    // console.log(e, 'eee');
  };

  const handleRefresh = () => {
    busInstance.emit('singleReload', {
      dateStrings
    });
  };

  const timeChange = ((dateStrings) => {
    setDateStrings(dateStrings);
    busInstance.emit('singleReload', {
      dateStrings,
    });
  });

  useEffect(() => {
    if(visible) {
      setDateStrings(requestParams.dateStrings);
      busInstance.emit("singleReload", {
        dateStrings: requestParams.dateStrings
      });
    }
  }, [visible]);

  return <>
    <Button type="text"
      icon={<FullscreenOutlined />} onClick={showDrawer}>
    </Button>

    <Drawer
      width={1080}
      title={title}
      placement="right"
      onClose={onClose}
      visible={visible}
      footer={<div style={{
        textAlign: 'left',
      }}>
        <Button onClick={onClose}>
          取消
        </Button>
        <Button onClick={() => onKeep(true)} type="primary" style={{ marginLeft: 10 }}>
          保存
        </Button>
      </div>}
    >
      <Space>
        <div className="reload-module">
          <Button
            type="text"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
          >刷新</Button>
          <span className="last-time">上次刷新时间: {lastTime}</span></div>
        <TimeModule timeChange={timeChange} rangeTimeArr={dateStrings} />
      </Space>
      {visible && <LineChart dispatchAction={setlineData} {...rest} eventBus={busInstance} propsParams={requestParams} onEvents={{
        updateAxisPointer: updateAxisPointer,
      }}></LineChart>}
      <br/>
      <br/>
      {props.tableProps ? <LinkageTable dispatchSort={setSort} requestParams={requestParams} lineData={lineData} tableProps={props.tableProps}/> : null}
    </Drawer>
  </>
}

export default EnlargedChart;
