import { animateDiagonalTopLeft, animateDiagonalBottomRight } from './animations'
import { colors } from './constants/colors'
import { gridPads } from './constants/pads'
import { sendPadColor, emptyGrid } from './output'

export const inputListener = (message: WebMidi.MIDIMessageEvent): void => {
  // timing clock
  if (message.data[0] === 248) return

  // after touch
  if (message.data[0] === 208) return

  // note on
  if (message.data[0] === 144 && message.data[2] > 0) {
    const pad = message.data[1]
    console.log(`Pad ${pad} pressed.`)

    sendPadColor(pad, colors.pink)

    if (message.data[1] === gridPads[0][0]) {
      animateDiagonalTopLeft().then(emptyGrid)
    }

    if (message.data[1] === gridPads[7][7]) {
      animateDiagonalBottomRight().then(emptyGrid)
    }
  }
}
