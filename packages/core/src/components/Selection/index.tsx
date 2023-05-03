import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import to from 'await-to-js'
import { Text, useApp } from 'ink'
import SelectInput from 'ink-select-input'
import { isExists, move, remove } from '../../utils/fs'
import { downloadDirectory } from '../../constants'
import { FrameLabel, ProjectLabel, stepConfig } from '../../configData'
import useStore from '../../store/index'
import { getAppointRepoName } from '../../server'
import downloadGitRepo from '../../server/downLoadGitRepo'
import { getCurrentTemplateList } from '../../utils'
import { handleTemplate } from '../../utils/ejs'
import TemplateSelection from './TemplateSelection'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { consola } = require('consola')

const Selection: FC = () => {
  const tempalteRecord = useStore(state => state.tempalteRecord)
  const templateConfig = useStore(state => state.templateConfig)
  const [index, updateIndex] = useState(0)
  const [finalConfirmStatus, setFinalConfirmStatus] = useState(false)
  const [curMatchTemplateList, setCurMatchTemplateList] = useState<string[]>([])
  const [downloadStatus, setDownloadStatus] = useState(false)

  const { exit } = useApp()

  useEffect(() => {
    (async function () {
      if (index > stepConfig.length - 1) {
        setFinalConfirmStatus(true)
        const isConfirm = await consola.prompt(`您的选择是 框架: ${FrameLabel[tempalteRecord.frame]}，项目类型: ${ProjectLabel[tempalteRecord.project]}， 仓库管理模式: ${tempalteRecord.codeManagement ? 'monorepo' : 'basics'}`, {
          type: 'confirm',
        })

        if (isConfirm) {
          const currentRecord = getCurrentTemplateList(tempalteRecord)
          const [err, res] = await to(getAppointRepoName(currentRecord))

          if (err)
            consola.error(err)

          else
            setCurMatchTemplateList(res)
        }

        else {
          setFinalConfirmStatus(false)
          updateIndex(0)
        }
      }
    }())
  }, [tempalteRecord])

  const nextAction = async () => {
    updateIndex(index => index + 1)
  }

  /**
   * 模版下载
   * @param param0
   */
  const selectMatchTemplate = async ({ value }: { label: string; value: string }) => {
    const isExist = await isExists(`${downloadDirectory}/${templateConfig.projectName}`)

    if (isExist) {
      consola.info(`正在删除${downloadDirectory}/${templateConfig.projectName}`)
      await remove(`${downloadDirectory}/${templateConfig.projectName}`)
      consola.info(`${downloadDirectory}/${templateConfig.projectName}删除完成`)
    }

    setDownloadStatus(true)
    consola.info(`正在下载${value}模版`)

    try {
      await downloadGitRepo(`gong-cli/${value}#main`, `${downloadDirectory}/${templateConfig.projectName}`)
      consola.info(`下载${value}模版完成`)
      consola.info(`正在准备移动${value}模版到当前目录`)

      handleTemplate(`${downloadDirectory}/${templateConfig.projectName}`, { data: templateConfig })

      await move(`${downloadDirectory}/${templateConfig.projectName}`, `${process.cwd()}/${templateConfig.projectName}`)
      consola.info(`移动${value}模版到当前目录完成`)
    }
    catch (error) {
      consola.error(error)
    }

    setDownloadStatus(false)
    setCurMatchTemplateList([])

    setTimeout(() => {
      exit()
    }, 50)
  }

  /**
   * 当前step渲染
   * @returns
   */
  const renderCurrentStep = () => {
    const currentStepConfig = stepConfig[index]

    if (!finalConfirmStatus)
      return <TemplateSelection config={currentStepConfig!} nextAction={nextAction} />
    else
      return null
  }

  /**
   * 渲染匹配模版
   * @returns
   */
  const renderCurMatchTemplateList = () => {
    const matchTemplateList = curMatchTemplateList.map(item => ({ label: item, value: item }))
    return (
            <>
                <Text>当前匹配到的模版：</Text>
                <SelectInput items={matchTemplateList} onSelect={selectMatchTemplate} />
            </>
    )
  }

  if (downloadStatus) {
    return <Text>加载中...</Text>
  }

  else {
    return (
        <>
            {renderCurrentStep()}
            {curMatchTemplateList.length > 0 && renderCurMatchTemplateList()}
        </>
    )
  }
}

export default Selection
