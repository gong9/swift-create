#!/usr/bin/env node
import React from 'react'
import { render } from 'ink'

import PluginStore from './view/pluginStore/index'
import ConfigView from './view/ConfigView'
import { ConfigMainParamsEnum } from './enum'

const params = process.argv.slice(2)[0] as ConfigMainParamsEnum

if (params === ConfigMainParamsEnum.Config)
  render(<ConfigView/>)

else
  render(<PluginStore params={params}/>)
