import { spawn } from 'node:child_process'
import path from 'node:path'
import { cli } from 'cleye'

import packJson from '../package.json'
import { ConfigMainParamsEnum } from './enum'

export default () => {
  const argv = cli({
    name: 'gong-create',
    version: packJson.version,
    description: 'cli',
    flags: {
      plugins: {
        type: Boolean,
        alias: 'p',
        description: 'open plugin store, only run in development',
      },
      use: {
        type: String,
        alias: 'a',
      },
      location: {
        type: Boolean,
        alias: 'l',
        description: 'open local plugin, only run in development',
      },
      config: {
        type: Boolean,
        alias: 'c',
        description: 'open config page',
      },
    },
  })

  function initAPP() {
    spawn('node', [`${path.resolve(__dirname, 'cli.js')}`], { stdio: 'inherit' })
  }

  function initConfig(params: ConfigMainParamsEnum) {
    spawn('node', [`${path.resolve(__dirname, 'configPage.js')}`, params as string], { stdio: 'inherit' })
  }

  const { plugins, location, config } = argv.flags

  // now plugin feature only run in development
  if ((plugins || location) && process.env.NODE_ENV === 'development') {
    initConfig(
      (plugins && ConfigMainParamsEnum.Store) || (location && ConfigMainParamsEnum.List),
    )
  }
  else if (config) {
    initConfig(ConfigMainParamsEnum.Config)
  }
  else {
    initAPP()
  }
}
