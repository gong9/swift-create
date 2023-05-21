import { readJsonFile, writeJsonFile } from '../utils/fs'

export type PluginConfig = {
    name: string
    version: string
    enable?: boolean
}

// TODO: updatePluginConfigState 修改为装饰器
class RecordOperations {

    public pluginConfig: PluginConfig[];

    constructor() {
        this.pluginConfig = readJsonFile().plugins as PluginConfig[]
    }

    private updatePluginConfigState(){
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
        } else {
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

        this.pluginConfig = this.pluginConfig.map(item => {
            if (item.name === pluginName) {
                return data
            }
            return item
        })
        writeJsonFile(this.pluginConfig)
    }

    public getRecordPluginConfig(pluginName: string) {
        this.updatePluginConfigState()

        return this.pluginConfig.find(item => item.name === pluginName)
    }

    public queryAllRecordPluginConfig() {
        this.updatePluginConfigState()

        return this.pluginConfig
    }

    public queryAllRecordPluginConfigByEnable() {
        this.updatePluginConfigState()

        return this.pluginConfig.filter(item => item.enable)
    }
}

export default new RecordOperations()