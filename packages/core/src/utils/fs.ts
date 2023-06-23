import path from 'node:path'
import fs from 'fs-extra'
import { consola } from 'consola'

export async function create() {
  try {
    await fs.emptyDir(path.resolve(process.cwd(), './template-react-ts'))
  }
  catch (err) {
    consola.error(err)
  }
}

export async function copy(tempPath: string) {
  await create()
  return fs.copy(tempPath, path.resolve(process.cwd(), './template-react-ts'))
}

export async function isExists(path: string) {
  return await fs.pathExists(path)
}

export async function remove(path: string) {
  try {
    await fs.remove(path)
  }
  catch (err) {
    consola.error(err)
  }
}

export async function move(srcPath: string, path: string) {
  if (await isExists(path)) {
    consola.warn('The file already exists, please delete it first')
    return
  }

  try {
    await fs.move(srcPath, path)
    consola.warn('success!')
  }
  catch (err) {
    consola.error(err)
  }
}

export function readJsonFile() {
  const data = fs.readFileSync(path.resolve(__dirname, '../../plugin.config.json'), 'utf8')

  try {
    return JSON.parse(data)
  }
  catch (error) {
    consola.error(error)
    return {}
  }
}

export function writeJsonFile(data: any) {
  try {
    fs.writeFileSync(path.resolve(__dirname, '../../plugin.config.json'), JSON.stringify({
      ...readJsonFile(),
      plugins: data,
    }, null, 2), 'utf8')
  }
  catch (error) {
    consola.error(error)
  }
}
