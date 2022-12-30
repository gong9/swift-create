import path from 'path'
import fs from 'fs-extra'

export const create = async () => {
  try {
    await fs.emptyDir(path.resolve(process.cwd(), './template-react-ts'))
  }
  catch (err) {
    console.error(err)
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
    console.error(err)
  }
}

export const move = async (srcPath: string, path: string) => {
  if (await isExists(path)) {
    console.log('project already exists')
    return
  }

  try {
    await fs.move(srcPath, path)
    console.log('success!')
  }
  catch (err) {
    console.error(err)
  }
}
