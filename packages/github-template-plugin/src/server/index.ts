import axios from 'axios'

interface RepoType {
  id: number
  name: string
  private: boolean
  description?: string
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

  return allRepolist.map(item => ({
    name: item.name,
    description: item.description || '',
  }))
}

export function getAppointRepoName(user: string) {
  return async (match: string[]) => {
    const allRepoListName = await getAllRepoNameList(user)

    return allRepoListName.filter(
      (item) => {
        const curNameLowerCase = item.name.toLocaleLowerCase()
        return match.every((item: string) => curNameLowerCase.includes(item))
      },
    )
  }
}
