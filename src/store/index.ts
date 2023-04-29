import { create } from 'zustand'
import { FrameEnum, ProjectEnum } from '../configData'

interface StateType {
  tempalteRecord: {
    project: ProjectEnum.Business
    codeManagement: number
    frame: FrameEnum.React
  }
  updataTemplatePath: (newData: StateType['tempalteRecord']) => void
}

export type tempalteRecord = StateType['tempalteRecord']

const useStore = create<StateType>((set) => {
  return {
    tempalteRecord: {
      project: ProjectEnum.Business,
      codeManagement: 1,
      frame: FrameEnum.React,
    },
    updataTemplatePath: (newData: StateType['tempalteRecord']) => set(
      (state) => {
        return {
          ...state,
          tempalteRecord: newData,
        }
      },
    ),
  }
})
export default useStore
