<template>
  <QPage padding>
    <QList class="row">
      <div v-for="i in 50" :key="i" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <!-- <QCard> -->
        <QItem v-ripple clickable class="">
          <QItemSection avatar>
            <QIcon color="primary" name="bluetooth" />
          </QItemSection>

          <QItemSection>
            <QItemLabel>({{ i }})Icon as avatar</QItemLabel>
            <QItemLabel caption>JSON 格式化</QItemLabel>
          </QItemSection>
        </QItem>
        <!-- </QCard> -->
      </div>
    </QList>
  </QPage>
</template>
