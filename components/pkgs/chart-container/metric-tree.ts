export default [
  {
    "code": 3,
    "metricName": "System",
    "metricDesc": "系统级",
    "children": [
      {
        "code": 7,
        "metricName": "SystemBasic",
        "metricDesc": "基础指标集",
        "children": [
          {
            "code": 1,
            "metricName": "system_startup_time",
            "metricDesc": "系统启动时间",
            "children": null,
            "checked": false
          }
        ],
        "checked": null
      },
      {
        "code": 8,
        "metricName": "SystemOS",
        "metricDesc": "操作系统相关指标",
        "children": null,
        "checked": null
      },
      {
        "code": 9,
        "metricName": "SystemProcess",
        "metricDesc": "进程相关指标",
        "children": null,
        "checked": null
      },
      {
        "code": 10,
        "metricName": "SystemCPU",
        "metricDesc": "CPU相关指标",
        "children": [
          {
            "code": 2,
            "metricName": "system_cpu_util",
            "metricDesc": "系统总体CPU使用率(单位：%)，使用率采用全核方式计数，如系统使用一颗核，则返回100，如使用两颗核，则返回200",
            "children": null,
            "checked": true
          }
        ],
        "checked": null
      },
      {
        "code": 11,
        "metricName": "SystemMemory",
        "metricDesc": "Memory相关指标",
        "children": [
          {
            "code": 3,
            "metricName": "system_memory_free",
            "metricDesc": "系统空闲内存大小（单位：byte），当前值",
            "children": null,
            "checked": false
          }
        ],
        "checked": null
      },
      {
        "code": 12,
        "metricName": "SystemDisk",
        "metricDesc": "Disk相关指标",
        "children": [
          {
            "code": 4,
            "metricName": "systemDiskBytesFree",
            "metricDesc": "磁盘余量大小（单位：MB）",
            "children": null,
            "checked": false
          }
        ],
        "checked": null
      },
      {
        "code": 13,
        "metricName": "SystemDiskIO",
        "metricDesc": "DiskIO相关指标",
        "children": [
          {
            "code": 5,
            "metricName": "io_util",
            "metricDesc": "各磁盘I/O请求的时间百分比",
            "children": null,
            "checked": false
          }
        ],
        "checked": null
      },
      {
        "code": 14,
        "metricName": "SystemFileHandles",
        "metricDesc": "文件句柄相关指标",
        "children": null,
        "checked": null
      },
      {
        "code": 15,
        "metricName": "SystemNetCard",
        "metricDesc": "网卡相关指标",
        "children": [
          {
            "code": 6,
            "metricName": "send_bytes/s",
            "metricDesc": "各网卡每秒上行流量（单位：byte）",
            "children": null,
            "checked": false
          },
          {
            "code": 7,
            "metricName": "bandWidth",
            "metricDesc": "各网卡最大带宽（单位：byte）",
            "children": null,
            "checked": false
          }
        ],
        "checked": null
      },
      {
        "code": 16,
        "metricName": "SystemNetWork",
        "metricDesc": "网络相关指标",
        "children": null,
        "checked": null
      }
    ],
    "checked": null
  },
  {
    "code": 4,
    "metricName": "Process",
    "metricDesc": "进程级",
    "children": [
      {
        "code": 17,
        "metricName": "ProcessBasic",
        "metricDesc": "基础指标集",
        "children": [
          {
            "code": 8,
            "metricName": "process_startup_time",
            "metricDesc": "当前进程启动时间",
            "children": null,
            "checked": false
          }
        ],
        "checked": null
      },
      {
        "code": 18,
        "metricName": "ProcessCPU",
        "metricDesc": "CPU相关指标",
        "children": [
          {
            "code": 9,
            "metricName": "process_cpu_util",
            "metricDesc": "当前进程cpu使用率(单位：%) 使用率采用全核方式计数，如进程使用一颗核，则返回100，如进程使用两颗核，则返回200",
            "children": null,
            "checked": true
          }
        ],
        "checked": null
      },
      {
        "code": 19,
        "metricName": "ProcessMemory",
        "metricDesc": "Memory相关指标",
        "children": [
          {
            "code": 10,
            "metricName": "process_memory_used",
            "metricDesc": "当前进程内存使用量（单位：byte）当前值",
            "children": null,
            "checked": true
          }
        ],
        "checked": null
      },
      {
        "code": 20,
        "metricName": "ProcessDiskIO",
        "metricDesc": "DiskIO相关指标",
        "children": null,
        "checked": null
      },
      {
        "code": 21,
        "metricName": "ProcessGC",
        "metricDesc": "GC相关指标",
        "children": null,
        "checked": null
      },
      {
        "code": 22,
        "metricName": "ProcessThread",
        "metricDesc": "Thread相关指标",
        "children": null,
        "checked": null
      },
      {
        "code": 23,
        "metricName": "ProcessFD",
        "metricDesc": "FD相关指标",
        "children": null,
        "checked": null
      },
      {
        "code": 24,
        "metricName": "ProcessNetWork",
        "metricDesc": "NetWork相关指标",
        "children": null,
        "checked": null
      }
    ],
    "checked": null
  },
  {
    "code": 5,
    "metricName": "AgentBusiness",
    "metricDesc": "Agent业务级",
    "children": [
      {
        "code": 11,
        "metricName": "agent_version",
        "metricDesc": "agent版本号",
        "children": null,
        "checked": false
      },
      {
        "code": 12,
        "metricName": "write_count",
        "metricDesc": "采样周期内出口采集条数 单位：条",
        "children": null,
        "checked": true
      }
    ],
    "checked": null
  }
]