import { Checkbox, Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import Modal from '../../basic/modal/Modal';


export default (props) => {
  const { columns, setFilterColumns, visible, setVisible, tableId } = props;
  const [checkBoxOption, setCheckBoxOption] = useState([]);
  const [checked, setChecked] = useState([]);

  const setCheckBoxColumnsOption = () => {
    if (!Array.isArray(columns)) return;
    if (columns.length < 1) return;
    const checkedCol = JSON.parse(localStorage.getItem(tableId));

    const newcheckBoxOption = columns.map(item => {
      return {
        ...item,
        label: item.title,
        value: item.key || item.dataIndex,
      };
    });

    const newChecked = newcheckBoxOption.filter(item => !item.invisible).map(item => {
      return item.value;
    });

    setCheckBoxOption(newcheckBoxOption);
    if (checkedCol) {
      setChecked(checkedCol);
      return;
    }
    setChecked(newChecked);
  };

  const checkBoxChange = (e) => {
    setChecked(e)
  }

  const onOk = () => {
    const newColumns = columns.map(item => {
      return {
        ...item,
        invisible: !checked.includes(item.dataIndex)
      }
    });
    console.log(newColumns, 'newColumns')
    localStorage.setItem(tableId, JSON.stringify(checked))
    setFilterColumns(newColumns);
    setVisible(false);
  }

  useEffect(() => {
    setCheckBoxColumnsOption()
  }, [props]);

  return (
    <Modal
      title='自定义列'
      visible={visible}
      onOk={onOk}
      onCancel={() => setVisible(false)}
    >
      <Checkbox.Group options={checkBoxOption} defaultValue={checked} onChange={checkBoxChange} />
      {/* <Row>
        {checkBoxOption && checkBoxOption.map((item, index) => {
          return <Col span={24} key={index}>
            <Checkbox onChange={checkBoxChange} checked={item.invisible} value={item.value}>{item.label}</Checkbox>
          </Col>
        })}
      </Row> */}
    </Modal>
  )
}