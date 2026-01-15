export const useToolsStore = defineStore('tools', function () {
  const tools = reactive([
    {
      label: 'JSON 格式化',
      path: '/tools/json-format',
      icon: 'mdi-code-json',
    },
    {
      label: 'Base64 编解码',
      path: '/tools/base64',
      icon: 'mdi-alpha-b',
    },
  ])

  return {
    tools,
  }
})
