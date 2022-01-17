import React, { useState, useEffect, useRef } from "react";
import { Drawer, Button, Menu } from '../../index';

import { IindicatorSelectModule } from './index';
import IndicatorModule from "./IndicatorModule";
import HashMenu, { IMenuItem } from "../hash-menu";
import './style/indicator-drawer.less';


interface DataNode {
  title?: string;
  key?: string;
  code?: string;
  metricName?: string;
  metricDesc?: string;
  isLeaf?: boolean;
  children?: DataNode[];
}
interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  onSure: (value: any[]) => void;
  visible: boolean;
  isGroup?: boolean; // 是否分组
  indicatorSelectModule: IindicatorSelectModule
}

const menuList = [
  {
    name: "Agent",
    key: '0', // 固定
    url: ''
  },
  {
    name: "日志采集",
    key: '1', // 固定
    url: ''
  }
];


const IndicatorDrawer: React.FC<propsType> = ({
  onClose,
  onSure,
  visible,
  isGroup,
  indicatorSelectModule
}) => {
  const [currentKey, setCurrentKey] = useState(indicatorSelectModule?.menuList?.length > 0 ? indicatorSelectModule?.menuList[0]?.key : null);
  const childRef = {};
  indicatorSelectModule?.menuList.forEach(item => {
    childRef[item.key] = useRef(null);
  })
  const childRef0 = useRef(null); // agent
  const childRef1 = useRef(null); // 日志采集


  useEffect(() => {

  }, []);

  const menuSelect = ({ key }) => {
    console.log(key);
    setCurrentKey(key);
  }


  const sure = () => {
    const resMap = {};
    Object.keys(childRef).forEach(key => {
      resMap[key] = childRef[key].current.getGroups();
    })
    console.log(resMap, resMap[0], 99999999);
    // const res1 = childRef1?.current?.getGroups();
    // const res0 = childRef0?.current?.getGroups();
    let groups = [];
    if (isGroup) {
      // 分组数据格式（agnet或采集任务）
      switch (currentKey) {
        case '0':
          groups = resMap[0];
          break;
        case '1':
          groups = resMap[1];
          break;
      }
    } else {
      // 不分组数据格式
      let lists =[];
      Object.keys(resMap).forEach(key => {
        const lres = resMap[key].reduce((total, current) => {
          total = total.concat(current.lists);
          return total;
        }, []);
        groups = groups.concat(lres);
      })
      
    }
    // groups = Object.keys(resMap).reduce((total, key) => {
    //   total = total.concat(resMap[key]);
    //   return total;
    // }, [])

    console.log(groups, 777777);
    onSure(groups);
  }

  return (
    <>
      <Drawer
        title={indicatorSelectModule.drawerTitle || "指标筛选"}
        width="868px"
        className="dd-indicator-drawer"
        onClose={onClose}
        visible={visible}
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Button
              type="primary"
              style={{ marginRight: '8px', marginLeft: '8px' }}
              onClick={sure}
            >
              确认
            </Button>
            <Button onClick={onClose}>取消</Button>
          </div>
        }
      >
        <Menu selectedKeys={[currentKey]} onSelect={menuSelect} mode="horizontal">
          {menuList?.map(item => (
            <Menu.Item key={item.key}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>

        {
          menuList.map(item => {
            return  <IndicatorModule
                      hide={currentKey != item.key ? true : false}
                      key={item.key}
                      requestUrl={item.url}
                      cRef={childRef[item.key]} />
            switch (item.key) {
              case '0':
                return <IndicatorModule
                  hide={currentKey != '0' ? true : false}
                  key={item.key}
                  requestUrl={item.url}
                  cRef={childRef[item.key]} />
              case '1':
                return <IndicatorModule
                  hide={currentKey != '1' ? true : false}
                  key={item.key}
                  requestUrl={item.url}
                  cRef={childRef1} />
            }
          })
        }

      </Drawer>
    </>
  )

};

export default IndicatorDrawer;