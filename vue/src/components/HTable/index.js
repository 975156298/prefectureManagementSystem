export function DateFormat(data = new Date(), sep = '-', type = 'ymd') {
  // 用于格式化时间
  const date = new Date(data)
  const y = date.getFullYear()
  const m = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  const d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  const t = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' +
    (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ':' +
    (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds())
  if (type === 'y') {
    return y
  }
  if (type === 'ym') {
    return y + sep + m
  }
  if (type === 'ymd') {
    return y + sep + m + sep + d
  }
  if (type === 'all') {
    return y + sep + m + sep + d + ' ' + t
  }
}

