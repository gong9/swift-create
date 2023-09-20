#!/usr/bin/env node
import React from 'react'
import { render } from 'ink'
import App from './app'

import register from './plugin/register'
import type { HooksType } from './plugin/register'

const hooks = register()
hooks.then((hooks: HooksType) => {
  render(<App hooks={hooks}/>)
})
