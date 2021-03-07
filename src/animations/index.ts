import { colors, Color } from '../constants/colors'
import { gridPads } from '../constants/pads'
import { sendPadColor } from '../output'

import { buildFixFrameAnimation } from './build-fix-frame-animation'

type CheckFunction = ({ i, j, frame }: { i: number; j: number; frame: number }) => boolean
type DiagonalAnimationInput = {
  check: CheckFunction
  color: Color
}

const buildDiagonalAnimation = ({
  check,
  color,
}: DiagonalAnimationInput) => buildFixFrameAnimation({
  frames: 15,
  fps: 20,
  render: (frame) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (check({ i, j, frame })) {
          sendPadColor(gridPads[i][j], color)
        }
      }
    }
  },
})

export const animateDiagonalTopLeft = buildDiagonalAnimation({
  check: ({ i, j, frame }) => i + j === frame,
  color: colors.yellow,
})

export const animateDiagonalTopRight = buildDiagonalAnimation({
  check: ({ i, j, frame }) => i - j + 7 === frame,
  color: colors.green,
})

export const animateDiagonalBottomLeft = buildDiagonalAnimation({
  check: ({ i, j, frame }) => j - i + 7 === frame,
  color: colors.blue,
})

export const animateDiagonalBottomRight = buildDiagonalAnimation({
  check: ({ i, j, frame }) => 14 - i - j === frame,
  color: colors.pink,
})
