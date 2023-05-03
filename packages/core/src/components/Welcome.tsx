import React from 'react'
import figlet from 'figlet'
import { Text } from 'ink'

const Welcome = () => {
  const titile = figlet.textSync('gong cli', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  })

  return <Text>{titile}</Text>
}

export default Welcome
