export function getVisiblePages(current: number, total: number): (number | string)[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const delta = 1
  const range: (number | string)[] = []
  const rangeWithDots: (number | string)[] = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    for (let i = 1; i < Math.max(2, current - delta); i++) {
      rangeWithDots.push(i)
    }
  }

  rangeWithDots.push(...range)

  if (current + delta < total - 1) {
    rangeWithDots.push('...', total)
  } else {
    for (let i = current + delta + 1; i <= total; i++) {
      rangeWithDots.push(i)
    }
  }

  return rangeWithDots
}
