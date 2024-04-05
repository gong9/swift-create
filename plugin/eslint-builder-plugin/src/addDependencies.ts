import { exec } from 'node:child_process'
import { consola } from 'consola'

export default (isPnpm: boolean) => {
  return new Promise((resolve) => {
    exec(`${isPnpm ? 'pnpm' : 'yarn'} add -D eslint @antfu/eslint-config`, (error, stdout, stderr) => {
      if (error) {
        consola.error(`exec error: ${error}`)
        resolve(false)
        return
      }

      if (stderr) {
        consola.info(stderr)
        resolve(false)
        return
      }

      consola.info(stdout)

      resolve(true)
    })
  })
}
