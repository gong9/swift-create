#!/usr/bin/env node
import React from 'react'
import { render } from 'ink'

import PluginStore from './pluginStore/index'
import type { PluginMainParamsEnum } from './enum'

const params = process.argv.slice(2)[0] as PluginMainParamsEnum

render(<PluginStore params={params}/>)
