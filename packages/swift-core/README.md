# Swift-Core

Swift-Core 是一个用于构建命令行界面（CLI）应用的工具包，可以帮助你快速搭建 CLI 脚手架下载器。要开始使用，你需要：

## 1. 配置你的仓库名称（`userPath`）

根据你的仓库位置指定 `userPath` 和 `gitType` ：

- 对于 GitHub 个人账号：`userPath` 应该是你的用户名，例如，对于 `https://github.com/gong9`，`userPath` 是 `gong9`
- 对于 Gitee 个人账号：`userPath` 应该是你的用户名，例如，对于 `https://gitee.com/gong9`，`userPath` 是 `gong9`
- 对于 GitHub 组织账号：`userPath` 应该是你的组织名，例如，对于 `https://github.com/gong-cli`，`userPath` 是 `gong-cli`

gitType 为 `gitee` 或 `github`，默认为 `gitee`。


## 2. 配置你的 CLI 组件的 JSON 格式配置

如下定义你的 CLI 组件配置：

```json
[
  {
    "name": "frame",
    "label": "框架类型",
    "type": "select",
    "title": "请选择框架",
    "items": [
      {
        "label": "React",
        "value": "react"
      },
      {
        "label": "Vue",
        "value": "vue"
      },
      {
        "label": "None",
        "value": "none"
      }
    ]
  },
  {
    "name": "demo",
    "label": "demo",
    "type": "input",
    "title": "demo"
  }
]

```

Swift-Core 将为你的 CLI 自动生成 GUI 组件。通过 GUI 进行选择时（例如，为 select 组件选择 "React" 并在 input 组件中输入 "111"），它将从你指定的仓库中搜索并下载符合条件的项目（本例中为包含 "react" 和 "111" 的项目）。


## 安装

确保你安装了 Node.js 版本 18.0.0 或更高：

```bash
pnpm add swift-core
```

## 使用

```ts
#!/usr/bin/env node

import SwiftCore from 'swift-core';

const swiftCore = new SwiftCore({
  name: 'swift-core',
  userPath: 'gong9',
  gitType: 'gitee',  // 默认为 gitee,目前仅支持 gitee 和 github
  version: '0.0.1',
  description: 'CLI 工具，用于项目脚手架搭建',
});

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
});

swiftCore.run();

```