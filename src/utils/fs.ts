import path from 'path'
import fs from 'fs-extra'

const create = async () => {
  try {
    await fs.emptyDir(path.resolve(process.cwd(), './template-react-ts'))
  }
  catch (err) {
    console.error(err)
  }
}

const copy = async (tempPath: string) => {
  await create()
  return fs.copy(tempPath, path.resolve(process.cwd(), './template-react-ts'))
}

const isExists = async (path: string) => {
  return await fs.pathExists(path)
}

const remove = async (path: string) => {
  try {
    await fs.remove(path)
  }
  catch (err) {
    console.error(err)
  }
}

export {
  create,
  copy,
  isExists,
  remove,
}
