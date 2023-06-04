# gong-create

## What

目标是打造一个通用的cli引擎，可以作为一个脚手架的脚手架。

使用者可以插件化的方式，扩展生成适合自己的脚手架。

## Install
> node version >= 18.0.0

notes: 由于使用了pnpm作为包管理器，所以需要安装pnpm

```bash
npm -g install pnpm
```

```bash
npx gong-create@latest
```

## Feature

- 项目模版独立
- 模版地址支持gihtub、npm两种方式 「目前仅完善了github」
- 提供常用的生成器功能 「待完善」

## Process

- 插件商场开发中，体验可拉去代码 `pnpm start -p` 预先体验



