import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useUpdate } from 'ahooks'

import Welcome from './components/Welcome'
import TemplateSelection from './components/Selection'
import useStore from './store'
import { cliRecordOperations } from './utils/recordOperations'
import type { HooksType } from './plugin/register'

interface AppProps {
  hooks: HooksType
}
const App: FC<AppProps> = ({ hooks }) => {
  const { setShowWelcome, showWelcome, setHooks, setStepConfig } = useStore()
  const update = useUpdate()

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false)
      update()
    }, 1500)
  }, [])

  useEffect(() => {
    setHooks(hooks)
    setStepConfig(cliRecordOperations.getConfigData('configData'))
  }, [hooks])

  return (
    <>
      <Welcome show={showWelcome} />
      {!showWelcome && <TemplateSelection />}
    </>
  )
}

export default App
