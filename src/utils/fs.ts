import path from 'path'
import fs from 'fs-extra'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { consola } = require('consola')

export const create = async () => {
  try {
    await fs.emptyDir(path.resolve(process.cwd(), './template-react-ts'))
  }
  catch (err) {
    consola.error(err)
  }
}

export const copy = async (tempPath: string) => {
  await create()
  return fs.copy(tempPath, path.resolve(process.cwd(), './template-react-ts'))
}

export const isExists = async (path: string) => {
  return await fs.pathExists(path)
}

export const remove = async (path: string) => {
  try {
    await fs.remove(path)
  }
  catch (err) {
    consola.error(err)
  }
}

export const move = async (srcPath: string, path: string) => {
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
