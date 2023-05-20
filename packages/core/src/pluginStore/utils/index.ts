import { exec, execSync } from 'child_process';
import os from 'os';
import path from 'path';
import { consola } from 'consola'

const getPackagePath = (): string | null => {
    try {
        const output = execSync('npm root -g');
        consola.info(output.toString());

        return output.toString();
    } catch (error) {
        consola.error(error);

        return null;
    }
}

function changeDirectoryWithPermission(directory, mode = 'dev') {
    if (os.type() === 'Darwin') {
        // macOS

        if (mode === 'dev') {
            process.chdir(path.resolve(__dirname,'../../../'));
        } else {
            process.chdir(directory.trim());
        }

        consola.info('进入引擎工作空间', process.cwd())
    } else if (os.type() === 'Windows_NT') {
        // Windows
        process.chdir(directory.trim());
        consola.info('进入引擎工作空间', process.cwd())

    } else {
        consola.error('Unsupported operating system.')
        process.exit(1);
    }
}

export const install = (pluginName: string, goBack:()=>void) => {

    const currentPath = getPackagePath()

    if (currentPath) {

        changeDirectoryWithPermission(currentPath)
        consola.info(`正在下载插件...`)

        exec(`pnpm add ${pluginName}`, (error, stdout, stderr) => {
            if (error) {
                consola.error(`exec error: ${error}`);
                return;
            }

            consola.info(stdout)
            stderr && consola.info(stderr)

            consola.success(`插件${pluginName}下载成功`)
            consola.info(`正在退出引擎工作空间,请稍等...`)

            setTimeout(() => {
                goBack()
            },3000)
        });

    }
}