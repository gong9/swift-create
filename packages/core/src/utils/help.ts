import cac from 'cac'

const cli = cac()

cli.option('--type [type]', 'Choose a project type', {
  default: 'node',
})

cli.option('--name <name>', 'Provide your name')

cli.command('lint [...files]', 'Lint files').action((files, options) => {
  console.log(files, options)
})

cli.help()
cli.version('0.0.0')
cli.parse()
