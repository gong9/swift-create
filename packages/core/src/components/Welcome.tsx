import type { FC } from 'react'
import React from 'react'
import figlet from 'figlet'
import { Text } from 'ink'

import { cliRecordOperations } from '../utils/recordOperations'

interface WelcomeProps {
  show: boolean
}

const Welcome: FC<WelcomeProps> = ({ show }) => {
  const titile = figlet.textSync(cliRecordOperations.getConfigData('name'), {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  })

  return show ? <Text>{titile}</Text> : null
}

export default Welcome
