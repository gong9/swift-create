import type { FC } from 'react'
import React, { useRef, useState } from 'react'
import { Text } from 'ink'
import SelectInput from 'ink-select-input'
import { Task } from 'ink-task-list'
import spinners from 'cli-spinners'
import { getAppointRepoName } from './server'
import downloadGitRepo from './server/downLoadGitRepo'
import { FrameMap, ProjectMap } from './map/index'
import { downloadDirectory } from './constants'
import { isExists, move, remove } from './utils/fs'
import type { CodeManagementItemsType, ConfirmItemsType, FrameItemType, ProjectItemType, RecordType, RepoNameItemsType } from './types'
import { ConfirmEnum, FrameEnum, ProjectEnum, StateTask } from './enum'
import { confirmItems, itemMap, titleMap } from './configData'

const App: FC = () => {
  const record = useRef<RecordType>(
    {
      projectType: ProjectEnum.Business,
	    isMonorepo: true,
	    frame: FrameEnum.React,
    },
  )

  const [step, setStep] = useState(0)
  const [confirmRecord, setConfirmRecord] = useState(ConfirmEnum.cancel)
  const [loadWord, setLoadWord] = useState(StateTask.Pending)
  const currentRepoList = useRef<string[]>([])
  const [isDownload, setIsDownload] = useState(StateTask.Pending)

  const handleSelect = (item: ProjectItemType | CodeManagementItemsType | FrameItemType) => {
    switch (step) {
      case 0:
        record.current.projectType = (item as ProjectItemType).value
        break
      case 1:
        record.current.isMonorepo = (item as CodeManagementItemsType).value
        break
      case 2:
        record.current.frame = (item as FrameItemType).value
        break
      default:
        break
    }

    setStep(step + 1)
  }

  const getCurrentTemplateList = (recordInfo: RecordType) => {
    const temp: [string, string, string] = ['react', 'lib', 'monorepo']

    // react or vue
    if (recordInfo.frame === FrameEnum.React)
      temp[0] = 'react'
    else if (recordInfo.frame === FrameEnum.Vue)
      temp[0] = 'vue'
    else
      temp[0] = ''

    // monorepo or basics
    if (recordInfo.isMonorepo)
      temp[2] = 'monorepo'
    else
      temp[2] = ''

    // business or lib
    if (recordInfo.projectType === ProjectEnum.Business)
      temp[1] = ''
    else
      temp[1] = 'lib'

    return temp
  }

  /**
   * handle final confirmation
   * @param item
   */
  const handleConfirm = (item: ConfirmItemsType) => {
    if (item.value === ConfirmEnum.cancel) {
      setStep(0)

      record.current = {
        projectType: ProjectEnum.Business,
        isMonorepo: true,
        frame: FrameEnum.React,
      }
    }
    else {
      const currentRecord = getCurrentTemplateList(record.current)
      setLoadWord(StateTask.Loading)
      setConfirmRecord(ConfirmEnum.confirm)

      getAppointRepoName(currentRecord).then(
        (res) => {
          currentRepoList.current = res
          setLoadWord(StateTask.Success)
        },
        (err) => {
          setLoadWord(StateTask.Error)
          console.error(err)
        },
      )
    }
  }

  /**
   * 模版下载
   * @param item
   */
  const downloadTempalte = async (item: RepoNameItemsType) => {
    const isExist = await isExists(`${downloadDirectory}/${item.value}`)
    setLoadWord(StateTask.Loading)

    if (isExist)
      await remove(`${downloadDirectory}/${item.value}`)

    try {
      await downloadGitRepo(`gong-cli/${item.value}#main`, `${downloadDirectory}/${item.value}`)
      setIsDownload(StateTask.Success)
      setLoadWord(StateTask.Success)

      await move(`${downloadDirectory}/${item.value}`, `${process.cwd()}/${item.value}`)
    }
    catch (error) {
      setLoadWord(StateTask.Error)
      setIsDownload(StateTask.Error)
    }
  }

  /**
   * 加载状态渲染
   * @param loadWord
   * @returns
   */
  const renderStateTask = (loadWord: number) => {
    switch (loadWord) {
      case StateTask.Loading:
        return (
          <Task
            label="Loading"
            state="loading"
            spinner={spinners.dots}
        />
        )
      case StateTask.Error:
        return (
          <Task
            label="Error"
            state="error"
        />
        )
      default:
        return null
    }
  }

  /**
   * render matching Template
   * @returns
   */
  const renderSelectTemplate = () => {
    const currentRepoItems = currentRepoList.current.map(
      item => ({
        label: item,
        value: item,
      }),
    )

    if (!(isDownload === StateTask.Error || isDownload === StateTask.Success) && loadWord !== StateTask.Loading) {
      return (
         <>
           {
              currentRepoItems.length > 0
                ? (
                    <>
                       <Text>当前匹配到的项目模版</Text>
                       <SelectInput items={currentRepoItems as any} onSelect={downloadTempalte} />
                    </>
                  )
                : <Text color="red">暂无匹配模版</Text>
           }
         </>
      )
    }
    else {
      return null
    }
  }

  const render = () => {
    if (step === 3) {
      if (confirmRecord === ConfirmEnum.cancel) {
        return (
          <>
            <Text>您的选择是 框架：{FrameMap[record.current.frame]}，项目类型是：{ProjectMap[record.current.projectType]}， 仓库管理模式是{record.current.isMonorepo ? 'monorepo' : 'basics'}</Text>
            <SelectInput items={confirmItems} onSelect={handleConfirm} />
          </>
        )
      }
      else {
        return renderSelectTemplate()
      }
    }
    else {
      return (
        <>
          <Text>{titleMap[step]}</Text>
          <SelectInput items={itemMap[step]} onSelect={handleSelect} />
        </>
      )
    }
  }

  return (
    <>
      {render()}
      {renderStateTask(loadWord)}
    </>
  )
}

export default App
