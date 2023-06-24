import { readJsonFile, writeJsonFile } from '../utils/fs'

export interface PluginConfig {
  name: string
  version: string
  enable?: boolean
  description: string
}

// TODO: 优化
class RecordOperations {
  public pluginConfig: PluginConfig[]

  constructor() {
    this.pluginConfig = readJsonFile().plugins as PluginConfig[]
  }

  private updatePluginConfigState() {
    this.pluginConfig = readJsonFile().plugins as PluginConfig[]
  }

  public isExistRecordPluginConfigByname(pluginName: string) {
    this.updatePluginConfigState()

    return this.pluginConfig.some(item => item.name === pluginName)
  }

  public addRecordPluginConfig(pluginName: string, data: PluginConfig) {
    this.updatePluginConfigState()

    if (data.enable === undefined)
      data.enable = false

    if (!this.isExistRecordPluginConfigByname(pluginName)) {
      this.pluginConfig.push(data)
      writeJsonFile(this.pluginConfig)
    }
    else {
      this.updateRecordPluginConfig(pluginName, data)
    }
  }

  public removeRecordPluginConfig(pluginName: string) {
    this.updatePluginConfigState()

    this.pluginConfig = this.pluginConfig.filter(item => item.name !== pluginName)
    writeJsonFile(this.pluginConfig)
  }

  public updateRecordPluginConfig(pluginName: string, data: PluginConfig) {
    this.updatePluginConfigState()

    if (data.enable === undefined)
      data.enable = false

    this.pluginConfig = this.pluginConfig.map((item) => {
      if (item.name === pluginName)
        return data

      return item
    })
    writeJsonFile(this.pluginConfig)
  }

  public getRecordPluginConfig(pluginName: string) {
    this.updatePluginConfigState()

    return this.pluginConfig.find(item => item.name === pluginName)
  }

  /**
   * open plugin
   * @param pluginName
   */
  public enablePlugin(pluginName: string) {
    const currentPluginData = this.getRecordPluginConfig(pluginName)
    currentPluginData.enable = true
    this.updateRecordPluginConfig(pluginName, currentPluginData)
  }

  /**
   * closePlugin
   * @param pluginName
   */
  public closePlugin(pluginName: string) {
    const currentPluginData = this.getRecordPluginConfig(pluginName)
    currentPluginData.enable = false
    this.updateRecordPluginConfig(pluginName, currentPluginData)
  }

  /**
   * check plugin is enable
   * @param pluginName
   * @returns
   */
  public isEnableByname(pluginName: string) {
    return this.getRecordPluginConfig(pluginName)?.enable
  }

  public get queryAllRecordPluginConfig() {
    this.updatePluginConfigState()

    return this.pluginConfig
  }

  public get queryAllRecordPluginConfigByEnable() {
    this.updatePluginConfigState()

    return this.pluginConfig.filter(item => item.enable)
  }
}

export default new RecordOperations()
