import { exec } from 'node:child_process'
import { consola } from 'consola'

import { remove } from './fs'

export const resetGit = (path) => {
  process.chdir(path)

  return new Promise((resolve, reject) => {
    remove(`${path}/.git`)

    exec('git init', (err) => {
      if (err) {
        consola.error(`执行错误: ${err}`)
        reject(err)
        return
      }
      resolve(true)
    })
  })
}
