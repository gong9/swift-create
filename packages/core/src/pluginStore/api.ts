import axios from 'axios'
import { duplicateRemovalByAttributes } from 'poor-utils-pro'

export type Plugin = {
    name: string,
    version: string,
    description: string
}

async function getAllPackages(scope) {
    const url = `https://registry.npmjs.org/-/v1/search?text=scope:${scope}&size=250`;
    const response = await axios.get(url);

    if (response.status === 200) {
        const packages = duplicateRemovalByAttributes(response.data.objects, 'name').map(pkg => {
            return {
                name: pkg.package.name,
                version: pkg.package.version,
                description: pkg.package.description
            }
        });

        return packages;
    } else {
        throw new Error(`Failed to get packages for ${scope}`);
    }
}

export const getOfficialPlugins: () => Promise<Plugin[]> = async () => {
    return await getAllPackages('gongcli')
}

