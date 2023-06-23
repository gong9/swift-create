import type { FC } from 'react'
import React from 'react'
import figlet from 'figlet'
import { Text } from 'ink'

interface WelcomeProps {
  show: boolean
}

const Welcome: FC<WelcomeProps> = ({ show }) => {
  const titile = figlet.textSync('gong cli', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  })

  return show ? <Text>{titile}</Text> : null
}

export default Welcome
