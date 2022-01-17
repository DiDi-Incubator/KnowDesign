import React, { useState, useEffect } from 'react';
import { Modal, Checkbox, Input, IconFont } from '../../index';
import { Utils } from '../../utils'
import './style/filterTableColumns.less';
export default (props) => {
  const { columns, setFilterColumns, visible = false, setVisible, tableId, title = '自定义列' } = props;
  const [checkBoxOption, setCheckBoxOption] = useState([]);
  const [searchCheckBox, setSearchCheckBox] = useState(null);
  const [checked, setChecked] = useState([]);

  const setCheckBoxColumnsOption = () => {
    if (!Array.isArray(columns)) return;
    if (columns.length < 1) return;
    // const checkedCol = JSON.parse(localStorage.getItem(tableId));
    // 根据表格Id获取本地存储的不展示的数据项
    const checkedCol = tableId ? Utils.getLocalStorage(tableId) : null;
    // 依据columns遍历出新的checkBox的options
    const newcheckBoxOption = columns.map(item => {
      return {
        ...item,
        label: item.title,
        value: item.key || item.dataIndex,
      };
    });

    // 设置新的checkBox的options
    setCheckBoxOption(newcheckBoxOption);
    if (checkedCol?.length > 0) {
      // 根据本地存储的不展示项筛选出需勾选项数组
      const changeChecked = newcheckBoxOption.filter(item => !checkedCol?.includes(item.value)).map(item => {
        return item.value;
      });

      setChecked(changeChecked);
      return;
    }
    // 根据item.invisible获取新的勾选项数组
    const newChecked = newcheckBoxOption.filter(item => !item.invisible).map(item => {
      return item.value;
    });
    setChecked(newChecked);
  };

  const checkBoxChange = (e) => {
    // 每次change都筛选更新勾选项数组
    // const changeChecked = checkBoxOption.filter(item => !e?.includes(item.value)).map(item => {
    //   return item.value;
    // });
    console.log(e, 'checkoutCgange')
    setChecked(e);
  };

  const onOk = () => {
    // 如果localstarage没有存储不展示项，table渲染会用这个新的columns
    const newColumns = columns.map(item => {
      return {
        ...item,
        invisible: !checked.includes(item.dataIndex || item.key)
      }
    });
    // 向localstarage存入数据
    const filterChecked = checkBoxOption.filter(item => !checked?.includes(item.value)).map(item => {
      return item.value;
    });
    console.log(filterChecked, 'filterChecked')
    tableId && Utils.setLocalStorage(tableId, filterChecked);
    // localStorage.setItem(tableId, JSON.stringify(checked))
    // 调用DTable传入设置columns的方法
    setFilterColumns(newColumns);
    // 关闭弹窗
    setVisible(false);
    setSearchCheckBox(null);
  }

  const onCancel = () => {
    const checkedCol = tableId ? Utils.getLocalStorage(tableId) : null;
    if (checkedCol?.length > 0) {
      const changeChecked = checkBoxOption.filter(item => !checkedCol?.includes(item.value)).map(item => {
        return item.value;
      });
      setChecked(changeChecked);
    } else {
      const newChecked = checkBoxOption.filter(item => !item.invisible).map(item => {
        return item.value;
      });
      setChecked(newChecked);
    }
    setSearchCheckBox(null);
    setVisible(false);
  }

  const searchChange = (e) => {
    console.log(e.target.value, 'eeeee');
    console.log(checkBoxOption, 'checkBoxOption');
    const value = e.target.value || '';

    const newCheckBoxOption = checkBoxOption.filter(item => {
      // console.log(item, 'item')
      return item.title.includes(value)
    })
    console.log(newCheckBoxOption, 'newCheckBoxOption')
    setSearchCheckBox(newCheckBoxOption)
    // setCheckBoxOption(newCheckBoxOption)
  }

  useEffect(() => {
    setCheckBoxColumnsOption();
  }, [props.columns, props.visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={340}
      bodyStyle={{
        padding: '0 24px'
      }}
    >
      <div className={'ant-checkbox-table-serch'}>
        <Input onChange={searchChange} prefix={<IconFont type="icon-sousuo" />} />
      </div>
      <Checkbox.Group className={'ant-checkbox-table-columns'} options={searchCheckBox || checkBoxOption} value={checked} onChange={checkBoxChange} />
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