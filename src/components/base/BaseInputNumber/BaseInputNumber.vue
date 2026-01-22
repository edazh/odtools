<template>
  <QInput v-model.number="modelValue" type="number" @blur="onBlur" />
</template>

<script lang="ts" setup>
const modelValue = defineModel<string | number>()

const props = withDefaults(
  defineProps<{
    max: number
    min: number
  }>(),
  {
    max: Number.POSITIVE_INFINITY,
    min: Number.NEGATIVE_INFINITY,
  },
)

function onBlur() {
  const nValue = Number(modelValue.value)
  console.log('nValue: ', nValue)
  if (Number.isNaN(nValue)) {
    modelValue.value = 0
  } else if (nValue > props.max) {
    modelValue.value = props.max
  } else if (nValue < props.min) {
    modelValue.value = props.min
  }
}
</script>
