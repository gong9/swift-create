import initVitePressBuilder from './run'

const plugin = {
  builder: {
    name: 'vitepress-builder-plugin',
    describe: '快速vitePress初始化',
    run: (path: string) => {
      initVitePressBuilder(path)
    },
  },
}

export default plugin
