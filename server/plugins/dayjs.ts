import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import 'dayjs/locale/vi'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale('vi')
dayjs.tz.setDefault('Asia/Ho_Chi_Minh')

declare global {
  var DayJS: typeof dayjs
}

export default defineNitroPlugin(() => {
  global.DayJS = dayjs
})