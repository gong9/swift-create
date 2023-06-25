import type { FC } from 'react'
import React, { useState } from 'react'
import { Text } from 'ink'
import SelectInput from 'ink-select-input'
import { useRequest } from 'ahooks'

import type { Plugin } from '../api'
import { getOfficialPlugins } from '../api'
import { ConfigMainParamsEnum } from '../../../enum'
import PluginInfo from './PluginInfo'

interface AllPluginListProps {

}

const AllPluginList: FC<AllPluginListProps> = () => {
  const { data, error, loading } = useRequest(getOfficialPlugins)
  const [currentPlugin, setCurrentPlugin] = useState<Plugin | null>(null)
  const [needShowPluginInfo, setNeedShowPluginInfo] = useState(false)

  const selectPlugin = (itemData) => {
    setNeedShowPluginInfo(true)
    setCurrentPlugin(data.find(item => item.name === itemData.value))
  }

  if (error)
    return <Text>出错了...</Text>

  if (loading)
    return <Text>插件加载中...</Text>

  const items = data.map(plugin => ({
    label: plugin.name,
    value: plugin.name,
  }))

  return (
    <>
      <Text>插件商店</Text>
      <SelectInput items={items} onSelect={selectPlugin} />

      {currentPlugin && needShowPluginInfo && <PluginInfo type={ConfigMainParamsEnum.Store} pluginName={currentPlugin.name} pluginDescription={currentPlugin.description || ''} pluginVersion={currentPlugin.version}
        goBack={() => setNeedShowPluginInfo(false)} />}
    </>
  )
}

export default AllPluginList
