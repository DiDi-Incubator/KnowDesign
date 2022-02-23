export default [
{
  "code": 3,
  "metricName": "System",
  "metricDesc": "系统级",
  "children": [{
    "code": 7,
    "metricName": "SystemBasic",
    "metricDesc": "基础指标集",
    "children": [{
      "code": 1,
      "metricName": "system_startup_time",
      "metricDesc": "系统启动时间",
      "children": null,
      "checked": false,
      "isLeafNode": true
    }, {
      "code": 2,
      "metricName": "system_ntp_offset",
      "metricDesc": "源时钟与本地时钟的时间差 单位：毫秒",
      "children": null,
      "checked": true,
      "isLeafNode": true
    }],
    "checked": null,
    "isLeafNode": false
  }],
  "checked": null,
  "isLeafNode": false
}, {
  "code": 5,
  "metricName": "AgentBusiness",
  "metricDesc": "Agent业务级",
  "children": [{
    "code": 18,
    "metricName": "agent_version",
    "metricDesc": "agent版本号",
    "children": null,
    "checked": false,
    "isLeafNode": true
  }, {
    "code": 19,
    "metricName": "write_count",
    "metricDesc": "采样周期内出口采集条数 单位：条",
    "children": null,
    "checked": true,
    "isLeafNode": true
  }, {
    "code": 20,
    "metricName": "write_bytes",
    "metricDesc": "采样周期内出口采集流量 单位：bytes",
    "children": null,
    "checked": true,
    "isLeafNode": true
  }, {
    "code": 21,
    "metricName": "running_collect_task_num",
    "metricDesc": "运行状态采集任务数",
    "children": null,
    "checked": true,
    "isLeafNode": true
  }, {
    "code": 22,
    "metricName": "running_collect_path_num",
    "metricDesc": "运行状态采集路径数",
    "children": null,
    "checked": true,
    "isLeafNode": true
  }],
  "checked": null,
  "isLeafNode": false
}]