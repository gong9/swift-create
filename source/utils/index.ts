import cac from 'cac'

const cli = cac()

export const isHasParams = () => {
  const parsed = cli.parse()

  if (parsed.args.length === 0 && Object.keys(parsed.options).length === 1 && ('--' in parsed.options && parsed.options['--'].length === 0))
    return false

  return true
}
