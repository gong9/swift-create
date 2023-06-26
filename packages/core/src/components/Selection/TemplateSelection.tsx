import type { FC } from 'react'
import React from 'react'
import { Box, Text } from 'ink'
import SelectInput from 'ink-select-input'
import TextInput from 'ink-text-input'
import { useUpdate } from 'ahooks'
import useStore from '../../store/index'
import type { CodeManagementItemsType, ProjectItemType } from '../../types'

interface TemplateSelectionProps {
  config?: {
    name: string
    title: string
    items?: ProjectItemType[] | CodeManagementItemsType[]
    type: string
    placeholder?: string
  }
  nextAction: () => void
}

const TemplateSelection: FC<TemplateSelectionProps> = ({ config, nextAction }) => {
  const { updataTemplatePath, tempalteRecord, templateConfig, setTemplateConfig } = useStore(state => state)
  const update = useUpdate()

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

  const handleInputChange = (value: string) => {
    setTemplateConfig(
      {
        ...templateConfig,
        [config.name]: value,
      },
    )

    update()
  }

  const renderItem = (type: string) => {
    switch (type) {
      case 'select':
        return <SelectInput items={config.items!} onSelect={handleSelectChange} />
      case 'input':
        return (
          <Box>
            <Box marginRight={1}>
              <Text>{config.name}: </Text>
            </Box>
            <TextInput placeholder={config.placeholder || ''} value={templateConfig[config.name] || ''} onChange={handleInputChange} onSubmit={nextAction}/>
          </Box>
        )
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
