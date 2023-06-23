import { promisify } from 'node:util'
import downloadGitRepo from 'download-git-repo'
import to from 'await-to-js'
import { consola } from 'consola'

const download = promisify(downloadGitRepo)

export default async (targetProject, outPath) => {
  const [err] = await to(download(`gong-cli/${targetProject}#main`, outPath))

  if (err)
    consola.error('download error', err)
}
