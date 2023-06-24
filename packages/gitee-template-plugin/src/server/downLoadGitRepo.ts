import { promisify } from 'node:util'
import downloadGitRepo from 'download-git-repo'
import to from 'await-to-js'
import { consola } from 'consola'

const download = promisify(downloadGitRepo)

export default (user: string) => {
  return async (targetProject, outPath) => {
    const [err] = await to(download('https://gitee.com/gong9/template-monorepo-lib#main', outPath))

    if (err)
      consola.error('download error', err)
  }
}
