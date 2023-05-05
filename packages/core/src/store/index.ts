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
  showWelcome: boolean
  updataTemplatePath: (newData: StateType['tempalteRecord']) => void
  setTemplateConfig: (newData: StateType['templateConfig']) => void
  setShowWelcome: (newData: StateType['showWelcome']) => void
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
      ()=>{
        return {
          showWelcome: newData,
        }
      }
    )
  }
})
export default useStore
