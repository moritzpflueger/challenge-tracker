export interface Counter {
  id: string,
  title: string,
  count: number,
  target: number | null,
  targetDate: string,
  startDate: string,
  finishingDate: string | null,
}