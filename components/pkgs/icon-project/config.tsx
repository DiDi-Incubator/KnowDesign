export default [
  {
    name: '默认',
    type: 'default',
    icon_type: 'custom-default',
  },
  {
    name: '编辑',
    type: 'edit',
    icon_type: 'custom-bianji',
  },
  {
    name: '删除',
    type: 'delete',
    icon_type: 'custom-shanchu',
  },
  {
    name: '操作记录',
    type: 'czjl',
    icon_type: 'custom-cz-jl',
  },
  {
    name: '设置',
    type: 'install',
    icon_type: 'custom-shezhi',
  },
]

export const IconMap = {
  default: 'custom-cz-jl', // 默认
  install: 'custom-shezhi',  // 设置
  delete: 'custom-shanchu',  // 删除
  edit: 'custom-bianji',  // 编辑
  czjl: 'custom-cz-jl',  // 操作记录 
}