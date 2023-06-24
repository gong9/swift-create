#!/usr/bin/env node
import { spawn } from 'node:child_process'
import path from 'node:path'
import { cli } from 'cleye'

import packJson from '../package.json'
import { PluginMainParamsEnum } from './enum'

const argv = cli({
  name: 'gong-create',
  version: packJson.version,
  description: 'cli',
  flags: {
    // 打开插件商店
    plugins: {
      type: Boolean,
      alias: 'p',
    },
    // 添加插件
    use: {
      type: String,
      alias: 'a',
    },
    // 列举本地插件
    location: {
      type: Boolean,
      alias: 'l',
    },
  },
})

function initAPP() {
  spawn('node', [`${path.resolve(__dirname, 'cli.js')}`], { stdio: 'inherit' })
}

function openPlgin(params: PluginMainParamsEnum) {
  spawn('node', [`${path.resolve(__dirname, 'pluginStore.js')}`, params as string], { stdio: 'inherit' })
}

const { plugins, location } = argv.flags

// now plugin feature only run in development
if ((plugins || location) && process.env.NODE_ENV === 'development') {
  openPlgin(
    (plugins && PluginMainParamsEnum.Store) || (location && PluginMainParamsEnum.List),
  )
}
else {
  initAPP()
}
