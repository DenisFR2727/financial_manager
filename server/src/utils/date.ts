export function getMonthRange(month: string): { start: Date; end: Date } {
  const [year, monthNum] = month.split('-').map(Number);
  const start = new Date(year, monthNum - 1, 1);
  const end = new Date(year, monthNum, 0, 23, 59, 59, 999);
  return { start, end };
}

export function getCurrentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}
