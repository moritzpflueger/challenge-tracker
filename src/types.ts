export interface Counter {
  id: string,
  title: string,
  count: number,
  target: number,
  targetDate: string,
  startDate: string,
  finishingDate: string | null,
}