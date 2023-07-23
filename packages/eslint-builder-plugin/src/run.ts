import { exec } from 'node:child_process'
import * as nodePath from 'node:path'
import { consola } from 'consola'

import { createConfigFile, editPackageFile, isExists, remove, vscodeConfigPath } from './utils'

/**
 * todo： 后续需要增加错误回退功能
 * @param path
 */
const initEslintBuilder = async (path: string) => {
  // cd targetPath

  process.chdir(path)
  consola.info('当前工作路径', process.cwd())

  // add eslint dependencies
  exec('pnpm add -D eslint @antfu/eslint-config', (error, stdout, stderr) => {
    if (error) {
      consola.error(`exec error: ${error}`)
      return
    }
    consola.info(stdout)
    stderr && consola.info(stderr)
  })

  // delete old .eslintrc
  if (await isExists(nodePath.resolve(path, '.eslintrc.json')))
    await remove(nodePath.resolve(path, '.eslintrc.json'))

  else if (await isExists(nodePath.resolve(path, '.eslintrc')))
    await remove(nodePath.resolve(path, '.eslintrc'))

  // create new .eslintrc
  createConfigFile({
    extends: [
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      '@antfu',
    ],
    rules: {
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
      'unused-imports/no-unused-imports': 'off',
      'antfu/top-level-function': 'off',
    },
  })

  // add eslint script
  editPackageFile(path)

  // add vscode eslint config

  createConfigFile({
    'prettier.enable': false,
    'editor.formatOnSave': false,
    'editor.codeActionsOnSave': {
      'source.fixAll.eslint': true,
    },
  }
  , vscodeConfigPath)

  consola.success('eslint-builder-plugin 初始化完成')
}

export default initEslintBuilder
