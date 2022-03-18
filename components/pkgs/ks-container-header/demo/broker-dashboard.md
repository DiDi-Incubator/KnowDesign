---
order: 0
title: 基础用法
---

KsContainerHeader示例   

``` tsx
import React, { useState, useEffect } from 'react';
import KsContainerHeader from '../index';
import { arrayMoveImmutable } from 'array-move';
import { Utils, Button } from "@didi/dcloud-design";
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
  const [metricsList, setMetricsList] = useState<Inode[]>(metricsDataDefault);
  const [scopeList, setScopeList] = useState<IcustomScope[]>(customScopeList);
  const [clusterPhyId, setClusterPhyId] = useState<number>(1); /// 集群ID 待修改
  
  useEffect(() => {
    
  }, []);

  const getScopeList = () => {
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

  const getMrtricList = () => {
    const res: any = await Utils.request(`/api/v3/clusters/${clusterId}/types/103/support-kafka-versions`); // 103:broker  100:topic
    const data = res.bizData || [];
  }
   
  const ksHeaderChange = (data) => {
    console.log(data)
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
            tableData: metricsList
          }}>
          
        </KsContainerHeader>           
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
