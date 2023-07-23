import initEslintBuilder from './run'

const plugin = {
  builder: {
    name: 'eslint-builder-plugin',
    describe: '快速eslint配置',
    run: (path: string) => {
      initEslintBuilder(path)
    },
  },
}

export default plugin
