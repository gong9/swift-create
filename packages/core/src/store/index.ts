import { create } from 'zustand'
import { FrameEnum, ProjectEnum } from '../configData'

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
  updataTemplatePath: (newData: StateType['tempalteRecord']) => void
  setTemplateConfig: (newData: StateType['templateConfig']) => void
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
  }
})
export default useStore
