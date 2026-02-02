<template>
  <QPage class="column" padding>
    <QInput v-model="urlValue" debounce="300" type="textarea" outlined />

    <QSeparator class="q-my-md" />

    <QMarkupTable class="full-width" separator="vertical" dense>
      <thead>
        <tr>
          <th class="text-left" style="width: 120px">序号</th>
          <th class="text-left">键</th>
          <th class="text-left">值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(query, index) in queryList" :key="query.key">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ query.key }}</td>
          <td class="text-left">{{ query.value }}</td>
        </tr>
      </tbody>
    </QMarkupTable>
  </QPage>
</template>

<script lang="ts" setup>
import { query } from 'licia-es'

type Query = {
  key: string
  value: unknown
}

const urlValue = ref('')

const queryList = ref<Array<Query>>([])

watchEffect(() => {
  const list: Array<Query> = []
  const queryStr = urlValue.value.split('?')[1] || ''
  Object.entries(query.parse(queryStr)).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      list.push(...value.map((value) => ({ key, value })))
    } else if (key) {
      list.push({ key, value })
    }
  })
  queryList.value = list
})
</script>
