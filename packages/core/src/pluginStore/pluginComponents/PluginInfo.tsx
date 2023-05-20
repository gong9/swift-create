import React, { FC } from "react";
import { Text } from 'ink';


interface PluginInfoProps {
    pluginName: string
    pluginDescription: string
}

const PluginInfo: FC<PluginInfoProps> = ({ pluginName, pluginDescription }) => {
    return (
        <>
            <Text>插件信息</Text>

            <Text>{pluginName}</Text>
            <Text>{pluginDescription}</Text>
        </>
    );
}

export default PluginInfo;