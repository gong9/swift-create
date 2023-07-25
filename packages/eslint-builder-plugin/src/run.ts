import * as nodePath from 'node:path'
import fs from 'fs-extra'
import { consola } from 'consola'

import { addPackageFileDependencies, createConfigFile, editPackageFile, isExists, removeFile, vscodeConfigPath } from './utils'

/**
 * base version
 * @param path
 * @returns
 */
const initEslintBuilder = async (path: string) => {
  // cd targetPath

  process.chdir(path)
  consola.info('当前工作路径', process.cwd())

  const isConfirm = await consola.prompt('react or vue 「默认react，否为vue」?', {
    type: 'confirm',
  })

  consola.info('开始初始化eslint')

  // add eslint dependencies
  addPackageFileDependencies()

  // delete old .eslintrc
  if (await isExists(nodePath.resolve(path, '.eslintrc.json')))
    removeFile(nodePath.resolve(path, '.eslintrc.json'))

  else if (await isExists(nodePath.resolve(path, '.eslintrc')))
    removeFile(nodePath.resolve(path, '.eslintrc'))

  // create new .eslintrc
  if (isConfirm) {
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
  }
  else {
    createConfigFile({
      extends: '@antfu',
      rules: {
        'no-console': 'off',
        'no-unused-vars': 'off',
      },
    })
  }

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

  consola.success('eslint init success, 请重新安装依赖')
}

export default initEslintBuilder
