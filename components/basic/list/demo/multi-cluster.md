---
order: 2
title:
  zh-CN: KS多集群管理
---

## zh-CN

KS多集群管理看板

```jsx
import { List, Avatar, Button, Skeleton, Progress, Tag, SingleChart } from '@didi/dcloud-design';
import './multi-cluster.less';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

class LoadMoreList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        this.setState({
          initLoading: false,
          data: res.results,
          list: res.results,
        });
      });
  }

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
      ),
    });
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const data = this.state.data.concat(res.results);
        this.setState(
          {
            data,
            list: data,
            loading: false,
          },
          () => {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
          },
        );
      });
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
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
      <List
        bordered={false}
        split={false}
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={renderItem}
      />
    );
  }
}

ReactDOM.render(<LoadMoreList />, mountNode);
```

```css
.demo-loadmore-list {
  min-height: 350px;
}

```
