import { getAppointRepoName } from './server'
import downloadGitRepo from './server/downLoadGitRepo'

const plugin = {

  service: {
    request: (user: string) => {
      return getAppointRepoName(user)
    },

    download: (user: string) => {
      return downloadGitRepo(user)
    },
  },
}

export default plugin
