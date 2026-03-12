import type { Options } from '@electron/packager'
import { createDMG } from 'electron-installer-dmg'
import pkg from '../package.json'

export function createPackagerOptions(): Omit<Options, 'dir' | 'out'> {
  return {
    platform: ['win32', 'linux'],
    afterComplete: [
      (buildPath: string, _: string, platform: string) => {
        console.log('buildPath: ', buildPath, platform)
        switch (platform) {
          case 'darwin':
            return createDMG({
              appPath: `${buildPath}/${pkg.productName}.app`,
              out: buildPath,
              name: pkg.productName,
              overwrite: true,
            })
        }
      },
    ],
  }
}
