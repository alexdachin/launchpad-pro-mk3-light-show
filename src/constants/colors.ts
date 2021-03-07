export const colors = {
  empty: 0,
  red: 5,
  lightPink: 52,
  pink: 53,
  yellow: 124,
} as const

export type ColorName = keyof typeof colors

export type Color = typeof colors[ColorName]
