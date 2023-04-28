import { create } from 'zustand'
import { FrameEnum, ProjectEnum } from '../configData'

interface StateType {
  tempalteRecord: {
    projectType: ProjectEnum.Business
    isMonorepo: boolean
    frame: FrameEnum.React
  }
  updataTemplatePath: (newData: StateType['tempalteRecord']) => void
}

const useStore = create<StateType>((set) => {
  return {
    tempalteRecord: {
      projectType: ProjectEnum.Business,
      isMonorepo: true,
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
