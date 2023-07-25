import path from 'node:path'
import fs from 'fs-extra'
import { consola } from 'consola'

interface EslintConfig {
  extends?: string[] | string
  rules?: Record<string, unknown>
  [k: string]: unknown
}

const eslint = '.eslintrc'
const packagePath = 'package.json'
export const vscodeConfigPath = '.vscode/settings.json'

export async function isExists(path: string) {
  return await fs.pathExists(path)
}

export const removeFile = (path: string) => {
  fs.unlinkSync(path)
}

export async function remove(filePath: string) {
  const files = fs.readdirSync(filePath)
  for (let i = 0; i < files.length; i++) {
    const newPath = path.join(filePath, files[i])
    const stat = fs.statSync(newPath)
    if (stat.isDirectory())
      remove(newPath)
    else
      fs.unlinkSync(newPath)
  }
  fs.rmdirSync(filePath)
}

export const createConfigFile = (config: EslintConfig, filePath = eslint) => {
  try {
    fs.writeFileSync(path.resolve(process.cwd(), filePath), JSON.stringify(config, null, 2))
  }
  catch (error) {
    consola.error(error)
  }
}

export function readJsonFile(path: string) {
  const data = fs.readFileSync(path, 'utf8')

  try {
    return JSON.parse(data)
  }
  catch (error) {
    consola.error(error)
    return {}
  }
}

/**
 * editor package.json
 * add some script
 */
export const editPackageFile = () => {
  try {
    const packageJson = readJsonFile(path.resolve(process.cwd(), packagePath))

    if (!packageJson.scripts)
      packageJson.scripts = {}

    packageJson.scripts = {
      ...packageJson.scripts,
      'lint': 'eslint .',
      'lint:fix': 'eslint . --fix',
    }

    createConfigFile(packageJson, packagePath)

    consola.success('add script success')
  }
  catch (error) {
    consola.error('add script fail')
  }
}

/**
 * editor package.json
 * add devDependencies
 */
export const addPackageFileDependencies = () => {
  try {
    const packageJson = readJsonFile(path.resolve(process.cwd(), packagePath))

    if (!packageJson.scripts)
      packageJson.devDependencies = {}

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      '@antfu/eslint-config': '^0.38.5',
      'eslint': '^8.23.0',
    }

    createConfigFile(packageJson, packagePath)

    consola.success('add script success')
  }
  catch (error) {
    consola.error('add script fail')
  }
}
