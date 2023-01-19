export interface ProjectItemType {
  label: string
  value: number
}

export interface CodeManagementItemsType {
  label: string
  value: boolean
}

export interface RepoNameItemsType {
  label: string
  value: string
}

export type FrameItemType = ProjectItemType
export type ConfirmItemsType = ProjectItemType

export interface RecordType {
  projectType: number
  isMonorepo?: boolean
  frame: number
}
