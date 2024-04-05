import type { tempalteRecord } from '../store'
import type { StepConfigType } from '../types'

export function getConfirmTitle(recordInfo: tempalteRecord, stepConfig: StepConfigType) {
  let title = ''

  Object.keys(recordInfo).forEach((key) => {
    title += `${stepConfig.find(item => item.name === key)!.label}: ${recordInfo[key]} `
  })

  return title
}

export function getCurrentTemplateList(recordInfo: tempalteRecord) {
  return Object.values(recordInfo).filter(item => item !== 'none')
}

/**
 * compare versions
 * @param v1
 * @param v2
 * @returns
 */
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
