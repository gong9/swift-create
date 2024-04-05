import { gitClone } from '../utils'

export default (user: string) => {
  return async (targetProject, outPath) => {
    return new Promise((resolve, reject) => {
      gitClone(`https://gitee.com/${user}/${targetProject}.git`, outPath, resolve, reject)
    })
  }
}
