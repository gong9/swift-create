import React, { FC } from "react";
import { Text, Box } from 'ink';


interface PluginInfoProps {
    pluginName: string
    pluginDescription: string
    pluginVersion: string
}

const PluginInfo: FC<PluginInfoProps> = ({ pluginName, pluginDescription, pluginVersion }) => {
    return (
        <Box flexDirection="column" width="50%" marginTop={1}>
            <Text color='magentaBright'>插件详细信息</Text>
            <Box justifyContent="space-between" marginTop={1}>
                <Text>插件名称：</Text>
                <Text color="green">{pluginName}</Text>
            </Box>
            <Box justifyContent="space-between">
                <Text>插件描述</Text>
                <Text color="green">{pluginDescription}</Text>
            </Box>
            <Box justifyContent="space-between">
                <Text>插件版本：</Text>
                <Text color="green">{pluginVersion}</Text>
            </Box>
        </Box>
    );
}

export default PluginInfo;