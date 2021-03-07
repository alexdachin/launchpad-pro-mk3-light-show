import { grid } from '../constants/grid'
import { sendPadColor } from '../output'

import { Pattern } from './types'

export const sendPattern = (pattern: Pattern): void => {
  grid.forEach((row, i) => row.forEach((pad, j) => {
    sendPadColor(pad, pattern[i][j])
  }))
}
