import fs from 'fs'
import { globSync } from 'glob'
import ejs from 'ejs'
import to from 'await-to-js'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { consola } = require('consola')

interface EjsRenderData {
  data: {
    projectName: string
  }
}

const writeBack = (path: string, fileContent: string) => {
  fs.writeFileSync(path, fileContent)
}

export const handleTemplate = (tempaltePath: string, data: EjsRenderData) => {
  consola.info('解析ejs模版')

  const files = globSync(`${tempaltePath}/**`, {
    nodir: true,
  })

  files.forEach(async (file) => {
    const [err, resFile] = await to(ejs.renderFile(file, data, {}))

    if (err)
      consola.error(err)
    else
      writeBack(file, resFile)
  })

  consola.info('ejs模版渲染完成')
}
