type IsoWeekdayNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7

export function isoToUniweek(isoWeekday: number): string {
  return ['d', 'a', 'e', 'i', 'o', 'u', 'b', 'd'][isoWeekday] ?? 'b'
}

export function uniweekToIso(uniweek: string): number {
  switch (uniweek) {
    case 'b':
      return 6
    case 'd':
      return 7
    case 'a':
      return 1
    case 'e':
      return 2
    case 'i':
      return 3
    case 'o':
      return 4
    case 'u':
      return 5
    default:
      return 6
  }
}

export const isoWeekday = {
  SAT: 6,
  SUN: 7,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
} as const

export function getPreviousWeekday(weekday: IsoWeekdayNumbers) {
  return (weekday === 1 ? 7 : weekday - 1) as IsoWeekdayNumbers
}

export function getNextWeekday(weekday: IsoWeekdayNumbers) {
  return (weekday === 7 ? 1 : weekday + 1) as IsoWeekdayNumbers
}

export function yearPadded(year: any): string {
  return year.toString().padStart(4, '0')
}

export function odayPadded(oday: any): string {
  return oday.toString().padStart(3, '0')
}
