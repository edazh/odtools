<template>
  <QPage class="column" padding>
    <!-- <div class="header">
      <QBtnToggle v-model="jwtMode" size="sm" :options="jwtModeOptions" />
    </div> -->

    <!-- <QSeparator class="q-my-md" /> -->

    <div class="editor-container">
      <QInput
        v-model="jwtInput"
        class="editor"
        label="JWT"
        debounce="500"
        type="textarea"
        :error="!!jwtErrorMessage"
        :error-message="jwtErrorMessage"
        no-error-icon
        outlined
      />

      <QSeparator class="q-my-md" />

      <QInput v-model="jwtHeader" class="editor" label="Header" type="textarea" outlined readonly />

      <QSeparator class="q-my-md" />

      <QInput
        v-model="jwtPayload"
        class="editor"
        label="Payload"
        type="textarea"
        outlined
        readonly
      />
    </div>
  </QPage>
</template>

<script lang="ts" setup>
import { decodeJwt, decodeProtectedHeader } from 'jose'

// enum JwtMode {
//   Decode,
//   Encode,
// }

// const jwtModeOptions = [
//   { label: '解码', value: JwtMode.Decode },
//   { label: '编码', value: JwtMode.Encode, disabled: true },
// ]

// const jwtMode = ref(JwtMode.Decode)
const jwtInput = ref('')

const jwtHeader = ref('')
const jwtPayload = ref('')
const jwtErrorMessage = ref('')

watchEffect(() => {
  jwtErrorMessage.value = ''

  if (jwtInput.value) {
    try {
      jwtPayload.value = JSON.stringify(decodeJwt(jwtInput.value), null, 2)
      jwtHeader.value = JSON.stringify(decodeProtectedHeader(jwtInput.value), null, 2)
    } catch (e) {
      console.log('e: ', e)
      jwtHeader.value = ''
      jwtPayload.value = ''
      jwtErrorMessage.value = '无效的 JWT'
    }
  } else {
    jwtHeader.value = ''
    jwtPayload.value = ''
  }
})
</script>

<style lang="scss" scoped>
.header {
  flex-shrink: 0;
}
</style>
