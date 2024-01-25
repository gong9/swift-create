# swift-create

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
npx swift-create@latest
```

如果您仅是想初始化eslint，可以
```base
npx swift-create@latest --lint
```

如果您仅是想初始化docs，可以
```base
npx swift-create@latest --docs
```

## Feature

- 项目模版独立
- 模版地址支持gihtub、gitlab、gitee
- 提供常用的生成器功能 「待完善」

### Usage

[视频链接](https://www.yuque.com/gongxiaobai/ckuidk/wp6gx65o7ezn0ud1)

本项目对模版项目进行了三种分类

- 项目类型：业务项目、组件项目、cli项目
- 业务框架：react、vue
- 仓库管理：monorepo、single-repo

故而，如果想设置自己的模版。需要有一个特定的命名方式

如：template-react-monorepo: 代表他是一个react的monorepo的模版，没有指定项目类型默认全匹配

如果你不喜欢上面这三种划分方式，没关系。自己配置也很容易
找到`core/cli.config.json`,修改`configData` 字段

```json
{
  "name": "gong-cl",
  "userPath": "gong-cli",
  "configData": [
    {
      "name": "project",
      "label": "项目类型",
      "type": "select",
      "title": "请选择所要创建的项目类型",
      "items": [
        {
          "label": "业务",
          "value": "business"
        },
        {
          "label": "库",
          "value": "lib"
        },
        {
          "label": "脚手架",
          "value": "cli"
        }
      ]
    },
    {
      "name": "codeManagement",
      "label": "仓库管理方式",
      "type": "select",
      "title": "请选择仓库管理方式",
      "items": [
        {
          "label": "单库项目",
          "value": "singlerepo"
        },
        {
          "label": "多库管理",
          "value": "monorepo"
        }
      ]
    },
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
    }
  ]
}
```
- name: 当前选项控件的唯一key 「必填」
- label: 选项控件的label 「必填」
- type: 选项控件的类型 「必填」
    - select: 下拉框
    - input: 输入框
- items: 「type为select时必填」： 下拉框的选项
    - label: 选项的label
    - value: 选项的value


不过需要注意的还是要模版名字遵循一定的规范，否则会导致引擎无法识别，eg:`['cli','singlerepo','react'] => template-cli-singlerepo-react`


#### 如何私有化使用
平台目前存在两个公共配置属性
- name、 cli名称，cli启动时的logo title
- userPath、 个人仓库的用户名或组织名， eg：https://github.com/gong-cli，则取gong-cli为userPath、https://github.com/gong9 则取gong9、https://gitee.com/gong9/ 同样取gong9为userPath。 正确设置此属性才能保证引擎可以获取到你的模版仓库

设置方式

```bash
pnpm start -c
```

此命令在上线时也支持设置
    
```bash
npx swift-create@latest -c
```

#### 如何使用插件
如果你的模版仓库在github或者gitlab或者gitee，则你需要使用本项目的插件功能将指定平台的下载插件安装到本地
> 开发环境使用，配置完成之后，私有化打包发布即可「即：将包名改为自己的，为希望后面可以继续使用插件生态不推荐对项目进行其他改造」

打开插件商店，进行插件安装
```bash
pnpm start -p
```

安装完成后，需要启用插件
```bash
pnpm start -l
```
notes: 下载插件引擎只会使用一个。「目前插件功能还未完善，仅github、gitee下载插件开发完成，非需token版本」

