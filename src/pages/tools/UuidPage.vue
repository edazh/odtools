<template>
  <QPage class="column" padding>
    <div class="row justify-between">
      <div class="row items-center q-gutter-md">
        <QBtn color="primary" label="生成" size="sm" outline @click="generate" />
      </div>

      <div class="row q-gutter-md">
        <BaseInputNumber v-model="formModel.count" label="数量" :max="10000" :min="1" dense />

        <QToggle v-model="formModel.upper" label="大写" />
        <!-- <QSelect
          filled
          v-model="formModel.version"
          label="版本"
          :options="uuidVersionOptions"
          style="width: 250px"
          behavior="menu"
        /> -->
      </div>
    </div>

    <QSeparator class="q-my-md" />

    <MonacoEditor v-model="codeValue" class="editor" language="plaintext" />
  </QPage>
</template>

<script lang="ts" setup>
import MonacoEditor from '@/components/MonacoEditor/MonacoEditor.vue'
import BaseInputNumber from '@/components/base/BaseInputNumber/BaseInputNumber.vue'
import { uuid, upperCase } from 'licia-es'

// const $q = useQuasar()
const codeValue = ref('')
const formModel = reactive({
  count: 10,
  upper: false,
  version: 'v4',
})

// const uuidVersionOptions = ['v4']

function generate() {
  let result = ''
  for (let i = 0; i < formModel.count; i++) {
    let str = uuid()
    if (formModel.upper) {
      str = upperCase(str)
    }
    result += `${str}\n`
  }
  codeValue.value = result
}
</script>

<style lang="scss" scoped>
.editor {
  flex: 1;
}
</style>
