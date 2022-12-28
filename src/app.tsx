import path from 'path'
import type { FC } from 'react'
import React, { useRef, useState } from 'react'
import { Text } from 'ink'
import SelectInput from 'ink-select-input'
import { FrameMap, ProjectMap } from './map/index'
import copy from './utils/fs'

enum ProjectEnum {
  Business,
  Lib,
}

enum FrameEnum {
  React,
  Vue,
}

interface ProjectItemType {
  label: string
  value: number
}

interface CodeManagementItemsType {
  label: string
  value: boolean
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
  const [loadWord, setLoadWord] = useState('正在下载模版...')

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

  const getCurrentTemplatePath=(recordInfo:RecordType)=>{
    if(recordInfo.frame===FrameEnum.React){
      return 'template-react-ts'
    }else if(recordInfo.frame===FrameEnum.Vue){
      return 'template-vue-ts'
    }else{
      return ''
    }
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
      const currentPath = getCurrentTemplatePath(record.current)
      
      setConfirmRecord(1)
      copy(path.resolve(__dirname, `../template/${currentPath}`)).then(
        () => {
          setLoadWord('下载完成')
        },
        (err) => {
          console.log(err)
          setLoadWord('下载失败')
        })
    }
  }

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
      return (
          <Text color="green">{loadWord}</Text>
      )
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

export default App
