import type { FC } from 'react'
import React from 'react'
import AllPluginList from './pluginComponents/AllPluginList'

interface PlginPageProps {

}
const PlginPage: FC<PlginPageProps> = () => {
  return (
    <>
      <AllPluginList />
    </>
  )
}

export default PlginPage
