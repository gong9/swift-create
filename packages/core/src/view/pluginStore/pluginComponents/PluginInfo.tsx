import console from 'node:console'
import type { FC } from 'react'
import React from 'react'
import { Box, Text } from 'ink'

import { install } from '../utils'
import { pluginRecordOperations } from '../../../utils/recordOperations'
import ConfirmInput from '../../../components/ConfirmInput'
import { ConfigMainParamsEnum } from '../../../enum'

interface PluginInfoProps {
  type: ConfigMainParamsEnum
  pluginName: string
  pluginDescription: string
  pluginVersion: string
  goBack: () => void
}

const PluginInfo: FC<PluginInfoProps> = ({ type, pluginName, pluginDescription, pluginVersion, goBack }) => {
  const pluginInfo = [
    {
      label: '插件名称:',
      value: pluginName,
    },
    {
      label: '插件描述:',
      value: pluginDescription,
    },
    {
      label: '插件版本:',
      value: pluginVersion,
    },
  ]

  const handleInstall = (isNeedInstall) => {
    if (isNeedInstall) {
      install(pluginName, goBack, {
        name: pluginName,
        version: pluginVersion,
        description: pluginDescription,
      })
    }
    else {
      goBack()
    }
  }

  const handleEnable = (isNeedEnable) => {
    if (isNeedEnable) {
      pluginRecordOperations.isEnableByname(pluginName) ? pluginRecordOperations.closePlugin(pluginName) : pluginRecordOperations.enablePlugin(pluginName)
      goBack()
    }
    else {
      goBack()
    }
  }

  return (
    <Box flexDirection="column" width="80">
      <Text color='magentaBright'>插件详细信息</Text>

      <Box flexDirection="column">
        {
                    pluginInfo.map((item) => {
                      return (
                        <Box key={item.label} justifyContent="space-between">
                          <Text>{item.label}</Text>
                          <Text color="green">{item.value}</Text>
                        </Box>
                      )
                    })
                }
      </Box>

      {type === ConfigMainParamsEnum.Store && (
        pluginRecordOperations.isExistRecordPluginConfigByname(pluginName)
          ? <Text color="red">已安装</Text>
          : <ConfirmInput description="需要安装么?" onSubmit={handleInstall} />
      )}

      {type === ConfigMainParamsEnum.List && (
        pluginRecordOperations.isEnableByname(pluginName)
          ? (
            <Box flexDirection='column'>
              <Text color="red">已启用</Text>
              <ConfirmInput description="需要关闭么?" onSubmit={handleEnable} />
            </Box>
            )
          : <ConfirmInput description="需要启用么?" onSubmit={handleEnable} />
      )}

    </Box>
  )
}

export default PluginInfo
