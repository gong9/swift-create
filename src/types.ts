import type { FrameEnum, ProjectEnum } from './configData'
export interface ProjectItemType {
  label: string
  value: number
}

export interface CodeManagementItemsType {
  label: string
  value: number
}

export interface RepoNameItemsType {
  label: string
  value: string
}

export type FrameItemType = ProjectItemType
export type ConfirmItemsType = ProjectItemType

export interface RecordType {
  projectType: ProjectEnum
  isMonorepo?: boolean
  frame: FrameEnum
}
