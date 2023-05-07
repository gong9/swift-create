#!/usr/bin/env node
import { cli } from 'cleye';
import { spawn } from 'child_process';
import path from "path";
import { consola } from 'consola'
import packJson from '../package.json';

const argv = cli({
  name: 'gong-create',
  version: packJson.version,
  description: 'cli',
  flags: {
    plugins: {
      type: Boolean,
      alias: 'p',
    },
    location: {
      type: Boolean,
      alias: 'l',
    },
    add: {
      type: Boolean,
      alias: 'a',
    }
  }
});

const initAPP = () => {
  spawn('node', [`${path.resolve(__dirname, 'cli.js')}`], { stdio: 'inherit' });
}

const { plugins, location, add } = argv.flags;

if (plugins) {
  if (location) {
    // 列举本地插件
  } else {
    // 列举远程插件
  }
} else if (add) {
  // add 插件
} else {
  initAPP();
}




