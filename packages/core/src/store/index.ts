import { create } from 'zustand'

import { FrameEnum, ProjectEnum, defaultConfig } from '../configData'
import type { HooksType } from '../plugin/register'
import type { StepConfigType } from '../types'

interface TempalteConfigType {
  projectName: string
}
export interface StateType {
  tempalteRecord: {
    [k: string]: string | number
  }
  templateConfig: TempalteConfigType
  showWelcome: boolean
  hooks: HooksType
  stepConfig: StepConfigType
  updataTemplatePath: (newData: StateType['tempalteRecord']) => void
  setTemplateConfig: (newData: StateType['templateConfig']) => void
  setShowWelcome: (newData: StateType['showWelcome']) => void
  setHooks: (hooks: StateType['hooks']) => void
  setStepConfig: (stepConfig: StepConfigType) => void
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
    stepConfig: [
      ...defaultConfig,
    ] as StepConfigType,
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
    setStepConfig: (data: StepConfigType) => set(
      (state) => {
        return {
          stepConfig: [
            ...state.stepConfig,
            ...data,
          ],
        }
      },
    ),
  }
})
export default useStore
