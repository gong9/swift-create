# gong-create

## What

目标是打造一个通用的cli引擎，可以作为一个脚手架的脚手架。

使用者可以插件化的方式，扩展生成适合自己的脚手架。

## Install
> node version >= 18.0.0

notes: 由于插件安装默认使用pnpm作为包管理器，所以需要安装pnpm

```bash
npm -g install pnpm
```

cli使用
```bash
npx gong-create@latest
```

## Feature

- 项目模版独立
- 模版地址支持gihtub、gitlab、gitee
- 提供常用的生成器功能 「待完善」

## Process

- 插件商场开发中，体验可拉去代码 `pnpm start -p` 预先体验


### Usage

本项目对模版项目进行了三种分类

- 项目类型：业务项目、组件项目、cli项目
- 业务框架：react、vue
- 仓库管理：monorepo、single-repo

故而，如果想设置自己的模版。需要有一个特定的命名方式

如：template-react-monorepo: 代表他是一个react的monorepo的模版，没有指定项目类型默认全匹配


如果你的模版仓库在github或者gitlab或者gitee，则你需要使用本项目的插件功能将指定平台的下载插件安装到本地


打开插件商店，进行插件安装
```bash
pnpm start -p
```

安装完成后，需要启用插件
```bash
pnpm start -l
```

notes: 下载插件引擎只会使用一个。「目前插件功能还未完善，仅github下载插件开发完成」

