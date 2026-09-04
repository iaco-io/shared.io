export const colors = [
  'var(--red)',
  'var(--orange)',
  'var(--yellow)',
  'var(--green)',
  'var(--mint)',
  'var(--teal)',
  'var(--cyan)',
  'var(--blue)',
  'var(--indigo)',
  'var(--purple)',
  'var(--pink)',
  'var(--brown)',
  'var(--gray)'
] as const

export type CssColor = typeof colors[number]

export function getColor(value: unknown): CssColor {
  if (typeof value === 'string' && colors.includes(value as CssColor)) {
    return value as CssColor
  }
  return 'var(--mint)'
}