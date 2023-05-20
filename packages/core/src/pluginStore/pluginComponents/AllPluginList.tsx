import React, { FC, useState } from "react";
import { Text } from "ink";
import SelectInput from 'ink-select-input'
import { useRequest } from "ahooks";

import PluginInfo from "./PluginInfo";
import { getOfficialPlugins, Plugin } from '../api'

interface AllPluginListProps {

}

const AllPluginList: FC<AllPluginListProps> = () => {

    const { data, error, loading } = useRequest(getOfficialPlugins);
    const [currentPlugin, setCurrentPlugin] = useState<Plugin | null>(null)
    const [needShowPluginInfo, setNeedShowPluginInfo] = useState(false)

    const selectPlugin = (itemData) => {
        setNeedShowPluginInfo(true)
        setCurrentPlugin(data.find(item => item.name === itemData.value))
    }

    if (error) {
        return <Text>出错了...</Text>
    }

    if (loading) {
        return <Text>插件加载中...</Text>
    } else {

        const items = data.map(plugin => ({
            label: plugin.name,
            value: plugin.name
        }))

        return (
            <>
                <Text>插件商店</Text>
                <SelectInput items={items} onSelect={selectPlugin} />

                {currentPlugin && needShowPluginInfo && <PluginInfo pluginName={currentPlugin.name} pluginDescription={currentPlugin.description} pluginVersion={currentPlugin.version} goBack={() => setNeedShowPluginInfo(false)} />}
            </>
        );
    }
}

export default AllPluginList;