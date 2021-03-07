import { inputListener } from './input-listener'
import { saveOutPort } from './output'

const addListeners = (inputs: WebMidi.MIDIInputMap) => {
  inputs.forEach(input => {
    console.log(`Listening for MIDI events on ${input.name}.`)
    input.addEventListener('midimessage', inputListener)
  })
}

const saveLaunchpad = (outputs: WebMidi.MIDIOutputMap) => {
  const lpProMk3 = [...outputs.values()]
    .find(output => output.name?.includes('LPProMK3 MIDI'))

  if (!lpProMk3) {
    console.warn('Could not find Launchpad Pro MK3.')
    return
  }

  saveOutPort(lpProMk3)
}

export const setup = (): void => {
  if (!navigator.requestMIDIAccess) {
    console.error('WebMIDI not supported.')
    return
  }

  navigator.requestMIDIAccess({ sysex: true })
    .then((access) => {
      addListeners(access.inputs)
      saveLaunchpad(access.outputs)
    })
    .catch((error) => {
      console.error('Could not access MIDI devices.', error)
    })
}
