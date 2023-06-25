import { promisify } from 'node:util'
import downloadGitRepo from 'download-git-repo'
import to from 'await-to-js'
import { consola } from 'consola'

import { cliRecordOperations } from '../utils/recordOperations'
import type { ServiceHookType } from '../plugin/register'

const download = promisify(downloadGitRepo)

export const localDownload = async (targetProject, outPath) => {
  const [err] = await to(download(`${cliRecordOperations.getConfigData('userPath')}/${targetProject}#main`, outPath))

  if (err)
    consola.error('download error', err)
}

export default async (serverHook: ServiceHookType) => {
  const isExistServerHook = serverHook && serverHook.download
  if (isExistServerHook)
    return await serverHook.download(cliRecordOperations.getConfigData('userPath'))

  else return await localDownload
}
