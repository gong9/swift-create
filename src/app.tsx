import type { FC } from 'react'
import React from 'react'

import Welcome from './components/Welcome'
import TemplateSelection from './components/Selection'

const App: FC = () => {
  return (
    <>
      <Welcome/>

      <TemplateSelection/>
    </>
  )
}

export default App
