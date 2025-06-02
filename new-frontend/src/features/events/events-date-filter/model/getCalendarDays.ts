export function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0]
}


export function getMultiMonthDays(monthOffsets: number[] = [-1, 0, 1, 2, 3]) {
  const result: [string, string, string][] = []
  const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  const weekdayNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

  const today = new Date()

  for (const offset of monthOffsets) {
    const date = new Date(today.getFullYear(), today.getMonth() + offset, 1)
    const month = date.getMonth()
    const monthLabel = `${monthNames[month]}`

    while (date.getMonth() === month) {
      const day = String(date.getDate())
      const weekday = weekdayNames[date.getDay()]
      const formatted = `${day} ${monthLabel}`
      result.push([formatted, weekday, date.toISOString()])
      date.setDate(date.getDate() + 1)
    }
  }

  return result
}
