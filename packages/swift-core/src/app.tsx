import type { FC } from 'react'
import React, { useEffect } from 'react'
import TemplateSelection from './components/Selection'
import useStore from './store'
import { cliRecordOperations } from './utils/recordOperations'
import type { HooksType } from './plugin/register'

interface AppProps {
  hooks: HooksType
}

const App: FC<AppProps> = ({ hooks }) => {
  const { setHooks, setStepConfig } = useStore()

  useEffect(() => {
    setHooks(hooks)
    setStepConfig(cliRecordOperations.getConfigData('configData'))
  }, [hooks])

  return (
    <>
      <TemplateSelection />
    </>
  )
}

export default App
