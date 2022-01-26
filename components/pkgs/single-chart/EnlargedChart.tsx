import React, { useState, useEffect } from 'react';
import { FullscreenOutlined, ReloadOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
import { Input, Button, Select, Radio, Space, Drawer } from "../../index";
import moment from 'moment';
import TimeModule from '../chart-container/TimeModule';
import { Utils } from '../../utils'
import type { LineChartProps } from './LineChart'
import LinkageTable from './linkageTable';
const { EventBus } = Utils;
const busInstance = new EventBus();

const EnlargedChart = (props: LineChartProps & {
  requestParams?: any;
  onSave?: any;
}) => {
  const { title, requestParams, url, request, onSave } = props;
  const [rangeTimeArr, setRangeTimeArr] = useState<any[]>();
  const [propParams, setPropParams] = useState<any>();
  const [lastTime, setLastTime] = useState<string>(moment().format('YYYY.MM.DD.hh:mm:ss'));
  const [visible, setVisible] = useState(false);
  const [lineData, setlineData] = useState([]);
  const [sort, setSort] = useState("");


  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    // busInstance.emit('singleReload', {
    //   rangeTimeArr
    // });
    setVisible(false);
  };


  const handleSave = (isClose?: boolean) => {
    onSave({
      sort
    });
    isClose && setVisible(false);
  };

  const handleSortChange = (sortVal) => {
    setSort(sortVal);
    busInstance.emit('singleReload', {
      startTime: rangeTimeArr[0],
      endTime: rangeTimeArr[1],
      sortMetricType: sortVal
    });
  };

  const handleRefresh = () => {
    busInstance.emit('singleReload', {
      startTime: rangeTimeArr[0],
      endTime: rangeTimeArr[1],
    });
  };

  const timeChange = ((val) => {
    setRangeTimeArr(rangeTimeArr);
    busInstance.emit('singleReload', {
      startTime: val[0],
      endTime: val[1],
    });
  });

  useEffect(() => {
    if (visible && requestParams) {
      const { dateStrings, sortMetricType, ...rest } = requestParams;
      setPropParams({
        ...rest,
        topN: 0, // 获取全部的数据
      })
      setRangeTimeArr(dateStrings);
      setSort(sortMetricType);
      busInstance.emit("singleReload", {
        sort: sortMetricType,
        startTime: dateStrings?.[0],
        endTime: dateStrings?.[1],
      });
    }
  }, [visible, requestParams]);

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
        <Button onClick={() => handleSave(true)} type="primary" style={{ marginLeft: 10 }}>
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
        <TimeModule timeChange={timeChange} rangeTimeArr={rangeTimeArr} />
      </Space>
      {visible && <LineChart
        wrapStyle={{
          width: '100%',
          height: 300,
        }}
        dispatchAction={setlineData}
        eventBus={busInstance}
        url={url}
        request={request}
        propParams={propParams}
        resCallback={(res: any) => res.data}

        xAxisCallback={((data) => data?.[0].map((item) => item.timeStampMinute))}
        legendCallback={((data) => data?.map((item) => item[0].name)?.splice(0, 6))}
        seriesCallback={(data) => {
          console.log(data, 'dada');
          
          const arr = data.map((item, index) => {
            return {
              name: data[index][0].name,
              data: data[index]
            }
          }) || [];
          // 图表最多展示6条
          return arr.splice(0, 6);
        }}></LineChart>}
      <br />
      <br />
      {props.tableProps ? <LinkageTable dispatchSort={handleSortChange}  sortFieldCode={sort} requestParams={requestParams} lineData={lineData} tableProps={props.tableProps} /> : null}
    </Drawer>
  </>
}

export default EnlargedChart;
