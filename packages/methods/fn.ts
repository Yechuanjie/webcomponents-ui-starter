/**
 *
 * @param appointTime 指定时间string(小时+分 15:30)
 * @param interVal 时间间隔 number分钟
 * @returns 指定时间interval分钟后的时间
 */
export function getAfterMinitesTime(appointTime: string, interval: number) {
  const timeStr = '2022-12-12 ' + appointTime
  const time = new Date(timeStr)
  time.setMinutes(time.getMinutes() + interval, time.getSeconds(), 0)
  const date = time
  const year = date.getFullYear()
  const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const sec = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return hour + ':' + min
}
