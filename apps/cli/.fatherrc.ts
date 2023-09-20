import { defineConfig } from 'father';
import path from 'path'

export default defineConfig({
  extends: path.resolve(__dirname,'../../.fatherrc'),
  cjs: { output: 'dist', platform: 'node'},
  define:{
    'process.env.NODE_ENV': JSON.stringify(process.env.ENV),
  },
  
});
