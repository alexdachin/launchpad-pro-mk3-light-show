import { colors } from '../constants/colors'

import { Pattern } from './types'

const charToColor = (char: string): typeof colors[keyof typeof colors] => {
  if (char === 'Y') { return colors.yellow }
  return colors.empty
}

export const parsePattern = (pattern: string): Pattern =>
  pattern
    .trim()
    .split('\n')
    .map(line => line.split('').map(charToColor))
