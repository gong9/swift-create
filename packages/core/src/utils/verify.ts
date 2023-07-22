import { isExists } from './fs'

const needCheck = ['package.json', 'cli.config.json', 'plugin.config.json']

export const preCheck = async () => {
  for (const path of needCheck) {
    if (!await isExists(path)) {
      console.error(`The file ${path} is not exists, please check it first`)
      process.exit()
    }
  }

  return true
}

/**
 * preCheckHooks
 * todo: add hooks form user
 * @returns
 */
export const preCheckHooks = async () => {
  return async () => {
    const flagsPromise = Promise.all([
      preCheck(),
    ])
    const flags = (await flagsPromise).every(Boolean)

    return flags
  }
}
