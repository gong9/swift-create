import axios from 'axios'
import type { ServiceHookType } from '../plugin/register'
import { cliRecordOperations } from '../utils/recordOperations'

interface RepoType {
  id: number
  name: string
  private: boolean
  [k: string]: unknown
}

export async function getAllRepoList() {
  const {
    data,
  } = await axios.get(`https://api.github.com/orgs/${cliRecordOperations.getConfigData('userPath')}/repos`)

  return data as RepoType[]
}

export async function getAllRepoNameList() {
  const allRepolist = await getAllRepoList()

  return allRepolist.map(item => item.name)
}

export async function getAppointRepoName(match: string[]) {
  const allRepoListName = await getAllRepoNameList()
  const filterMatch = match.filter(item => item)

  return allRepoListName.filter(
    (item) => {
      const curNameLowerCase = item.toLocaleLowerCase()
      return filterMatch.some(currentMatch => curNameLowerCase.includes(currentMatch))
    },
  )
}

/**
 * choose plugin
 * @param serverHook
 * @returns
 */
export function getRepo(serverHook?: ServiceHookType) {
  const isExistServerHook = serverHook && serverHook.request
  if (isExistServerHook)
    return serverHook.request(cliRecordOperations.getConfigData('userPath'))

  else return getAppointRepoName
}
