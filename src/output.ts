import { colors } from './constants/colors'
import { gridPads } from './constants/pads'

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

export const emptyGrid = (): void =>
  gridPads.forEach(row => row.forEach(pad => sendPadColor(pad, colors.empty)))
