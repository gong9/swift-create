import { readJsonFile } from '../utils/fs'

interface PluginNode {
  name: string
  version: string
  enable: boolean
}
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
  const data = readJsonFile()
  let enablePlugins: PluginNode[] = []

  if (data.plugins)
    enablePlugins = data.plugins.map(plugin => plugin.enable)

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
