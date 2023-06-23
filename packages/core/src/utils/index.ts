import type { tempalteRecord } from '../store'
import { FrameEnum, ProjectEnum } from '../configData'

export function getCurrentTemplateList(recordInfo: tempalteRecord) {
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

export function compareVersions(v1: string, v2: string): number {
  const regex = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([a-z]+)(\d+)?)?$/

  const getVersionParts = (version: string): number[] => {
    const matches = version.match(regex)
    if (!matches)
      return []
    const [, major, minor = '0', patch = '0', label = '', labelNumber = '0'] = matches
    return [Number(major), Number(minor), Number(patch), ~~label, Number(labelNumber)]
  }

  const version1Parts = getVersionParts(v1)
  const version2Parts = getVersionParts(v2)

  for (let i = 0; i < version1Parts.length; i++) {
    if (version1Parts[i] > version2Parts[i])
      return 1
    else if (version1Parts[i] < version2Parts[i])
      return -1
  }

  return 0
}
