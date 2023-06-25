import type { FC } from 'react'
import React from 'react'

import { PluginMainParamsEnum } from '../enum'
import { pluginRecordOperations } from '../utils/recordOperations'
import AllPluginList from './pluginComponents/AllPluginList'
import LocalPluginList from './pluginComponents/LocalPlugin'

interface PlginPageProps {
  params: PluginMainParamsEnum
}

const PlginPage: FC<PlginPageProps> = ({ params }) => {
  return (
    <>
      {params === PluginMainParamsEnum.Store && <AllPluginList />}
      {params === PluginMainParamsEnum.List && <LocalPluginList data={pluginRecordOperations.queryAllRecordPluginConfig} />}
    </>
  )
}

export default PlginPage
