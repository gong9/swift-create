# Swift-Core

Swift-Core 是一个用于构建命令行界面（CLI）应用的工具包，可以帮助你快速搭建 CLI 脚手架下载器。要开始使用，你需要：

## 1. 配置你的仓库地址



- 对于 GitHub 个人账号：打开你的仓库主页，复制地址栏中的 如：`https://github.com/gong9`
- 对于 Gitee 个人账号：同理操作，复制地址栏中的 如：`https://gitee.com/gong9`
- 对于 GitHub 组织账号：同样打开主页，复制地址栏中的 `https://github.com/gong-cli`



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

## 3. 仓库模版项目名称规定

cli会找所有以`template-`开头的开源项目模版，然后根据你的选择进行下载

Swift-Core 将为你的 CLI 自动生成 GUI 组件。通过 GUI 进行选择时（例如，select 组件选择 "React" ， input 组件中输入 "111"），它将从你指定的仓库中搜索并下载符合条件的项目（本例中为包含 "react" 和 "111" 的项目，如template-react-111）。

none 代表不选择任何项目，匹配所有项目。


## 安装

确保你安装了 Node.js 版本 18.0.0 或更高：

```bash
pnpm add swift-core
```

## 使用

index.js

```js
#!/usr/bin/env node

import SwiftCore from 'swift-core';

const swiftCore = new SwiftCore({
  name: 'swift-core',
  path: 'https://github.com/gong9', //目前仅支持 gitee 和 github
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

## 执行

node index.js


## 上传部署自己的脚手架

你可以 clone `https://github.com/gong-cli/template-cli` 此项目，修改为0你的配置和package.json。 然后npm publish
