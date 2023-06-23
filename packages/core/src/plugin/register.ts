import recordOperations from '../utils/recordOperations'

type RequestType = (user: string) => Promise<string[]>
type DownloadType = (user: string) => Promise<void>

interface ServiceHookType {
  request: RequestType
  download: DownloadType
}

interface HooksType {
  service?: ServiceHookType
}

const register = () => {
  const hooks: HooksType = {}
  const enablePlugins = recordOperations.queryAllRecordPluginConfigByEnable()

  if (enablePlugins.length > 0) {
    enablePlugins.forEach(async (plugin) => {
      const hook = await import(plugin.name) as HooksType
      if (hook.service)
        hooks.service = hook.service
    })
  }

  return hooks
}

export default register
