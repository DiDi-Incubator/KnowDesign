---
order: 0
title: 实例1
---

KsContainerHeader示例   

``` tsx
import React, { useState, useEffect } from 'react';
import KsContainerHeader from '../index';
import { arrayMoveImmutable } from 'array-move';
import { Utils, Button, Empty } from "@didi/dcloud-design";
import moment from 'moment';
interface Inode {
  unit: string;
  name: string;
  desc: string;
}
interface IcustomScope {
  label: string;
  value: string | number;
}

const metricsDataDefault = [{
  name: "a1",
  type: 1,
  key: "a1", // 对应name
  unit: "unit1",
  desc: "描述1"
}, {
  name: "a2",
  type: 2,
  key: "a2", // 对应name
  unit: "unit2",
  desc: "描述2"
}]

const customScopeList = [
  {
    "alive": true,
    "brokerId": 0,
    "host": "10.255.0.187",
    "port": 0,
    "rack": "string",
    value: 0,  // brokerId | topicName
    label: '10.255.0.187' // host | topicName
  },
  {
    "alive": true,
    "brokerId": 0,
    "host": "10.255.0.187",
    "port": 0,
    "rack": "string",
    value: 1,  // brokerId
    label: '10.255.0.188' // host
  },
  {
    "alive": true,
    "brokerId": 0,
    "host": "10.255.0.187",
    "port": 0,
    "rack": "string",
    value: 2,  // brokerId
    label: '10.255.0.189' // host
  }
]

const Containers = (): JSX.Element => {
  const [isGroup, setIsgroup] = useState(false); 
  const [gridNum, setGridNum] = useState<number>(8);
  const [gutterNum, setGutterNum] = useState<any>([16, 16]);
  const [metricDataList, setMetricDataList] = useState<any[]>([]); // chart列表
  const [metricsList, setMetricsList] = useState<Inode[]>(metricsDataDefault);
  const [selectedMetricNames, setSelectedMetricNames] = useState<string[]>([]);
  const [scopeList, setScopeList] = useState<IcustomScope[]>(customScopeList);
  const [clusterPhyId, setClusterPhyId] = useState<number>(1); /// 集群ID 待修改
  
  useEffect(() => {
    getScopeList();
    getSelectedMrtric();
    getMrtricList();
  }, []);

  const getScopeList = async () => {
    const res: any = await Utils.request(`/api/v3/clusters/${clusterPhyId}/brokers-metadata`); 
    const data = res.bizData || [];
    const list = data.map(item => {
      return {
        label: item.host,
        value: item.brokerId
      }
    })
    list?.length > 0 && setScopeList(list);
  }

  const getMrtricList = async () => {
    const res: any = await Utils.request(`/api/v3/clusters/${clusterPhyId}/types/103/support-kafka-versions`); // 103:broker  100:topic
    const data = res || [];
    data?.length > 0 && setMetricsList(data);
  }

  const getSelectedMrtric = async () => {
    const res: any = await Utils.request(`/api/v3/clusters/${clusterPhyId}/types/103/support-kafka-versions`); // url待修改
    const data = res || [];
    data?.length > 0 && setSelectedMetricNames(data);
  }

  const getMetricData = async (data) => {
    const res: any = await  Utils.post(`/api/v3/cluster/${clusterPhyId}/broker-metrics`, {
      startTime: data.dateStrings[0],
      endTime: data.dateStrings[1],
      metricsNames: data.metricsNames,
      topNu: data?.scopeData?.isTop ? data.scopeData.data : null,
      brokerIds: data?.scopeData?.isTop ? [] : data.scopeData.data
    })
    const metricData = res || []; // 数据处理 待开发
    setMetricDataList(metricData);
  }
   
  const ksHeaderChange = (data) => {
    console.log(data)
    setGridNum(data.gridNum || 8);
    getMetricData(data);
  }

  const dragEnd = ({ oldIndex, newIndex, collection, isKeySorting }, e) => {
    // console.log(oldIndex, newIndex, collection, isKeySorting, e);
    metricDataList = arrayMoveImmutable(metricDataList, oldIndex, newIndex);
    setMetricDataList(JSON.parse(JSON.stringify(metricDataList)));
  }

  return (
      <>
        <KsContainerHeader
          change={ksHeaderChange}
          nodeScopeModule={{
            customScopeList: scopeList
          }}
          indicatorSelectModule={{
            hide: false,
            tableData: metricsList,
            selectedRows: selectedMetricNames
          }}
        />
        {metricDataList?.length > 0 ? 
          <div className="no-group-con">
            <DragGroup
              dragContainerProps={{
                onSortEnd: dragEnd,
                axis: "xy"
              }}
              dragItemProps={{
                // collection: Math.random(),
              }}
              containerProps={{
                grid: gridNum,
                gutter: gutterNum
              }}
            >
              
              {metricDataList.map((item, index) => (
                <div key={index}>
                </div>
              ))}
              
            </DragGroup>
          </div> : 
          <div>
           <Empty
              description="数据为空，请选择指标~"
              image={Empty.PRESENTED_IMAGE_CUSTOM}
            />
          </div>
        }
          
      </>
  )
}

ReactDOM.render(
  <div>
    <Containers />
  </div>,
  mountNode,
);
```

```css
.drag-sort-item {
  /* background: #4482D4; */
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.01), 0 3px 6px 3px rgba(0,0,0,0.01), 0 2px 6px 0 rgba(0,0,0,0.03);
  border-radius: 4px; 
  color: #fff;
}

```
