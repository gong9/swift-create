import * as nodePath from 'node:path'
import { consola } from 'consola'

import { addPackageFileDependencies, createConfigFile, editPackageFile, isExists, remove } from './utils'

/**
 * base version
 * @param path
 * @returns
 */
const initDocsBuilder = async (path: string) => {
  // cd targetPath

  process.chdir(path)
  consola.info('当前工作路径', process.cwd())

  const isConfirm = await consola.prompt('开始初始化vitepress, 本操作会重新docs文件是否继续?', {
    type: 'confirm',
  })

  if (!isConfirm)
    process.exit(0)

  consola.info('开始初始化vitepress')

  // add  dependencies
  addPackageFileDependencies()

  // delete old docs
  if (await isExists(nodePath.resolve(path, 'docs')))
    remove(nodePath.resolve(path, 'docs'))

  const isTypescript = await consola.prompt('配置文件生成为js or ts，默认为ts', {
    type: 'confirm',
  })
  // create new docs
  createConfigFile(`
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'demo',
  description: '',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Detailed', link: '/' },
    ],

    sidebar: [
      {
        text: '核心',
        items: [
          { text: 'demo', link: '/demo' }
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: '' },
    ],
  },
})
`,
  `docs/.vitepress/config.${isTypescript ? 'ts' : 'js'}`)

  createConfigFile(`
import { defineConfig } from 'vite'
// import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  //  plugins: [vueJsx()],
})
  `, `docs/vite.config.${isTypescript ? 'ts' : 'js'}`)

  createConfigFile(
`---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "demo"
  text: "demo"
  # tagline: xxx
  actions:
    - theme: alt
      text: 开始使用
      link: /demo

features:
  - title: xxx
    details: xxx
  - title: xxx
    details: xxx
  - title: xxx
    details: xxx
---`, 'docs/index.md')

  createConfigFile(
    ` # demo
    `, 'docs/demo.md')

  // add eslint script
  editPackageFile()

  consola.success('docs init success, 请重新安装依赖')
}

export default initDocsBuilder
