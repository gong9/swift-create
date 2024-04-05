import type { FrameEnum, ProjectEnum } from './configData'

export interface ProjectItemType {
  label: string
  value: number | string
}

export interface CodeManagementItemsType {
  label: string
  value: number | string
}

export interface RepoNameItemsType {
  label: string
  value: string
}

export type FrameItemType = ProjectItemType
export type ConfirmItemsType = ProjectItemType

export interface RecordType {
  project: ProjectEnum
  codeManagement?: boolean
  frame: FrameEnum
}

export type StepConfigType = {
  name: string
  label: string
  type: 'input' | 'select'
  title: string
  items?: {
    label: string
    value: string | number
  }[]
  private?: boolean
}[]
