<template>
  <QLayout view="hHh Lpr lFf">
    <QHeader elevated>
      <QToolbar>
        <QBtn flat dense round icon="menu" aria-label="Menu" @click="toggleMiniState" />

        <QToolbarTitle> Quasar App </QToolbarTitle>

        <div>Quasar v{{ $q.version }}</div>
      </QToolbar>
    </QHeader>

    <QDrawer v-model="drawerOpened" :mini="miniState" show-if-above bordered>
      <QList>
        <QItem to="/">
          <QItemSection avatar>
            <QIcon name="mdi-home" />
          </QItemSection>
          <QItemSection>全部工具</QItemSection>
        </QItem>

        <QItem v-for="tool in toolsStore.tools" :key="tool.path" :to="tool.path">
          <QItemSection avatar>
            <QIcon :name="tool.icon" />
          </QItemSection>
          <QItemSection>{{ tool.label }}</QItemSection>
        </QItem>
      </QList>
    </QDrawer>

    <QPageContainer>
      <RouterView />
    </QPageContainer>
  </QLayout>
</template>

<script setup lang="ts">
import { useToolsStore } from '@/stores/tools'
import { useQuasar } from 'quasar'
const miniState = ref(true)
const drawerOpened = ref(true)
const toolsStore = useToolsStore()
const $q = useQuasar()

function toggleMiniState() {
  if ($q.screen.lt.md) {
    drawerOpened.value = !drawerOpened.value
  } else {
    miniState.value = !miniState.value
  }
}
</script>
