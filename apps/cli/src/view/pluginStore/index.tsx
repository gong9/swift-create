import type { FC } from 'react'
import React from 'react'

import { ConfigMainParamsEnum } from '../../enum'
import { pluginRecordOperations } from '../../utils/recordOperations'
import AllPluginList from './pluginComponents/AllPluginList'
import LocalPluginList from './pluginComponents/LocalPlugin'

interface PlginPageProps {
  params: ConfigMainParamsEnum
}

const PlginPage: FC<PlginPageProps> = ({ params }) => {
  return (
    <>
      {params === ConfigMainParamsEnum.Store && <AllPluginList />}
      {params === ConfigMainParamsEnum.List && <LocalPluginList data={pluginRecordOperations.queryAllRecordPluginConfig} />}
    </>
  )
}

export default PlginPage
