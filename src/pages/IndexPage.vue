<template>
  <QPage padding>
    <QList class="row">
      <div
        v-for="tool in toolsStore.tools"
        :key="tool.path"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
      >
        <QItem :to="tool.path" v-ripple clickable>
          <QItemSection avatar>
            <QIcon color="primary" :name="tool.icon" />
          </QItemSection>

          <QItemSection>
            <QItemLabel>{{ tool.label }}</QItemLabel>
            <!-- <QItemLabel caption>JSON 格式化</QItemLabel> -->
          </QItemSection>
        </QItem>
      </div>
    </QList>
  </QPage>
</template>

<script lang="ts" setup>
import { useToolsStore } from '@/stores/tools'

const toolsStore = useToolsStore()
</script>
