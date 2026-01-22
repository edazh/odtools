<template>
  <QPage class="column" padding>
    <div class="row justify-between">
      <div class="row items-center q-gutter-md">
        <QBtn color="primary" label="生成" size="sm" outline @click="generate" />
      </div>

      <div class="row q-gutter-md">
        <BaseInputNumber v-model="formModel.count" label="数量" :max="10000" :min="1" dense />

        <BaseInputNumber v-model="formModel.len" label="长度" :max="256" :min="1" dense />

        <QCheckbox v-model="formModel.upper" label="大写字母" dense>
          <QTooltip>包含：A-Z</QTooltip>
        </QCheckbox>
        <QCheckbox v-model="formModel.lower" label="小写字母" dense>
          <QTooltip>包含：a-z</QTooltip>
        </QCheckbox>
        <QCheckbox v-model="formModel.number" label="数字" dense>
          <QTooltip>包含：0-9</QTooltip>
        </QCheckbox>
        <!-- <QCheckbox v-model="formModel.special" label="特殊字符" /> -->

        <!-- <QInput v-model="formModel.prefix" maxlength="50" label="前缀" dense />
        <QInput v-model="formModel.suffix" maxlength="50" label="后缀" dense /> -->
      </div>
    </div>

    <QSeparator class="q-my-md" />

    <MonacoEditor v-model="codeValue" class="editor" language="plaintext" />
  </QPage>
</template>

<script lang="ts" setup>
import MonacoEditor from '@/components/MonacoEditor/MonacoEditor.vue'
import BaseInputNumber from '@/components/base/BaseInputNumber/BaseInputNumber.vue'
import { randomId } from 'licia-es'

const $q = useQuasar()
const codeValue = ref('')
const formModel = reactive({
  count: 10,
  len: 32,
  prefix: '',
  suffix: '',
  upper: true,
  lower: true,
  number: true,
  // special: false,
})

function generate() {
  let symbols = ''
  let result = ''
  if (!formModel.upper && !formModel.lower && !formModel.number) {
    $q.notify({
      type: 'warning',
      message: '未包含任何字符类型，无法生成',
      closeBtn: true,
    })
    return
  }
  if (formModel.upper) {
    symbols += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }
  if (formModel.lower) {
    symbols += 'abcdefghijklmnopqrstuvwxyz'
  }
  if (formModel.number) {
    symbols += '0123456789'
  }
  for (let i = 0; i < formModel.count; i++) {
    const str = randomId(formModel.len, symbols)
    result += `${formModel.prefix}${str}${formModel.suffix}\n`
  }
  codeValue.value = result
}
</script>

<style lang="scss" scoped>
.editor {
  flex: 1;
}
</style>
