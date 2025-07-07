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