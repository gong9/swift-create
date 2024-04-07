#!/usr/bin/env node
import SwiftCore from 'swift-core'

const swiftCore = new SwiftCore({
  name: 'swift-core',
  userPath: 'gong-cli',
  gitType: 'github',
  version: '0.0.1',
  description: 'cli',
})

swiftCore.setConfig({
  configData: [
    {
      name: 'frame',
      label: '框架类型',
      type: 'select',
      title: '请选择框架',
      items: [
        {
          label: 'React',
          value: 'react',
        },
        {
          label: 'Vue',
          value: 'vue',
        },
        {
          label: 'None',
          value: 'none',
        },
      ],
    },
  ],
})

swiftCore.run()
