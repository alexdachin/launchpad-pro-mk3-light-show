import { gridPads } from '../constants/pads'
import { sendPadColor } from '../output'

import { Pattern } from './types'

export const sendPattern = (pattern: Pattern): void => {
  gridPads.forEach((row, i) => row.forEach((pad, j) => {
    sendPadColor(pad, pattern[i][j])
  }))
}
