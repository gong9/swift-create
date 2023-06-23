import type { FC } from 'react'
import React, { useState } from 'react'
import { Text } from 'ink'
import SelectInput from 'ink-select-input'

import type { PluginConfig } from '../../utils/recordOperations'
import type { Plugin } from '../api'
import PluginInfo from './PluginInfo'

interface LocalPluginListProps {
  data: PluginConfig[]
}

const LocalPluginList: FC<LocalPluginListProps> = ({ data }) => {
  const [currentPlugin, setCurrentPlugin] = useState<Plugin | null>(null)
  const [needShowPluginInfo, setNeedShowPluginInfo] = useState(false)

  const selectPlugin = (itemData) => {
    setNeedShowPluginInfo(true)
    setCurrentPlugin(data.find(item => item.name === itemData.value))
  }

  const items = data.map(plugin => ({
    label: plugin.name,
    value: plugin.name,
  }))

  return (
    <>
      <Text>已下载的插件</Text>
      {data.length === 0 && <Text>暂无插件</Text>}

      <SelectInput items={items} onSelect={selectPlugin} />

      {currentPlugin && needShowPluginInfo && <PluginInfo pluginName={currentPlugin.name} pluginDescription={currentPlugin.description} pluginVersion={currentPlugin.version} goBack={() => setNeedShowPluginInfo(false)} />}
    </>
  )
}

export default LocalPluginList
