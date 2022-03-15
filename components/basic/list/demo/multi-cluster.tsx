import React, { useEffect, useState } from 'react';
import { List, Avatar, Slider, Radio, Skeleton, Progress, Tag, SingleChart, Divider, Input, Select, Checkbox, Button } from '@didi/dcloud-design';
import './multi-cluster.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;


const MultiClusterPage = () => {

    const [initLoading, setInitLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<[]>([]);
    const [list, setList] = useState<[]>([]);

    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const defaultCheckedList = ['Apple', 'Orange'];

    const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);

    const onChange = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    useEffect(() => {
        fetch(fakeDataUrl)
            .then(res => res.json())
            .then(res => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, [])

    const onLoadMore = () => {
        setLoading(true);
        setList(data.concat(
            [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
        ))
        fetch(fakeDataUrl)
            .then(res => res.json())
            .then(res => {
                const dataVal = data.concat(res.results);
                setData(dataVal);
                setList(dataVal);
                setLoading(false);
            });
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                className="multi-cluster-list-load"
            >
                <span>剩下 10 条</span>
                <Button type="text" style={{
                    fontSize: 13,
                    color: "#495057"
                }} onClick={onLoadMore}>点击展开</Button>
            </div>
        ) : null;

    const renderItem = (itemData) => {
        const color = "#556EE6"
        return <List.Item>
            <div className={"multi-cluster-list-item"}>
                <div className="multi-cluster-list-item-healthy">
                    <Progress type="circle" strokeWidth={4} strokeColor={color} percent={70} format={() => <div className="healthy-percent" style={{
                        color
                    }}>{68}</div>} width={70} />
                    <div className="healthy-degree">
                        <span className="healthy-degree-status">通过</span>
                        <span className="healthy-degree-proportion">7/14</span>
                    </div>
                </div>
                <div className="multi-cluster-list-item-right">
                    <div className="multi-cluster-list-item-base">
                        <div className="multi-cluster-list-item-base-left">
                            <h5 className="base-name">
                                ClusterName
                            </h5>
                            <span className="base-version">V2.0.0</span>
                            <span className="base-unbalanced">流量未均衡</span>
                            <span className="base-balanced">存储已均衡</span>
                        </div>
                        <div className="multi-cluster-list-item-base-date">
                            2020-01-04 09:41
                        </div>
                    </div>
                    <div className="multi-cluster-list-item-Indicator">
                        <div className="indicator-left">
                            <div className="indicator-left-item">
                                <p className="indicator-left-item-title"><span className="indicator-left-item-title-dot" style={{
                                    background: "#34C38F"
                                }}></span>Brokers</p>
                                <p className="indicator-left-item-value">24</p>
                            </div>
                            <div className="indicator-left-item">
                                <p className="indicator-left-item-title"><span className="indicator-left-item-title-dot" style={{
                                    background: "#FF7066"
                                }}></span>ZK</p>
                                <p className="indicator-left-item-value">24</p>
                            </div>
                        </div>
                        <div className="indicator-right">
                            <div className="indicator-right-item">
                                <div className="indicator-right-item-total">
                                    <p className="indicator-right-item-total-name">Messages</p>
                                    <p className="indicator-right-item-total-value">
                                        200
                                        <span className="total-value-unit">MB/S</span>
                                    </p>
                                </div>
                                <div className="indicator-right-item-chart">
                                    <SingleChart chartTypeProp="line" propChartData={[1000, 1, 901, 3000, 1290, 6000, 3]} wrapStyle={{
                                        width: 79,
                                        height: 40
                                    }} options={{
                                        xAxis: {
                                            show: false,
                                            type: 'category',
                                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                        },
                                        yAxis: {
                                            type: 'value',
                                            show: false
                                        },
                                    }} />
                                </div>
                            </div>

                            <div className="indicator-right-item">
                                <div className="indicator-right-item-total">
                                    <p className="indicator-right-item-total-name">Messages</p>
                                    <p className="indicator-right-item-total-value">
                                        200
                                        <span className="total-value-unit">MB/S</span>
                                    </p>
                                </div>
                                <div className="indicator-right-item-chart">
                                    <SingleChart chartTypeProp="line" propChartData={[1000, 1, 901, 3000, 1290, 6000, 3]} wrapStyle={{
                                        width: 79,
                                        height: 40
                                    }} options={{
                                        xAxis: {
                                            show: false,
                                            type: 'category',
                                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                        },
                                        yAxis: {
                                            type: 'value',
                                            show: false
                                        },
                                    }} />
                                </div>
                            </div>

                            <div className="indicator-right-item">
                                <div className="indicator-right-item-total">
                                    <p className="indicator-right-item-total-name">Messages</p>
                                    <p className="indicator-right-item-total-value">
                                        200
                                        <span className="total-value-unit">MB/S</span>
                                    </p>
                                </div>
                                <div className="indicator-right-item-chart">
                                    <SingleChart chartTypeProp="line" propChartData={[1000, 1, 901, 3000, 1290, 6000, 3]} wrapStyle={{
                                        width: 79,
                                        height: 40
                                    }} options={{
                                        xAxis: {
                                            show: false,
                                            type: 'category',
                                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                        },
                                        yAxis: {
                                            type: 'value',
                                            show: false
                                        },
                                    }} />
                                </div>
                            </div>

                            <div className="indicator-right-item">
                                <div className="indicator-right-item-total">
                                    <p className="indicator-right-item-total-name">Messages</p>
                                    <p className="indicator-right-item-total-value">
                                        200
                                        <span className="total-value-unit">MB/S</span>
                                    </p>
                                </div>
                                <div className="indicator-right-item-chart">
                                    <SingleChart chartTypeProp="line" propChartData={[1000, 1, 901, 3000, 1290, 6000, 3]} wrapStyle={{
                                        width: 79,
                                        height: 40
                                    }} options={{
                                        xAxis: {
                                            show: false,
                                            type: 'category',
                                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                        },
                                        yAxis: {
                                            type: 'value',
                                            show: false
                                        },
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </List.Item>
    }

    return (
        <div className="multi-cluster-page">
            <div className="multi-cluster-header">
                <div className="cluster-header-card">
                    <h5 className="header-card-title">Clusters总数</h5>
                    <div className="header-card-total">24</div>
                    <div className="header-card-info">
                        <span className="card-info-item">
                            live
                            <span className="info-item-value"><i className="info-item-value-bg"></i>
                                12</span>
                        </span>
                        <span className="card-info-item">
                            down<span className="info-item-value"><i className="info-item-value-bg info-item-value-bg-down"></i>22</span>
                        </span>
                    </div>
                </div>
                <div className="cluster-header-filter">
                    <div className="header-filter-top">
                        <div className="header-filter-top-input">
                            <Input style={{
                                background: "rgba(33,37,41,0.04)"
                            }} bordered={false} />
                        </div>
                        <div className="header-filter-top-divider"></div>
                        <Button className="header-filter-top-button">接入集群</Button>
                    </div>

                    <div className="header-filter-bottom">
                        <div className="header-filter-bottom-item header-filter-bottom-item-checkbox">
                            <h3 className="header-filter-bottom-item-title">版本选择</h3>
                            <div className="header-filter-bottom-item-content">
                                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} style={{
                                    marginRight: 12
                                }}>
                                    全选
                                </Checkbox>
                                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                            </div>
                        </div>
                        <div className="header-filter-bottom-item header-filter-bottom-item-slider">
                            <h3 className="header-filter-bottom-item-title">健康分</h3>
                            <div className="header-filter-bottom-item-content">
                                <Slider
                                    range
                                    step={20}
                                    defaultValue={[0, 100]}
                                    marks={{
                                        0: 0,
                                        20: 20,
                                        40: 40,
                                        60: 60,
                                        80: 80,
                                        100: 100
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="multi-cluster-filter">
                <div className="multi-cluster-filter-select">
                    <Select defaultValue="lucy" style={{ width: 159, marginRight: 12, background: "rgba(33,37,41,0.04)" }}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>

                    <Select defaultValue="lucy" style={{ width: 159, background: "rgba(33,37,41,0.04)" }}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div className="multi-cluster-filter-checkbox">
                <Radio.Group  buttonStyle="outline">
                    <Radio value={1}>Option A</Radio>
                    <Radio value={2}>Option B</Radio>
                    <Radio value={3}>Option C</Radio>
                </Radio.Group>

                <Radio.Group  buttonStyle="solid">
                    <Radio value={1}>Option A</Radio>
                    <Radio value={2}>Option B</Radio>
                    <Radio value={3}>Option C</Radio>
                </Radio.Group>
                    {/* <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} /> */}
                </div>
            </div>
            <List
                bordered={false}
                split={false}
                className="multi-cluster-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={renderItem}
            />
        </div>
    );
}

export default MultiClusterPage;