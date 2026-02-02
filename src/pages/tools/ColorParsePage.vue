<template>
  <QPage class="column" padding>
    <div class="row">
      <QInput filled v-model="inputValue" :rules="['anyColor']" debounce="300" dense>
        <template v-slot:prepend>
          <QIcon name="mdi-square" :style="{ color: inputValue }" />
        </template>
        <template v-slot:append>
          <QIcon class="cursor-pointer" name="mdi-palette">
            <QPopupProxy cover transition-show="scale" transition-hide="scale">
              <QColor v-model="inputValue" />
            </QPopupProxy>
          </QIcon>
        </template>
      </QInput>
    </div>

    <QSeparator class="q-my-md" />

    <QMarkupTable class="full-width" separator="vertical" dense>
      <thead>
        <tr>
          <th class="text-left">格式</th>
          <th class="text-left">值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="color in colorList" :key="color.mode">
          <td class="text-left">{{ color.mode }}</td>
          <td class="text-left">{{ color.value }}</td>
        </tr>
      </tbody>
    </QMarkupTable>
  </QPage>
</template>

<script lang="ts" setup>
import { Color } from 'licia-es'

interface IColor {
  mode: string
  value: unknown
}

const inputValue = ref('#1976d2')

const colorList = ref<Array<IColor>>([])

watchEffect(() => {
  const color = new Color(inputValue.value)

  colorList.value = [
    {
      mode: 'HEX',
      value: color.toHex(),
    },
    {
      mode: 'RGB',
      value: color.toRgb(),
    },
    {
      mode: 'HSL',
      value: color.toHsl(),
    },
  ]
})
</script>
