import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useUpdate } from 'ahooks'

import Welcome from './components/Welcome'
import TemplateSelection from './components/Selection'
import useStore from './store'
import type { HooksType } from './plugin/register'

interface AppProps {
  hooks: HooksType
}
const App: FC<AppProps> = ({ hooks }) => {
  const { setShowWelcome, showWelcome, setHooks } = useStore()
  const update = useUpdate()

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false)
      update()
    }, 1500)
  }, [])

  useEffect(() => {
    setHooks(hooks)
  }, [hooks])

  return (
    <>
      <Welcome show={showWelcome} />
      {!showWelcome && <TemplateSelection />}
    </>
  )
}

export default App
