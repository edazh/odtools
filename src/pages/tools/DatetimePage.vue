<template>
  <QPage class="column" padding>
    <div class="row items-center">
      <QInput v-model="inputDate" label="时间/日期/时间戳" dense filled>
        <template v-slot:prepend>
          <QIcon name="event" class="cursor-pointer">
            <QPopupProxy cover transition-show="scale" transition-hide="scale">
              <QDate v-model="inputDate" mask="YYYY-MM-DD HH:mm">
                <div class="row items-center justify-end">
                  <QBtn v-close-popup label="关闭" color="primary" flat />
                </div>
              </QDate>
            </QPopupProxy>
          </QIcon>
        </template>

        <template v-slot:append>
          <QIcon name="access_time" class="cursor-pointer">
            <QPopupProxy cover transition-show="scale" transition-hide="scale">
              <QTime v-model="inputDate" mask="YYYY-MM-DD HH:mm" format24h>
                <div class="row items-center justify-end">
                  <QBtn v-close-popup label="关闭" color="primary" flat />
                </div>
              </QTime>
            </QPopupProxy>
          </QIcon>
        </template>
      </QInput>

      <QBtn class="q-ml-md" label="当前时间" @click="getCurrentTime" />
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
        <tr v-for="format in timeFormatList" :key="format.label">
          <td class="text-left">{{ format.label }}</td>
          <td class="text-left">{{ format.value }}</td>
        </tr>
        <tr>
          <td class="text-left">距现在</td>
          <td class="text-left">
            {{ formNow }}
            <QBtn
              class="q-ml-md"
              size="sm"
              :label="isActive ? '暂停' : '恢复'"
              @click="isActive ? pause() : resume()"
            />
          </td>
        </tr>
      </tbody>
    </QMarkupTable>
  </QPage>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import localeZhCN from 'dayjs/locale/zh-cn'
import { lpad } from 'licia-es'

dayjs.extend(advancedFormat)
dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
dayjs.extend(duration)

dayjs.locale(localeZhCN)

const inputDate = ref('')
const formNow = ref('-')

const { pause, resume, isActive } = useIntervalFn(() => {
  const date = normalizeDate(inputDate.value)
  const now = dayjs()
  const duration = dayjs.duration(Math.abs(date.diff(now)))
  const suffix = date.diff(now) > 0 ? '后' : '前'

  let result = ''
  if (duration.years()) result += `${duration.years()}年`
  if (duration.months() || result) result += `${padTimeZero(duration.months().toString())}月`
  if (duration.days() || result) result += `${padTimeZero(duration.days().toString())}日`
  if (duration.hours() || result) result += ` ${padTimeZero(duration.hours().toString())}时`
  if (duration.minutes() || result) result += `${padTimeZero(duration.minutes().toString())}分`

  result += `${padTimeZero(duration.seconds().toString())}秒${suffix}`

  formNow.value = result
}, 1000)

const timeFormatList = computed(() => {
  const date = normalizeDate(inputDate.value)
  return [
    {
      label: '日期时间',
      value: date.format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      label: '时间戳(秒)',
      value: date.format('X'),
    },
    {
      label: '时间戳(毫秒)',
      value: date.format('x'),
    },
    {
      label: '当地时间',
      value: date.format(),
    },
    {
      label: 'UTC时间',
      value: date.utc().format(),
    },
    {
      label: '相对时间',
      value: date.fromNow(),
    },
  ]
})

function getCurrentTime() {
  inputDate.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}

function padTimeZero(value: string) {
  return lpad(value, 2, '0')
}

function normalizeDate(value: string) {
  let date = dayjs(inputDate.value)
  if (/^\d{10}$/.test(value)) {
    date = dayjs.unix(Number.parseInt(value))
  } else if (/^\d{13}$/.test(value)) {
    date = dayjs(Number.parseInt(value))
  } else if (!date.isValid()) {
    date = dayjs(dayjs().format('YYYY-MM-DD') + ' ' + inputDate.value)
  }

  return date
}

onMounted(() => {
  getCurrentTime()
})
</script>
