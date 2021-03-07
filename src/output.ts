import { colors } from './constants/colors'

let outPort: WebMidi.MIDIOutput | undefined

const send = (data: number[]): void => {
  if (!outPort) {
    console.error('No MIDI output port to send to.')
    return
  }

  outPort.send(data)
}

export const saveOutPort = (port: WebMidi.MIDIOutput): void => {
  outPort = port
}

export const sendPadColor = (pad: number, color: number): void =>
  send([144, pad, color])

export const sendEdgeColor = (color: number): void => {
  [...Array(8)]
    .flatMap((_, i) => [
      (i + 1) * 10, // left
      (i + 1) * 10 + 9, // right
      i + 91, // top
      i + 101, // bottom
    ])
    .forEach(pad => sendPadColor(pad, color))
}

export const sendAllColor = (color: number): void => {
  [...Array(108)]
    .map((_, i) => i + 1)
    .map(pad => sendPadColor(pad, color))
}

export const emptyAll = (): void =>
  sendAllColor(colors.empty)
