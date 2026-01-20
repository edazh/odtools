<template>
  <QPage class="column" padding>
    <div class="header">
      <QBtn size="sm" color="primary" outline label="选择图片" @click="handlePickFile" />
    </div>

    <QSeparator class="q-my-md" />

    <QInput v-model="textValue" class="editor" debounce="500" type="textarea" outlined />

    <QSeparator class="q-my-md" />

    <div class="file-input" @drop="handleDrop">
      <div v-if="!imgSrc" class="file-placeholder" @click="handlePickFile">
        <QIcon name="mdi-file-image-outline" size="100px" color="grey" />
        <div class="text-grey">将图片拖到此处或点击上传</div>
      </div>
      <div v-else class="file-preview">
        <img class="file-preview__img" alt="Base64 Image" :src="imgSrc" @error="imgSrc = ''" />
      </div>
    </div>
  </QPage>
</template>

<script lang="ts" setup>
import { openFile, dataUrl, isDataUrl } from 'licia-es'

const textValue = ref('')
const imgSrc = ref('')

async function handlePickFile() {
  const [file] = await openFile({ accept: 'image/*' })
  if (!file) return
  fileToBase64(file)
}

async function handleDrop(event: DragEvent) {
  event.preventDefault()
  event.stopPropagation()
  const files = event.dataTransfer?.files
  if (!files) return
  const file = files.item(0)
  if (!file) return
  fileToBase64(file)
}

async function fileToBase64(file: File) {
  const buffer = await file.arrayBuffer()
  const base64Text = dataUrl.stringify(buffer, file.type)
  textValue.value = base64Text
  imgSrc.value = base64Text
}

watch(textValue, (value) => {
  if (!value) {
    imgSrc.value = ''
  } else if (isDataUrl(value)) {
    imgSrc.value = value
  } else {
    const url = dataUrl.stringify(value, 'image/png')
    imgSrc.value = url
  }
})
</script>

<style lang="scss" scoped>
.file-input {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 200px;
  border: 1px dashed #ccc;
}
.file-placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.file-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__img {
    display: block;
    height: auto;
    width: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
