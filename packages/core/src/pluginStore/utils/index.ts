import { exec, execSync } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import { consola } from 'consola'

import type { PluginConfig } from '../../utils/recordOperations'
import recordPluginConfig from '../../utils/recordOperations'

function getPackagePath(): string | null {
  try {
    const output = execSync('npm root -g')

    return output.toString()
  }
  catch (error) {
    consola.error(error)

    return null
  }
}

function changeDirectoryWithPermission(directory, mode = 'dev') {
  if (os.type() === 'Darwin') {
    // macOS

    if (mode === 'development')
      process.chdir(path.resolve(__dirname, '../../../'))
    else
      process.chdir(directory.trim())

    consola.info('进入引擎工作空间', process.cwd())
  }
  else if (os.type() === 'Windows_NT') {
    // Windows
    process.chdir(directory.trim())
    consola.info('进入引擎工作空间', process.cwd())
  }
  else {
    consola.error('Unsupported operating system.')
    process.exit(1)
  }
}

export function install(pluginName: string, goBack: () => void, pluginData: PluginConfig) {
  const currentPath = getPackagePath()

  if (currentPath) {
    changeDirectoryWithPermission(currentPath, process.env.NODE_ENV)
    consola.info('正在下载插件...')

    exec(`pnpm add ${pluginName}`, (error, stdout, stderr) => {
      if (error) {
        consola.error(`exec error: ${error}`)
        return
      }

      consola.info(stdout)
      stderr && consola.info(stderr)

      recordPluginConfig.addRecordPluginConfig(pluginName, pluginData)
      consola.success(`插件${pluginName}下载成功`)
      consola.success(`插件${pluginName}已添加到引擎工作空间`)
      consola.info('正在退出引擎工作空间,请稍等...')

      setTimeout(() => {
        goBack()
      }, 3000)
    })
  }
}
