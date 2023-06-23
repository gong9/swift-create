import axios from 'axios'

interface RepoType {
  id: number
  name: string
  private: boolean
  [k: string]: unknown
}
// https://gitee.com/api/v5/${user}/gong9/repos
export async function getAllRepoList(user: string) {
  const {
    data,
  } = await axios.get(`https://api.github.com/orgs/${user}/repos`)

  return data as RepoType[]
}

export async function getAllRepoNameList(user: string) {
  const allRepolist = await getAllRepoList(user)

  return allRepolist.map(item => item.name)
}

export function getAppointRepoName(user: string) {
  return async (match: [string, string, string]) => {
    const allRepoListName = await getAllRepoNameList(user)

    return allRepoListName.filter(
      (item) => {
        const curNameLowerCase = item.toLocaleLowerCase()
        return curNameLowerCase.includes(match[0]) && curNameLowerCase.includes(match[1]) && curNameLowerCase.includes(match[2])
      },
    )
  }
}
