import { promisify } from 'util'
import downloadGitRepo from 'download-git-repo'

export default promisify(downloadGitRepo)
