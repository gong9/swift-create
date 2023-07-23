import * as nodePath from 'node:path'
import fs from 'fs-extra'
import { consola } from 'consola'

import addDependencies from './addDependencies'
import { createConfigFile, editPackageFile, isExists, remove, vscodeConfigPath } from './utils'

/**
 * base version
 * @param path
 * @returns
 */
const initEslintBuilder = async (path: string) => {
  // cd targetPath

  process.chdir(path)
  consola.info('当前工作路径', process.cwd())

  // add eslint dependencies
  const result = await addDependencies()

  if (!result)
    return

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
  editPackageFile()

  // add vscode eslint config
  if (!await isExists(nodePath.resolve(path, '.vscode')))
    fs.mkdirSync(nodePath.resolve(path, '.vscode'))

  createConfigFile({
    'prettier.enable': false,
    'editor.formatOnSave': false,
    'editor.codeActionsOnSave': {
      'source.fixAll.eslint': true,
    },
  }
  , vscodeConfigPath)

  consola.success('eslint init success')
}

export default initEslintBuilder
