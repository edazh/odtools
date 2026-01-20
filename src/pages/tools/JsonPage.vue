<template>
  <QPage class="column" padding>
    <div class="header q-gutter-sm">
      <QBtn size="sm" color="primary" outline label="Format" @click="formatDocument" />
      <QBtn size="sm" color="primary" outline label="转义" @click="escape" />
      <QBtn size="sm" color="primary" outline label="去转义" @click="unescape" />
    </div>

    <QSeparator class="q-my-md" />

    <MonacoEditor ref="editorRef" v-model="codeValue" class="editor" language="json" />
  </QPage>
</template>

<script lang="ts" setup>
import MonacoEditor from '@/components/MonacoEditor/MonacoEditor.vue'
// import {  } from 'licia-es'

const codeValue = ref('')
const editorRef = ref<typeof MonacoEditor | null>(null)

function formatDocument() {
  editorRef.value?.formatDocument()
}

function escape() {
  codeValue.value = codeValue.value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}
function unescape() {
  codeValue.value = codeValue.value.replace(/\\\\/g, '\\').replace(/\\"/g, '"')
}
</script>

<style lang="scss" scoped>
.header {
  flex-shrink: 0;
}
.editor {
  flex: 1;
}
</style>
