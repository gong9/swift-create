import React, { useState } from 'react'
import type { FC } from 'react'
import { Box, Text } from 'ink'
import TextInput from 'ink-text-input'
import SelectInput from 'ink-select-input'

import { cliRecordOperations } from '../utils/recordOperations'

const ConfigView: FC = () => {
  const [currentConfigItem, setCurrentConfigItem] = useState<null | string>(null)
  const [currentConfigItemValue, setCurrentConfigItemValue] = useState<string>(null)

  const configItems = cliRecordOperations.queryAccessibleKeys.map(item => ({ label: item, value: item }))

  const handleSelectChange = (item: { label: string; value: string }) => {
    setCurrentConfigItem(item.value)
    setCurrentConfigItemValue(cliRecordOperations.getConfigData(item.value))
  }

  const handleInputChange = (value: string, key: string) => {
    cliRecordOperations.setConfigData(key, value)
    setCurrentConfigItemValue(value)
  }

  const closeConfigItemView = () => {
    setCurrentConfigItem(null)
    setCurrentConfigItemValue('')
  }

  const renderConfigItem = (item: string | null) => {
    if (!item) {
      return null
    }

    else {
      return (
        <Box>
          <Box marginRight={1}>
            <Text>{item}:</Text>
          </Box>
          <TextInput placeholder={`请输入${item}`} value={currentConfigItemValue || ''} onChange={(value: string) => handleInputChange(value, item)} onSubmit={closeConfigItemView}/>
        </Box>
      )
    }
  }

  return (
    <Box flexDirection='column'>
      <Text>请选择配置项: </Text>
      <SelectInput items={configItems} onSelect={handleSelectChange} />

      {
        renderConfigItem(currentConfigItem)
      }
    </Box>
  )
}

export default ConfigView
