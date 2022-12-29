// import path from 'path'
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
// import copy from './utils/fs'

enum ProjectEnum {
  Business,
  Lib,
}

enum FrameEnum {
  React,
  Vue,
}

enum StateTask {
  Pending,
  Loading,
  Success,
  Error,
}

interface ProjectItemType {
  label: string
  value: number
}

interface CodeManagementItemsType {
  label: string
  value: boolean
}

interface RepoNameItemsType {
  label: string
  value: string
}

type FrameItemType = ProjectItemType
type ConfirmItemsType = ProjectItemType

interface RecordType {
  projectType: number
  isMonorepo?: boolean
  frame: number
}

const projectItems: ProjectItemType[] = [
  {
    label: 'business',
    value: ProjectEnum.Business,
  },
  {
    label: 'lib',
    value: ProjectEnum.Lib,
  },
]

const codeManagementItems: CodeManagementItemsType[] = [
  {
    label: 'basics',
    value: false,
  },
  {
    label: 'monorepo',
    value: true,
  },
]

const frameItem: FrameItemType[] = [
  {
    label: 'React',
    value: FrameEnum.React,
  },
  {
    label: 'Vue',
    value: FrameEnum.Vue,
  },
]

const itemMap: {
  [k: string]: any
} = {
  0: projectItems,
  1: codeManagementItems,
  2: frameItem,
}

const titleMap: {
  [k: string]: string
} = {
  0: '请选择所要创建的项目类型',
  1: '请选择仓库管理方式',
  2: '请选择框架',
}

const confirmItems: ConfirmItemsType[] = [
  {
    label: '确认',
    value: 1,
  },
  {
    label: '取消',
    value: 0,
  },
]

const App: FC = () => {
  const record = useRef<RecordType>(
    {
      projectType: ProjectEnum.Business,
	    isMonorepo: true,
	    frame: FrameEnum.React,
    },
  )

  const [step, setStep] = useState(0)
  const [confirmRecord, setConfirmRecord] = useState(0)
  const [loadWord, setLoadWord] = useState(StateTask.Pending)
  const currentRepoList = useRef<string[]>([])

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
    else
      temp[0] = 'vue'

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

  const handleConfirm = (item: ConfirmItemsType) => {
    if (item.value === 0) {
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
      setConfirmRecord(1)

      getAppointRepoName(currentRecord).then(
        (res) => {
          currentRepoList.current = res
          setLoadWord(StateTask.Success)
        },
        (err) => {
          setLoadWord(StateTask.Error)
          console.log(err)
        },
      )
      // copy(path.resolve(__dirname, `../template/${currentPath}`)).then(
      //   () => {
      //     setLoadWord(StateTask.Success)
      //   },
      //   (err) => {
      //     setLoadWord(StateTask.Error)
      //     console.log(err)
      //   })
    }
  }

  const downloadTempalte = async (item: RepoNameItemsType) => {
    setLoadWord(StateTask.Loading)
    try {
      await downloadGitRepo(`gong-cli/${item.value}`, `${downloadDirectory}/${item.value}`)
    }
    catch (error) {
      setLoadWord(StateTask.Error)
    }
    setLoadWord(StateTask.Success)
  }

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

  const renderSelectTemplate = () => {
    const currentRepoItems = currentRepoList.current.map(
      item => ({
        label: item,
        value: item,
      }),
    )

    return (
      <>
       <Text color="green">当前匹配到的项目模版</Text>
       {
        currentRepoItems.length > 0 ? <SelectInput items={currentRepoItems as any} onSelect={downloadTempalte} /> : <Text color="red">暂无匹配模版</Text>
       }
      </>
    )
  }

  const render = () => {
    if (step === 3) {
      if (confirmRecord === 0) {
        return (
          <>
            <Text color="green">您的选择是 框架：{FrameMap[record.current.frame]}，项目类型是：{ProjectMap[record.current.projectType]}， 仓库管理模式是{record.current.isMonorepo ? 'monorepo' : 'basics'}</Text>
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
          <Text color="green">{titleMap[step]}</Text>
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
