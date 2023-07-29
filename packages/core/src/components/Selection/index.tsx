import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import to from 'await-to-js'
import { Text, useApp } from 'ink'
import SelectInput from 'ink-select-input'
import { consola } from 'consola'
import { isExists, move, remove } from '../../utils/fs'
import { downloadDirectory } from '../../constants'
import useStore from '../../store/index'
import { getRepo } from '../../server'
import downloadGitRepo from '../../server/downLoadGitRepo'
import { getConfirmTitle, getCurrentTemplateList } from '../../utils'
import { resetGit } from '../../utils/preAction'
import { handleTemplate } from '../../utils/ejs'
import TemplateSelection from './TemplateSelection'

const Selection: FC = () => {
  const tempalteRecord = useStore(state => state.tempalteRecord)
  const templateConfig = useStore(state => state.templateConfig)
  const hooks = useStore(state => state.hooks)
  const stepConfig = useStore(state => state.stepConfig)
  const [index, updateIndex] = useState(0)
  const [finalConfirmStatus, setFinalConfirmStatus] = useState(false)
  const [curMatchTemplateList, setCurMatchTemplateList] = useState<string[]>([])
  const [downloadStatus, setDownloadStatus] = useState(false)
  const selectChangeFlag = useRef(true)

  const { exit } = useApp()

  useEffect(() => {
    (async function () {
      if (index > stepConfig.length - 1) {
        setFinalConfirmStatus(true)
        const isConfirm = await consola.prompt(`您的选择是 ${getConfirmTitle(tempalteRecord, stepConfig)}`, {
          type: 'confirm',
        })

        if (isConfirm) {
          const currentRecord = getCurrentTemplateList(tempalteRecord)
          const [err, res] = await to(getRepo(hooks.service)(['template', ...currentRecord]))

          if (err)
            consola.error(err)

          else if (res.length === 0)
            consola.warn('未匹配到模版，请重新选择')

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
   * check folder is exist
   * @param downloadPath
   */
  const checkFolder = async (downloadPath: string) => {
    const isExist = await isExists(downloadPath)

    if (isExist) {
      const isDelete = await consola.prompt('当前文件夹下存在同名项目，确认替换?', {
        type: 'confirm',
      })

      if (isDelete) {
        consola.info(`正在删除${downloadPath}`)
        await remove(`${downloadPath}`)
        consola.info(`${downloadPath}删除完成`)
        return true
      }

      else {
        process.exit()
      }
    }
  }

  /**
   * download template
   * @param param0
   */
  const selectMatchTemplate = async ({ value }: { label: string; value: string }) => {
    if (selectChangeFlag.current === true) {
      selectChangeFlag.current = false
      const downloadPath = `${process.cwd()}/${templateConfig.projectName}`
      await checkFolder(downloadPath)

      setDownloadStatus(true)
      consola.info(`正在下载${value}模版`)

      try {
        const [err] = await to(((await downloadGitRepo(hooks.service)))(value, downloadPath))
        if (err) {
          consola.error('下载模版失败')
          return
        }
        else {
          consola.success(`下载${value}模版完成`)
        }

        await handleTemplate(`${downloadPath}`, { data: templateConfig })
        consola.success('模版渲染完成')
        await resetGit(`${process.cwd()}/${templateConfig.projectName}`)
      }
      catch (error) {
        consola.error(error)
      }

      setDownloadStatus(false)
      setCurMatchTemplateList([])
      exit()
      selectChangeFlag.current = true
    }
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
