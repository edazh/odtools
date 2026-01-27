<template>
  <QPage class="column" padding>
    <div class="header">
      <QBtnToggle v-model="urlMode" size="sm" :options="urlModeOptions" />
      <QCheckbox v-model="hasUri" class="q-ml-md" label="包含URI">
        <QTooltip>包含：; , / ? : @ & = + $</QTooltip>
      </QCheckbox>
    </div>

    <QSeparator class="q-my-md" />

    <div class="editor-container">
      <QInput v-model="firstValue" class="editor" debounce="300" type="textarea" outlined />
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
enum UrlMode {
  Decode,
  Encode,
}

const urlModeOptions = [
  { label: '编码', value: UrlMode.Encode },
  { label: '解码', value: UrlMode.Decode },
]

const urlMode = ref<UrlMode>(UrlMode.Encode)
const hasUri = ref(true)

const firstValue = ref('')
const secondValue = ref('')

// function doEncode

// watch(firstValue, (val) => {
//   if (urlMode.value === UrlMode.Decode) {
//    secondValue.value = encodeURIComponent(val)
//   } else {
//     secondValue.value = base64.encode(strToBytes(val))
//   }
// })

watchPostEffect(() => {
  if (urlMode.value === UrlMode.Decode) {
    secondValue.value = hasUri.value
      ? decodeURIComponent(firstValue.value)
      : decodeURI(firstValue.value)
  } else {
    secondValue.value = hasUri.value
      ? encodeURIComponent(firstValue.value)
      : encodeURI(firstValue.value)
  }
})

watch(urlMode, () => {
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
