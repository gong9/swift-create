import type { tempalteRecord } from '../store'
import { FrameEnum, ProjectEnum } from '../configData'

export const getCurrentTemplateList = (recordInfo: tempalteRecord) => {
  const temp: [string, string, string] = ['react', 'lib', 'monorepo']

  // react or vue
  if (recordInfo.frame === FrameEnum.React)
    temp[0] = 'react'
  else if (recordInfo.frame === FrameEnum.Vue)
    temp[0] = 'vue'
  else
    temp[0] = ''

  // monorepo or basics
  if (recordInfo.codeManagement)
    temp[2] = 'monorepo'
  else
    temp[2] = ''

  // business or lib
  if (recordInfo.project === ProjectEnum.Business)
    temp[1] = ''
  else
    temp[1] = 'lib'

  return temp
}
