import { pluginRecordOperations } from '../utils/recordOperations'

type RequestType = (user: string) => (match: [string, string, string]) => Promise<string[]>
type DownloadType = (user: string) => (targetProject: string, outPath: string) => Promise<void>

export interface ServiceHookType {
  request: RequestType
  download: DownloadType
}

export interface HooksType {
  service?: ServiceHookType
}

const register = async () => {
  const hooks: HooksType = {}
  const enablePlugins = pluginRecordOperations.queryAllRecordPluginConfigByEnable

  if (enablePlugins.length > 0) {
    for (let index = 0; index < enablePlugins.length; index++) {
      const hook = ((await import(enablePlugins[index].name)).default.default) as HooksType
      if (hook.service)
        hooks.service = hook.service
    }
  }

  return hooks
}

export default register
