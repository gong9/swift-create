import React from 'react'
import figlet from 'figlet'
import { Text } from 'ink'
import { FC } from 'react'

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
