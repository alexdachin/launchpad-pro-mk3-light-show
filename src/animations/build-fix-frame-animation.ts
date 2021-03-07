import { Animation } from './types'

type Input = {
  frames: number
  fps: number
  render: (frame: number) => void
}

export const buildFixFrameAnimation = ({ frames, fps, render }: Input): Animation =>
  () => new Promise((resolve) => {
    let frame = 0

    const loop = setInterval(() => {
      if (frame === frames) {
        clearInterval(loop)
        return resolve()
      }

      render(frame++)
    }, Math.ceil(1000 / fps))
  })
