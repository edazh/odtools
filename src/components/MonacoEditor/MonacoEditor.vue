<template>
  <div ref="editorRef" class="monaco-editor" />
</template>

<script lang="ts" setup>
import monaco, { type IEditorOptions } from './monaco'

const modelValue = defineModel<string>({ default: '' })

const props = defineProps<{
  language?: string
  options?: IEditorOptions
}>()

const editorRef = ref<HTMLDivElement>()

let myEditor: monaco.editor.IStandaloneCodeEditor | null = null

function formatDocument() {
  myEditor?.trigger('editor', 'editor.action.formatDocument', null)
}

watch(modelValue, (value) => {
  const model = myEditor?.getModel()
  if (model && value !== model.getValue()) model.setValue(value)
})

watch(
  () => props.language,
  (language) => {
    const model = myEditor?.getModel()
    if (model) monaco.editor.setModelLanguage(model, language || '')
  },
)

watch(
  () => props.options,
  (options) => {
    if (options) myEditor?.updateOptions(options)
  },
  {
    deep: true,
  },
)

onMounted(() => {
  if (!editorRef.value) return
  const model = monaco.editor.createModel('', props.language)
  myEditor = monaco.editor.create(editorRef.value, {
    model,
    minimap: { enabled: false },
    ...props.options,
  })

  myEditor.onDidChangeModelContent(() => {
    modelValue.value = myEditor?.getValue() || ''
  })
})

defineExpose({
  formatDocument,
})
</script>

<style lang="scss">
.monaco-editor {
  width: 100%;
  height: 100%;
}
</style>
