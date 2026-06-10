export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatMonthLabel(month: string): string {
  const [year, monthNum] = month.split('-').map(Number);
  const date = new Date(year, monthNum - 1, 1);
  return new Intl.DateTimeFormat('uk-UA', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}
