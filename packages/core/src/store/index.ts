import { create } from 'zustand'

import { FrameEnum, ProjectEnum } from '../configData'
import type { HooksType } from '../plugin/register'

interface TempalteConfigType {
  projectName: string
}
interface StateType {
  tempalteRecord: {
    project: ProjectEnum.Business
    codeManagement: number
    frame: FrameEnum.React
  }
  templateConfig: TempalteConfigType
  showWelcome: boolean
  hooks: HooksType
  updataTemplatePath: (newData: StateType['tempalteRecord']) => void
  setTemplateConfig: (newData: StateType['templateConfig']) => void
  setShowWelcome: (newData: StateType['showWelcome']) => void
  setHooks: (hooks: StateType['hooks']) => void
}

export type tempalteRecord = StateType['tempalteRecord']

const useStore = create<StateType>((set) => {
  return {
    tempalteRecord: {
      project: ProjectEnum.Business,
      codeManagement: 1,
      frame: FrameEnum.React,
    },
    templateConfig: {
      projectName: '',
    },
    showWelcome: true,
    hooks: {},
    updataTemplatePath: (newData: StateType['tempalteRecord']) => set(
      (state) => {
        return {
          tempalteRecord: {
            ...state.tempalteRecord,
            ...newData,
          },
        }
      },
    ),
    setTemplateConfig: (newData: StateType['templateConfig']) => set(
      (state) => {
        return {
          templateConfig: {
            ...state.templateConfig,
            ...newData,
          },
        }
      },
    ),
    setShowWelcome: (newData: StateType['showWelcome']) => set(
      () => {
        return {
          showWelcome: newData,
        }
      },
    ),
    setHooks: (hooks: StateType['hooks']) => set(
      () => {
        return {
          hooks,
        }
      },
    ),
  }
})
export default useStore
