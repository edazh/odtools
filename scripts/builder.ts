import type { Configuration } from 'electron-builder'

export function createBuilderOptions(): Configuration {
  return {
    appId: 'com.edazh.odtool',

    win: {
      target: 'nsis',
    },

    nsis: {
      artifactName: '${name}-${arch}-${channel}.${ext}',
    },

    mac: {
      target: {
        target: 'dmg',
        arch: 'universal',
      },
      category: 'public.app-category.developer-tools',
    },

    linux: {
      target: ['AppImage', 'deb', 'rpm'],
      maintainer: 'github.com/edazh',
      category: 'Development',
    },
  }
}
