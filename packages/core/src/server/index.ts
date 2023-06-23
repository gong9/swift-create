import axios from 'axios'
import type { ServiceHookType } from '../plugin/register'

interface RepoType {
  id: number
  name: string
  private: boolean
  [k: string]: unknown
}

export async function getAllRepoList() {
  const {
    data,
  } = await axios.get('https://api.github.com/orgs/gong-cli/repos')

  return data as RepoType[]
}

export async function getAllRepoNameList() {
  const allRepolist = await getAllRepoList()

  return allRepolist.map(item => item.name)
}

export async function getAppointRepoName(match: [string, string, string]) {
  const allRepoListName = await getAllRepoNameList()

  return allRepoListName.filter(
    (item) => {
      const curNameLowerCase = item.toLocaleLowerCase()
      return curNameLowerCase.includes(match[0]) && curNameLowerCase.includes(match[1]) && curNameLowerCase.includes(match[2])
    },
  )
}

/**
 * choose plugin
 * @param serverHook
 * @returns
 */
export function getRepo(serverHook: ServiceHookType) {
  const isExistServerHook = serverHook && serverHook.request
  if (isExistServerHook)
    return serverHook.request('gong-cli')

  else return getAppointRepoName
}
