import { getDateKey } from '../model/getCalendarDays'

/**
 * Обновляет массив selectedDates при клике по дате.
 * Если дата уже есть — удаляет её, если пустой массив — добавляет одну,
 * если в массиве одна дата — добавляет и сортирует по возрастанию,
 * если в массиве две даты — сбрасывает в единственную выбранную.
 */
export function updateSelectedDates(
  prev: Date[],
  clickedDate: Date
): Date[] {
  const exists = prev.find(d => getDateKey(d) === getDateKey(clickedDate))
  if (exists) {
    return prev.filter(d => getDateKey(d) !== getDateKey(clickedDate))
  }
  if (prev.length === 0) {
    return [clickedDate]
  }
  if (prev.length === 1) {
    return [...prev, clickedDate].sort((a, b) => a.getTime() - b.getTime())
  }
  // если обе даты уже выбраны — сбрасываем на одну
  return [clickedDate]
}


/**
 * Проверяет, попадает ли данный fullDate (в ISO-строке) в текущий выбор:
 * − если выбрана одна дата — сравниваем равенство,
 * − если выбраны две — проверяем попадание в диапазон [start…end].
 */
export function isDateSelected(
  fullDate: string,
  selectedDates: Date[]
): boolean {
  if (selectedDates.length === 1) {
    return getDateKey(new Date(fullDate)) === getDateKey(selectedDates[0])
  }
  if (selectedDates.length === 2) {
    const [start, end] = selectedDates
    const time = new Date(fullDate).getTime()
    return time >= start.getTime() && time <= end.getTime()
  }
  return false
}


/**
 * Формирует заголовок «Календарь мероприятий …» в зависимости от числа выбранных дат.
 * Когда 1 дата — «день месяц год»;
 * когда 2 — «день месяц год — день месяц год»;
 * иначе просто «Календарь мероприятий».
 */
export function buildTitle(selectedDates: Date[]): string {
  if (selectedDates.length === 1) {
    return `Календарь мероприятий <span>${formatDateLabel(selectedDates[0])}</span>`
  }
  if (selectedDates.length === 2) {
    const [start, end] = selectedDates
    return `Календарь мероприятий <span>${formatDateLabel(start)} — ${formatDateLabel(end)}</span>`
  }
  return 'Календарь мероприятий'
}


/**
 * Форматирует дату, выводя «день месяц(прописная) год».
 */
export function formatDateLabel(date: Date): string {
  const day = date.getDate()
  const month = date.toLocaleString('ru-RU', { month: 'long' })
  const year = date.getFullYear()
  // Сделаем первую букву месяца заглавной
  const prettyMonth = `${month[0].toUpperCase()}${month.slice(1)}`
  return `${day} ${prettyMonth} ${year}`
}
