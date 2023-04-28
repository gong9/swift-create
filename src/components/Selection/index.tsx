import type { FC } from 'react'
import React, { useState } from 'react'
import { stepConfig } from '../../configData'
import useStore from '../../store/index'
import TemplateSelection from './TemplateSelection'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { consola } = require('consola')

interface SelectionProps {

}

const Selection: FC<SelectionProps> = () => {
  const tempalteRecord = useStore(state => state.tempalteRecord)
  const [index, updateIndex] = useState(0)
  const [finalConfirmStatus, setFinalConfirmStatus] = useState(false)

  const downloadTempalte = () => {
    console.log('download tempalte')
  }

  const nextAction = async () => {
    if (index < stepConfig.length - 1) {
      updateIndex(index => index + 1)
    }

    else {
      setFinalConfirmStatus(true)
      const isConfirm = await consola.prompt(`您的选择是 框架：${tempalteRecord.frame}，项目类型：${tempalteRecord.projectType}， 仓库管理模式${tempalteRecord.isMonorepo ? 'monorepo' : 'basics'}`, {
        type: 'confirm',
      })

      if (isConfirm) {
        downloadTempalte()
      }

      else {
        setFinalConfirmStatus(false)
        updateIndex(0)
      }
    }
  }

  const renderCurrentStep = () => {
    const currentStepConfig = stepConfig[index]

    if (!finalConfirmStatus)
      return <TemplateSelection config={currentStepConfig!} nextAction={nextAction}/>
    else
      return null
  }

  return (
    <>
      {renderCurrentStep()}
    </>
  )
}

export default Selection
