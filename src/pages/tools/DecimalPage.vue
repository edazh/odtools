<template>
  <QPage class="column" padding>
    <div class="header">
      <QInput v-model="originValue" placeholder="要转换的数字" dense />
      <QSelect
        v-model="originDecimal"
        label="进制"
        style="width: 80px"
        :options="decimalOptions"
        dense
      />
    </div>

    <QSeparator class="q-my-md" />

    <QMarkupTable separator="vertical" dense>
      <thead>
        <tr>
          <th class="text-left" style="width: 120px">进制</th>
          <th class="text-left">值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="decimal in decimalList" :key="decimal.value">
          <td class="text-left">{{ decimal.label }}</td>
          <td class="text-left">{{ decimal.value }}</td>
        </tr>
      </tbody>
    </QMarkupTable>
  </QPage>
</template>

<script lang="ts" setup>
const originValue = ref('111000')
const originDecimal = ref(10)

const decimalOptions = [
  { label: '2 进制', value: 2 },
  { label: '8 进制', value: 8 },
  { label: '10 进制', value: 10 },
  { label: '16 进制', value: 16 },
  { label: '32 进制', value: 32 },
]

const decimalList = computed(() => {
  return decimalOptions.map((decimal) => {
    return {
      label: decimal.label,
      value: parseInt(originValue.value, originDecimal.value).toString(decimal.value).toUpperCase(),
    }
  })
})
</script>

<style lang="scss" scoped>
.header {
  flex-shrink: 0;
  display: flex;
}
</style>
