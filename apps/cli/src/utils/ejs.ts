import fs from 'node:fs'
import { globSync } from 'glob'
import ejs from 'ejs'
import to from 'await-to-js'
import { consola } from 'consola'

interface EjsRenderData {
  data: {
    projectName: string
  }
}

function writeBack(path: string, fileContent: string) {
  fs.writeFileSync(path, fileContent)
}

/**
 * handle ejs
 * @param tempaltePath
 * @param data
 */
export async function handleTemplate(tempaltePath: string, data: EjsRenderData) {
  consola.info('解析ejs模版')

  const files = globSync(`${tempaltePath}/**`, {
    nodir: true,
  })

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const [err, resFile] = await to(ejs.renderFile(file, data, {}))

    if (err)
      consola.error(err)
    else
      writeBack(file, resFile)
  }

  consola.info('ejs模版渲染完成')
}
