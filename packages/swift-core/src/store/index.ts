import { create } from 'zustand'

import { defaultConfig } from '../configData'
import type { HooksType } from '../plugin/register'
import type { StepConfigType } from '../types'

interface TempalteConfigType {
  projectName: string
}

export interface StateType {
  tempalteRecord: {
    [k: string]: string | number
  }
  tempalteRecordShow: { [k: string]: string }
  templateConfig: TempalteConfigType
  showWelcome: boolean
  hooks: HooksType
  stepConfig: StepConfigType
  updataTemplatePath: (newData: StateType['tempalteRecord']) => void
  setTemplateConfig: (newData: StateType['templateConfig']) => void
  setShowWelcome: (newData: StateType['showWelcome']) => void
  setHooks: (hooks: StateType['hooks']) => void
  setStepConfig: (stepConfig: StepConfigType) => void
  setTempalteRecordShow: (tempalteRecordShow: StateType['tempalteRecordShow']) => void
  clearTempalteRecordShow: () => void
}

export type tempalteRecord = StateType['tempalteRecord']

const useStore = create<StateType>((set) => {
  return {
    tempalteRecord: {},
    tempalteRecordShow: {},
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
    setTempalteRecordShow: (newTempalteRecordData: StateType['tempalteRecordShow']) => set(
      (state) => {
        return {
          tempalteRecordShow: {
            ...state.tempalteRecordShow,
            ...newTempalteRecordData,
          },
        }
      },
    ),

    clearTempalteRecordShow: () => set(() => {
      return {
        tempalteRecordShow: {},
      }
    }),
  }
})
export default useStore
