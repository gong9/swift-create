import type { CodeManagementItemsType, ConfirmItemsType, FrameItemType, ProjectItemType } from './types'

export enum ProjectEnum {
  Business,
  Lib,
  Cli,
}

export enum FrameEnum {
  React,
  Vue,
  None,
}

const projectItems: ProjectItemType[] = [
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

const codeManagementItems: CodeManagementItemsType[] = [
  {
    label: 'basics 「单库项目」',
    value: 0,
  },
  {
    label: 'monorepo 「多库管理」',
    value: 1,
  },
]

const frameItem: FrameItemType[] = [
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

export const stepConfig = [
  {
    name: 'project',
    type: 'select',
    title: '请选择所要创建的项目类型',
    items: projectItems,
  },
  {
    name: 'codeManagement',
    type: 'select',
    title: '请选择仓库管理方式',
    items: codeManagementItems,
  },
  {
    name: 'frame',
    type: 'select',
    title: '请选择框架',
    items: frameItem,
  },
]

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
