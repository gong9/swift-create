import type { CodeManagementItemsType, ConfirmItemsType, FrameItemType, ProjectItemType } from './types'
import { FrameEnum, ProjectEnum } from './enum'

export const projectItems: ProjectItemType[] = [
  {
    label: 'business 「业务」',
    value: ProjectEnum.Business,
  },
  {
    label: 'lib 「工具库」',
    value: ProjectEnum.Lib,
  },
  {
    label: 'cli 「脚手架」',
    value: ProjectEnum.Cli,
  },
]

export const codeManagementItems: CodeManagementItemsType[] = [
  {
    label: 'basics 「单库项目」',
    value: false,
  },
  {
    label: 'monorepo 「多库管理」',
    value: true,
  },
]

export const frameItem: FrameItemType[] = [
  {
    label: 'React',
    value: FrameEnum.React,
  },
  {
    label: 'Vue',
    value: FrameEnum.Vue,
  },
  {
    label: 'None',
    value: FrameEnum.None,
  },
]

export const itemMap: {
  [k: string]: any
} = {
  0: projectItems,
  1: codeManagementItems,
  2: frameItem,
}

export const titleMap: {
  [k: string]: string
} = {
  0: '请选择所要创建的项目类型',
  1: '请选择仓库管理方式',
  2: '请选择框架',
}

export const confirmItems: ConfirmItemsType[] = [
  {
    label: '确认',
    value: 1,
  },
  {
    label: '取消',
    value: 0,
  },
]
