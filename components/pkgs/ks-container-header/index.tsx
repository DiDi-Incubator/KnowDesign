import React, { useEffect, useState } from "react";
import { Button, Tooltip, Select } from '../../index';
const { Option } = Select;
import {
  SyncOutlined,
  SettingOutlined
} from '@ant-design/icons';
import moment from 'moment';
import DRangeTime from '../d-range-time';
import IndicatorDrawer from './IndicatorDrawer';
import NodeScope from "./NodeScope";
import { Utils } from '../../utils';

import './style/index.less';


const { EventBus } = Utils;
// EventBus 实例
export const eventBus = new EventBus();

export interface Inode {
  unit: string;
  name: string;
  desc: string;
}
export interface IindicatorSelectModule {
  hide?: boolean;
  drawerTitle?: string;
  selectedRows: string[];
  tableData?: Inode[];
}

export interface IfilterData {
  hostName?: string;
  logCollectTaskId?: string | number;
  pathId?: string | number;
  agent?: string;
}

export interface IcustomScope {
  label: string;
  value: string | number;
}

interface InodeScopeModule {
  customScopeList: IcustomScope[]
  change?: Function;
}
interface propsType {
  indicatorSelectModule?: IindicatorSelectModule;
  nodeScopeModule?: InodeScopeModule;
  change: Function;
}

const SizeOptions = [
  {
    label: '3列',
    value: 8
  },
  {
    label: '2列',
    value: 12
  },
  {
    label: '1列',
    value: 24
  },
]

let relativeTimer;

const KsContainer: React.FC<propsType> = ({ indicatorSelectModule, nodeScopeModule, change }) => {

  const [gridNum, setGridNum] = useState<number>(8);
  const [dateStrings, setDateStrings] = useState<number[]>([moment().valueOf() - 60 * 60 * 1000, moment().valueOf()]);
  const [indicatorDrawerVisible, setIndicatorDrawerVisible] = useState(false);

  const [isRelative, setIsRelative] = useState(true);
  const [customList, setcustomList] = useState<IcustomScope[]>(nodeScopeModule.customScopeList);
  const [scopeData, setScopeData] = useState<{
    isTop: boolean;
    data: any
  }>({
    isTop: true,
    data: 5
  });
  const [metricsNames, setMetricsNames] = useState(indicatorSelectModule?.selectedRows || []);

  useEffect(() => {
    change({
      dateStrings,
      scopeData,
      gridNum,
      metricsNames
    })
    
  }, [dateStrings, scopeData, gridNum, metricsNames]);


  useEffect(() => {
    if (isRelative) {
      relativeTimer = window.setInterval(() => {
        reload();
      }, 1 * 60 * 1000);
    } else {
      relativeTimer && window.clearInterval(relativeTimer);
    }
    return () => {
      relativeTimer && window.clearInterval(relativeTimer);
    }
  }, [isRelative, dateStrings]);
  

  const sizeChange = (value) => {
    setGridNum(value);
    eventBus.emit('chartResize');
  }

  const timeChange = ((dateStringsArr, isRelative) => {
    setDateStrings(JSON.parse(JSON.stringify(dateStringsArr)));
    setIsRelative(isRelative);
  })

  
  const reload = () => {
    const timeLen = dateStrings[1] - dateStrings[0] || 0;
    setDateStrings([moment().valueOf() - timeLen, moment().valueOf()]);
  }

  const indicatorSelect = () => {
    setIndicatorDrawerVisible(true);
  }

  const IndicatorDrawerClose = () => {
    setIndicatorDrawerVisible(false);
  }

  const indicatorSelectSure = (selectedRowKeys) => {
    IndicatorDrawerClose();
    setMetricsNames(selectedRowKeys);
  }

  const nodeScopeChange = (data, isTop?) => {
    setScopeData({
      isTop,
      data
    });
  }

  return (
    <>
      <div className="ks-chart-container">

        <div className="ks-chart-container-header clearfix">
          <Button
            type="text"
            className="reload-icon"
            icon={<SyncOutlined />}
            onClick={reload}
          ></Button>
          <DRangeTime timeChange={timeChange} rangeTimeArr={dateStrings} />
          <div className="ks-chart-container-header-r">
            <NodeScope change={nodeScopeChange} customList={customList}/>
            {/* <Radio.Group
              optionType="button"
              buttonStyle="solid"
              options={SizeOptions}
              onChange={sizeChange}
              value={gridNum}
            /> */}
            <Select
              value={gridNum}
              style={{ width: 70 }}
              onChange={sizeChange}
            >
              {SizeOptions.map(item => (
                <Option value={item.value} key={item.value}>{item.label}</Option>
              ))}
            </Select>
            <Tooltip title="点击指标筛选，可选择指标" placement="bottom">
              <Button
                className="button-zhibiaoshaixuan"
                type='text'
                icon={<SettingOutlined />}
                onClick={indicatorSelect} />
            </Tooltip>
            
          </div>
        </div>
      </div>
      {(!indicatorSelectModule?.hide) &&
        <IndicatorDrawer
          visible={indicatorDrawerVisible}
          onClose={IndicatorDrawerClose}
          onSure={indicatorSelectSure}
          indicatorSelectModule={indicatorSelectModule} />}
    </>
  )

};

export default KsContainer;