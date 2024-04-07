import path from 'node:path'
import { spawn } from 'node:child_process'
import { cli } from 'cleye'
import { cliRecordOperations, pluginRecordOperations } from './utils/recordOperations'

interface BaseConfigData {
  name: string
  label: string
  title: string
}

interface SelectConfigData extends BaseConfigData {
  type: 'select'
  items: {
    label: string
    value: string
  }[]
}

interface InputConfigData extends BaseConfigData {
  type: 'input'
}

type ConfigData = SelectConfigData | InputConfigData

type SwiftCoreOptions = {
  name: string
  userPath: string
  version: string
  description?: string
  gitType?: 'gitee' | 'github'
}

interface SwiftConfifg {
  configData: ConfigData[]
}

class SwiftCore {
  argv: ReturnType<typeof cli>

  private userPath: string
  private name: string
  private swiftConfifg: SwiftConfifg

  constructor(opts: SwiftCoreOptions) {
    this.userPath = opts.userPath ?? 'gong9'
    this.name = opts.name ?? 'swift-core'

    this.argv = this.init(opts)
    this.swiftConfifg = this.getDefaultConfig()

    cliRecordOperations.setConfigData('configData', this.swiftConfifg.configData)
  }

  init(opts: SwiftCoreOptions) {
    cliRecordOperations.setConfigData('userPath', this.userPath)
    cliRecordOperations.setConfigData('name', this.name)

    pluginRecordOperations.closePlugin('@gongcli/gitee-template-plugin')
    pluginRecordOperations.closePlugin('@gongcli/github-template-plugin')

    if (opts.gitType === 'github')
      pluginRecordOperations.enablePlugin('@gongcli/github-template-plugin')
    else
      pluginRecordOperations.enablePlugin('@gongcli/gitee-template-plugin')

    return cli({
      name: this.name,
      version: opts.version,
      description: opts.description ?? 'cli',
    })
  }

  setConfig(config: SwiftConfifg) {
    this.swiftConfifg = config
    cliRecordOperations.setConfigData('configData', this.swiftConfifg.configData)
  }

  private getDefaultConfig(): SwiftConfifg {
    return {
      configData: [
        {
          name: 'frame',
          label: '框架类型',
          type: 'select',
          title: '请选择框架',
          items: [
            {
              label: 'React',
              value: 'react',
            },
            {
              label: 'Vue',
              value: 'vue',
            },
            {
              label: 'None',
              value: 'none',
            },
          ],
        },
      ],
    }
  }

  run() {
    spawn('node', [`${path.resolve(__dirname, 'cli.js')}`], { stdio: 'inherit' })
  }
}

export default SwiftCore
