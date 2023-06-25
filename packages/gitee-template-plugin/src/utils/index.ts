import { spawn } from 'node:child_process'
import { consola } from 'consola'

export const gitClone = (url: string, localPath: string, callback: (params?: any) => void, errorCallback?: (params?: any) => void) => {
  const git = spawn('git', ['clone', url, localPath])

  git.on('close', () => {
    consola.success('Git clone successful!')
    callback()
  })
}
