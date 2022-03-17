import React, { useState, useEffect } from "react";
import { Radio, Input, Popover, Space, Checkbox, Row, Col, Button } from '../../index';
import { IconFont } from '../icon-project';
import { IcustomScope } from './index';
import './style/node-scope.less';


interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  change: Function;
  customList: IcustomScope[];
}

const OptionsDefault = [
  {
    label: 'Top 5',
    value: 5
  },
  {
    label: 'Top 10',
    value: 10
  },
  {
    label: 'Top 15',
    value: 15
  }
]

const NodeScope: React.FC<propsType> = ({ change, customList }) => {
  const [topNum, setTopNum] = useState<number>(5);
  const [isRelative, setIsRelative] = useState(true);
  const [audioOptions, setAudioOptions] = useState(OptionsDefault);
  const [inputValue, setInputValue] = useState<string>(null);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedListTemp, setCheckedListTemp] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [allCheckedList, setAllCheckedList] = useState([]);

  useEffect(() => {
    const all = customList?.map(item => item.value) || [];
    setAllCheckedList(all);
  }, [customList]);

  useEffect(() => {
    if (topNum) {
      const timeOption = audioOptions.find(item => item.value === topNum);
      change(topNum, true);
      setInputValue(timeOption?.label);
      setCheckedListTemp([]);
      setCheckedList([]);
    }
  }, [topNum]);

  useEffect(() => {
    setIndeterminate(!!checkedListTemp.length && checkedListTemp.length < allCheckedList.length);
    setCheckAll(checkedListTemp?.length === allCheckedList.length);
  }, [checkedListTemp])
  
  const customSure = () => {
    if (checkedListTemp?.length > 0) {
      setCheckedList(checkedListTemp);
      change(checkedListTemp, false);
      setIsRelative(false);
      setTopNum(null);
      setInputValue(`已选${checkedListTemp?.length}项`);
    }
  }

  const customCancel = () => {
    setCheckedListTemp(checkedList);
  }

  const periodtimeChange = (e) => {
    const topNum = e.target.value;
    setTopNum(topNum);
    
    setIsRelative(true);
  }

  const onCheckAllChange = e => {
    setCheckedListTemp(e.target.checked ? allCheckedList : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const checkChange = (val) => {
    setCheckedListTemp(val);
    // setIndeterminate(!!val.length && val.length < allCheckedList.length);
    // setCheckAll(val?.length === allCheckedList.length);
  }
  
  const clickContent = <div className="dd-node-scope-module">
    {/* <span>时间：</span> */}
    <div className="flx_con">
      <div className="flx_l">
        <h6 className="time_title">选择top范围</h6>
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          className="topNum-radio-group"
          // options={audioOptions}
          onChange={periodtimeChange}
          value={topNum}
        >
          <Space direction="vertical" size={16}>
            {audioOptions.map((item, index) => (
              <Radio value={item.value} key={index}>{item.label}</Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
      <div className="flx_r">
        <h6 className="time_title">自定义节点范围</h6>
        <div className="custom-scope">
          <Checkbox
            className="check-all"
            indeterminate={indeterminate} 
            onChange={onCheckAllChange} 
            checked={checkAll}>
            全选
          </Checkbox>
          <div className="fixed-height">
            <Checkbox.Group style={{ width: '100%' }} onChange={checkChange} value={checkedListTemp}>
              <Row gutter={[10, 12]}>
                {customList.map((item, index) => (
                  <Col span={12} key={index}>
                    <Checkbox value={item.value}>{item.label}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
          
          <div className="btn-con">
            <Button 
              type="primary" 
              size="small" 
              className="btn-sure"
              onClick={customSure}>确定</Button>
            <Button size="small" onClick={customCancel}>取消</Button>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
  return (
    <>
    <div id="d-node-scope">
      <Popover trigger={['click']} content={clickContent} placement="bottomRight" overlayClassName="d-node-scope-popover">
        <Input 
          className={isRelative ? 'relativeTime d-node-scope-input' : 'absoluteTime d-node-scope-input'} 
          value={inputValue} 
          readOnly={true}
          bordered={false}
          suffix={<IconFont type="icon-jiantou1" rotate={90} style={{color: "#74788D"}}></IconFont>}/>
      </Popover>
    </div>
      
    </>
  )

};

export default NodeScope;