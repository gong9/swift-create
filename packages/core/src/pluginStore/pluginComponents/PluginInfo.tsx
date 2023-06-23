import type { FC } from 'react'
import React from 'react'
import { Box, Text } from 'ink'

import { install } from '../utils'
import recordOperations from '../../utils/recordOperations'
import ConfirmInput from '../../components/ConfirmInput'

interface PluginInfoProps {
  pluginName: string
  pluginDescription: string
  pluginVersion: string
  goBack: () => void
}

const PluginInfo: FC<PluginInfoProps> = ({ pluginName, pluginDescription, pluginVersion, goBack }) => {
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

  const handleInstall = (isInstall) => {
    if (isInstall) {
      install(pluginName, goBack, {
        name: pluginName,
        version: pluginVersion,
      })
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

      {
                recordOperations.isExistRecordPluginConfigByname(pluginName)
                  ? <Text color="red">已安装</Text>
                  : <ConfirmInput description="需要安装么?" onSubmit={handleInstall} />
            }
    </Box>
  )
}

export default PluginInfo
