export function toggleCSVValue(csv: string, value: string): string {
  const items = csv
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);

  const index = items.indexOf(value);
  if (index >= 0) {
    items.splice(index, 1); // удалить
  } else {
    items.push(value); // добавить
  }

  return items.join(',');
}
