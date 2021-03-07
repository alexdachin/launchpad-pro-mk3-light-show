import { animateDiagonalTopLeft, animateDiagonalBottomRight } from './animations'
import { colors } from './constants/colors'
import { grid } from './constants/grid'
import { sendPadColor, emptyAll } from './output'

export const inputListener = (message: WebMidi.MIDIMessageEvent): void => {
  // timing clock
  if (message.data[0] === 248) return

  // after touch
  if (message.data[0] === 208) return

  // note on
  if (message.data[0] === 144 && message.data[2] > 0) {
    const pad = message.data[1]
    sendPadColor(pad, colors.pink)

    if (message.data[1] === grid[0][0]) {
      emptyAll()
      animateDiagonalTopLeft().then(emptyAll)
    }

    if (message.data[1] === grid[7][7]) {
      emptyAll()
      animateDiagonalBottomRight().then(emptyAll)
    }
  }
}
