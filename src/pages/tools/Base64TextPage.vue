<template>
  <QPage class="column" padding>
    <div class="header">
      <QBtnToggle v-model="base64Mode" size="sm" :options="base64ModeOptions" />
    </div>

    <QSeparator class="q-my-md" />

    <div class="editor-container">
      <QInput v-model="firstValue" class="editor" debounce="500" type="textarea" outlined />
      <QSeparator class="q-my-md" />
      <QInput
        v-model="secondValue"
        class="editor"
        debounce="500"
        type="textarea"
        outlined
        readonly
      />
    </div>
  </QPage>
</template>

<script lang="ts" setup>
import { base64, bytesToStr, strToBytes } from 'licia-es'

enum Base64Mode {
  Decode,
  Encode,
}

const base64ModeOptions = [
  { label: '编码', value: Base64Mode.Encode },
  { label: '解码', value: Base64Mode.Decode },
]

const base64Mode = ref<Base64Mode>(Base64Mode.Encode)

const firstValue = ref('')
const secondValue = ref('')

watch(firstValue, (val) => {
  if (base64Mode.value === Base64Mode.Decode) {
    try {
      secondValue.value = bytesToStr(base64.decode(val))
    } catch (e) {
      console.log('e: ', e)
      secondValue.value = '无效Base64文本'
    }
  } else {
    secondValue.value = base64.encode(strToBytes(val))
  }
})

watch(base64Mode, () => {
  const tempValue = secondValue.value
  secondValue.value = firstValue.value
  firstValue.value = tempValue
})
</script>

<style lang="scss" scoped>
.header {
  flex-shrink: 0;
}
</style>
