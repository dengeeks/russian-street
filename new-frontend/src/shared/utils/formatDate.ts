export const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
export const weekdayNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  })
}

export function formatDateToDDMMYYYY(isoDate: string): string {
  const date = new Date(isoDate)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

// дд.мм.гггг в YYYY-MM-DD
export function formatDateToIso(dateStr: string): string {
  const [day, month, year] = dateStr.split('.');
  if (!day || !month || !year) return '';
  return `${year}-${month}-${day}`;
}


export function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)

  if (digits.length >= 5) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`
  } else if (digits.length >= 3) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}`
  }

  return digits
}

// "12-15 мая 2024 г."
export function formatDateRange(startISO: string, endISO: string): string {
  const start = new Date(startISO)
  const end = new Date(endISO)

  const startDay = start.getDate()
  const endDay = end.getDate()

  const startMonth = monthNames[start.getMonth()]
  const endMonth = monthNames[end.getMonth()]

  const startYear = start.getFullYear()
  const endYear = end.getFullYear()

  // Один и тот же месяц и год
  if (startYear === endYear && start.getMonth() === end.getMonth()) {
    return `${startDay}-${endDay} ${startMonth} ${startYear} г.`
  }

  // Разные месяцы, но один год
  if (startYear === endYear) {
    return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear} г.`
  }

  // Разные годы
  return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear} г.`
}


export function formatFullDateTime(isoDateString: string): string {
  const date = new Date(isoDateString)

  const weekday = weekdayNames[date.getDay()] // сокращенный день недели, например "Сб"
  const day = date.getDate() // число
  const month = monthNames[date.getMonth()] // сокращенный месяц, например "Ноя"
  const year = date.getFullYear()

  // Часы и минуты с ведущими нулями
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  // Формируем строку, добавляем неразрывные пробелы (\u00A0)
  return `${capitalizeFirstLetter(weekday)}. ${day}\u00A0${month}\u00A0${year} г., ${hours}:${minutes}`
}

// Вспомогательная функция для заглавной буквы
function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
