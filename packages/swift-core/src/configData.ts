import type { ConfirmItemsType } from './types'

export enum ProjectEnum {
  Business,
  Lib,
  Cli,
}

export const ProjectLabel = {
  0: '业务',
  1: '库',
  2: '脚手架',
}

export enum FrameEnum {
  React,
  Vue,
  None,
}

export const defaultConfig = [
  {
    name: 'projectName',
    type: 'input',
    title: '请输入要创建的项目名称',
    private: true,
    label: '项目名称',
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
