import path from 'node:path'
import fs from 'fs-extra'
import { consola } from 'consola'

const packagePath = 'package.json'

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

// /a/b/c/d/e.txt
const mkdirSync = async (filePath: string) => {
  const arr = filePath.split('/')
  let _path = arr[0]

  if (arr.length === 2) {
    const realPath = path.resolve(process.cwd(), arr[0])
    await fs.ensureDir(realPath)
  }
  else if (arr.length > 2) {
    for (let i = 1; i < arr.length - 1; i++) {
      if (arr[i]) {
        _path += `/${arr[i]}`

        const realPath = path.resolve(process.cwd(), _path)
        await fs.ensureDir(realPath)
      }
    }
  }
}

export const createConfigFile = async (content: string, filePath = 'docs') => {
  const realPath = path.resolve(process.cwd(), filePath)

  if (!await isExists(realPath))
    await mkdirSync(filePath)

  try {
    fs.writeFileSync(realPath, content, 'utf8')
  }
  catch (error) {
    consola.error(content)
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
      'docs:dev': 'vitepress dev docs',
      'docs:build': 'vitepress build docs',
      'docs:preview': 'vitepress preview docs',
    }

    createConfigFile(JSON.stringify(packageJson, null, 2), packagePath)

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
    const dependencies = packageJson.dependencies || {}
    const isNeedVue = Object.keys(dependencies).includes('vue')

    if (!packageJson.scripts)
      packageJson.devDependencies = {}

    const commonDevDependencies = {
      ...packageJson.devDependencies,
      vite: '^4.4.9',
      vitepress: '1.0.0-alpha.30',
    }

    if (isNeedVue) {
      packageJson.devDependencies = commonDevDependencies
    }
    else {
      packageJson.devDependencies = {
        vue: '^3.3.4',
        ...commonDevDependencies,
      }
    }

    createConfigFile(JSON.stringify(packageJson, null, 2), packagePath)

    consola.success('add package success')
  }
  catch (error) {
    consola.error('add package fail')
  }
}
