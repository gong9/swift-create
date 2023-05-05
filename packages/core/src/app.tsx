import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useUpdate } from 'ahooks'

import Welcome from './components/Welcome'
import TemplateSelection from './components/Selection'
import useStore from './store'

const App: FC = () => {
  const { setShowWelcome, showWelcome } = useStore()
  const update = useUpdate()

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false)
      update()
    }, 1500)
  }, [])

  return (
    <>
      <Welcome show={showWelcome} />
      {!showWelcome && <TemplateSelection />}
    </>
  )
}

export default App
