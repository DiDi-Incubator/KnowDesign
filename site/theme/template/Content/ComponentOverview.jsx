import React, { useState } from 'react';
import { Row, Col, Card, Typography, Tag, Space } from 'antd';
import { ColorSelect, Collapse, Switch, EmptyLine, Tree, BasicCard } from 'dcloud-design';
import {
  SearchOutlined,
  SettingOutlined,
  EditFilled,
  FormOutlined,
  CarryOutOutlined,
  SmileTwoTone,
  DeleteFilled,
  CaretDownOutlined
 } from '@ant-design/icons';
import './ComponentOverview.less';

const { Title } = Typography;
const { Panel } = Collapse;

const ComponentOverview = ({
  componentsData = [],
  doc: {
    meta: { title },
    content,
  },
  location,
  utils: { toReactComponent },
}) => {


  // keydown.enter goto first component
  const sectionRef = React.createRef();
  const genExtra = () => (
    <SettingOutlined
      onClick={event => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );


  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

  return (
    <section className="markdown" ref={sectionRef}>
      <Row gutter={10}>
        <Col span={6}>
          <Card title="ColorSelect">
            <ColorSelect />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Collapse">
            <Collapse defaultActiveKey={['1']} className="mb10">
              <Panel header="This is panel header 1" key="1">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 2" key="2">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 3" key="3">
                <p>{text}</p>
              </Panel>
            </Collapse>
            <BasicCard
              title="Basic Card"
              value="99.999%"
              icon={<SmileTwoTone />}
              rightHeader={
                <div>
                  <EditFilled style={{cursor: 'pointer'}} />
                  <DeleteFilled style={{ marginLeft: 5, cursor: 'pointer' }} />
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Switch">
            <Switch defaultChecked/>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default ComponentOverview;
