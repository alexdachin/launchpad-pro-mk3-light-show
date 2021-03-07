import { colors } from '../constants/colors'
import { grid } from '../constants/grid'
import { sendPadColor } from '../output'

export const animateDiagonalTopLeft = (): Promise<void> => new Promise((resolve) => {
  let frame = 0

  const loop = setInterval(() => {
    if (frame === 15) {
      clearInterval(loop)
      return resolve()
    }

    grid.forEach((row, i) => row.forEach((pad, j) => {
      if (i + j === frame) {
        sendPadColor(pad, colors.yellow)
      }
    }))

    frame++
  }, Math.ceil(1000 / 20))
})

export const animateDiagonalBottomRight = (): Promise<void> => new Promise((resolve) => {
  let frame = 0

  const loop = setInterval(() => {
    if (frame === 15) {
      clearInterval(loop)
      return resolve()
    }

    grid.forEach((row, i) => row.forEach((pad, j) => {
      if (i + j === 14 - frame) {
        sendPadColor(pad, colors.pink)
      }
    }))

    frame++
  }, Math.ceil(1000 / 20))
})
