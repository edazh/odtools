export const useToolsStore = defineStore('tools', function () {
  const tools = reactive([
    {
      label: 'JSON 格式化',
      path: '/tools/json',
      icon: 'mdi-code-json',
    },
    {
      label: 'Base64 文本',
      path: '/tools/base64-text',
      icon: 'mdi-text',
    },
    {
      label: 'Base64 图片',
      path: '/tools/base64-img',
      icon: 'mdi-image',
    },
    {
      label: '随机密码',
      path: '/tools/password',
      icon: 'mdi-key',
    },
    {
      label: 'UUID',
      path: '/tools/uuid',
      icon: 'mdi-identifier',
    },
    {
      label: '进制转换',
      path: '/tools/decimal',
      icon: 'mdi-decimal',
    },
  ])

  return {
    tools,
  }
})
