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
            "checked": false,
            "isLeafNode": true
          },
          {
            "code": 2,
            "metricName": "system_ntp_offset",
            "metricDesc": "源时钟与本地时钟的时间差 单位：毫秒",
            "children": null,
            "checked": true,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 8,
        "metricName": "SystemOS",
        "metricDesc": "操作系统相关指标",
        "children": null,
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 9,
        "metricName": "SystemProcess",
        "metricDesc": "进程相关指标",
        "children": null,
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 10,
        "metricName": "SystemCPU",
        "metricDesc": "CPU相关指标",
        "children": [
          {
            "code": 3,
            "metricName": "system_cpu_util",
            "metricDesc": "系统总体CPU使用率(单位：%)，使用率采用全核方式计数，如系统使用一颗核，则返回100，如使用两颗核，则返回200",
            "children": null,
            "checked": true,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 11,
        "metricName": "SystemMemory",
        "metricDesc": "Memory相关指标",
        "children": [
          {
            "code": 4,
            "metricName": "system_memory_free",
            "metricDesc": "系统空闲内存大小（单位：byte），当前值",
            "children": null,
            "checked": false,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 12,
        "metricName": "SystemDisk",
        "metricDesc": "Disk相关指标",
        "children": [
          {
            "code": 5,
            "metricName": "system_disk_bytes_free",
            "metricDesc": "磁盘余量大小（单位：MB）",
            "children": null,
            "checked": false,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 13,
        "metricName": "SystemDiskIO",
        "metricDesc": "DiskIO相关指标",
        "children": [
          {
            "code": 6,
            "metricName": "io_util",
            "metricDesc": "各磁盘I/O请求的时间百分比",
            "children": null,
            "checked": false,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 14,
        "metricName": "SystemFileHandles",
        "metricDesc": "文件句柄相关指标",
        "children": null,
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 15,
        "metricName": "SystemNetCard",
        "metricDesc": "网卡相关指标",
        "children": [
          {
            "code": 7,
            "metricName": "send_bytes/s",
            "metricDesc": "各网卡每秒上行流量（单位：byte）",
            "children": null,
            "checked": false,
            "isLeafNode": true
          },
          {
            "code": 8,
            "metricName": "band_width",
            "metricDesc": "各网卡最大带宽（单位：byte）",
            "children": null,
            "checked": false,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 16,
        "metricName": "SystemNetWork",
        "metricDesc": "网络相关指标",
        "children": [
          {
            "code": 9,
            "metricName": "system_network_send_and_receive_bytes_ps",
            "metricDesc": "系统网络每秒总流量（单位：byte）",
            "children": null,
            "checked": false,
            "isLeafNode": true
          },
          {
            "code": 10,
            "metricName": "system_net_work_band_width_used_percent",
            "metricDesc": "系统网络带宽使用率（单位：%)",
            "children": null,
            "checked": false,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      }
    ],
    "checked": null,
    "isLeafNode": false
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
            "code": 11,
            "metricName": "process_startup_time",
            "metricDesc": "当前进程启动时间",
            "children": null,
            "checked": false,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 18,
        "metricName": "ProcessCPU",
        "metricDesc": "CPU相关指标",
        "children": [
          {
            "code": 12,
            "metricName": "process_cpu_util",
            "metricDesc": "当前进程cpu使用率(单位：%) 使用率采用全核方式计数，如进程使用一颗核，则返回100，如进程使用两颗核，则返回200",
            "children": null,
            "checked": true,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 19,
        "metricName": "ProcessMemory",
        "metricDesc": "Memory相关指标",
        "children": [
          {
            "code": 13,
            "metricName": "process_memory_used",
            "metricDesc": "当前进程内存使用量（单位：byte）当前值",
            "children": null,
            "checked": true,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 20,
        "metricName": "ProcessDiskIO",
        "metricDesc": "DiskIO相关指标",
        "children": null,
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 21,
        "metricName": "ProcessGC",
        "metricDesc": "GC相关指标",
        "children": [
          {
            "code": 16,
            "metricName": "process_jvm_full_gc_count",
            "metricDesc": "采样周期内 full gc 次数",
            "children": null,
            "checked": false,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 22,
        "metricName": "ProcessThread",
        "metricDesc": "Thread相关指标",
        "children": null,
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 23,
        "metricName": "ProcessFD",
        "metricDesc": "FD相关指标",
        "children": [
          {
            "code": 17,
            "metricName": "process_open_fd_count",
            "metricDesc": "当前进程打开fd数量",
            "children": null,
            "checked": true,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      },
      {
        "code": 24,
        "metricName": "ProcessNetWork",
        "metricDesc": "NetWork相关指标",
        "children": [
          {
            "code": 14,
            "metricName": "process_network_send_bytes_ps",
            "metricDesc": "当前进程网络每秒上行流量",
            "children": null,
            "checked": false,
            "isLeafNode": true
          },
          {
            "code": 15,
            "metricName": "process_network_receive_bytes_ps",
            "metricDesc": "当前进程网络每秒下行流量",
            "children": null,
            "checked": false,
            "isLeafNode": true
          }
        ],
        "checked": null,
        "isLeafNode": false
      }
    ],
    "checked": null,
    "isLeafNode": false
  },
  {
    "code": 5,
    "metricName": "AgentBusiness",
    "metricDesc": "Agent业务级",
    "children": [
      {
        "code": 18,
        "metricName": "agent_version",
        "metricDesc": "agent版本号",
        "children": null,
        "checked": false,
        "isLeafNode": true
      },
      {
        "code": 19,
        "metricName": "write_count",
        "metricDesc": "采样周期内出口采集条数 单位：条",
        "children": null,
        "checked": true,
        "isLeafNode": true
      },
      {
        "code": 20,
        "metricName": "write_bytes",
        "metricDesc": "采样周期内出口采集流量 单位：bytes",
        "children": null,
        "checked": true,
        "isLeafNode": true
      },
      {
        "code": 21,
        "metricName": "running_collect_task_num",
        "metricDesc": "运行状态采集任务数",
        "children": null,
        "checked": true,
        "isLeafNode": true
      },
      {
        "code": 22,
        "metricName": "running_collect_path_num",
        "metricDesc": "运行状态采集路径数",
        "children": null,
        "checked": true,
        "isLeafNode": true
      }
    ],
    "checked": null,
    "isLeafNode": false
  }
]