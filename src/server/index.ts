import axios from 'axios'

interface RepoType {
  id: number
  name: string
  private: boolean
  [k: string]: unknown
}

const getAllRepoList = async () => {
  const {
    data,
  } = await axios.get('https://api.github.com/orgs/gong-cli/repos')

  return data as RepoType[]
}

const getAllRepoNameList = async () => {
  const allRepolist = await getAllRepoList()

  return allRepolist.map(item => item.name)
}

const getAppointRepoName = async (match: [string, string, string]) => {
  const allRepoListName = await getAllRepoNameList()

  return allRepoListName.filter(
    (item) => {
      const curNameLowerCase = item.toLocaleLowerCase()
      return curNameLowerCase.includes(match[0]) && curNameLowerCase.includes(match[1]) && curNameLowerCase.includes(match[2])
    },
  )
}

export {
  getAllRepoList,
  getAllRepoNameList,
  getAppointRepoName,
}
