import type { FC } from 'react'
import React from 'react'
import { Text } from 'ink'
import SelectInput from 'ink-select-input'
import useStore from '../../store/index'
import type { CodeManagementItemsType, ProjectItemType } from '../../types'

interface TemplateSelectionProps {
  config?: {
    name: string
    title: string
    items?: ProjectItemType[] | CodeManagementItemsType[]
    type: string
  }
  nextAction: () => void
}

const TemplateSelection: FC<TemplateSelectionProps> = ({ config, nextAction }) => {
  const { updataTemplatePath, tempalteRecord } = useStore(state => state)

  if (!config)
    return null

  const handleSelectChange = (item: ProjectItemType | CodeManagementItemsType) => {
    updataTemplatePath(
      {
        ...tempalteRecord,
        [config.name]: (item as ProjectItemType).value,
      },
    )

    nextAction()
  }

  const renderItem = (type: string) => {
    switch (type) {
      case 'select':
        return <SelectInput items={config.items!} onSelect={handleSelectChange} />

      default:
        return null
    }
  }

  return (
        <>
            <Text>{config.title}</Text>
            {renderItem(config.type)}
        </>
  )
}

export default TemplateSelection
