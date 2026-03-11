import type { Configuration } from 'electron-builder'

export function createBuilderOptions(): Configuration {
  return {
    mac: {
      category: 'public.app-category.developer-tools',
      target: ['dmg', 'zip'],
    }
  }
}
