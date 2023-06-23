import { getAppointRepoName } from './server'
import downloadGitRepo from './server/downLoadGitRepo'

const plugin = {

  service: {
    request: (user) => {
      return getAppointRepoName(user)
    },

    download: (user) => {
      return downloadGitRepo(user)
    },
  },
}

export default plugin
