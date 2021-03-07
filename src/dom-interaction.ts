import { colors, Color, ColorName } from './constants/colors'
import { gridPads, otherPads } from './constants/pads'
import { sendPadColor } from './output'

let mainColor: Color = colors.pink

const getHtmlElement = (queryString: string): HTMLElement => {
  const domElement = document.querySelector<HTMLElement>(queryString)
  if (!domElement) {
    throw new Error(`Could not find ${queryString}.`)
  }

  return domElement
}

const updateMainColor = (colorName: ColorName) => {
  mainColor = colors[colorName]
  const domTxtMainColor = getHtmlElement('#txt-main-color')
  domTxtMainColor.innerText = colorName
}

const createMainColorButtons = (): void => {
  const domDivMainColor = getHtmlElement('#div-main-color')

  ;(Object.keys(colors) as Array<ColorName>).forEach((colorName) => {
    const domButton = document.createElement('button')
    domButton.innerText = colorName
    domButton.addEventListener('click', () => updateMainColor(colorName))
    domDivMainColor.appendChild(domButton)
  })
}

const createSendColorButtons = (): void => {
  const domDivSendColor = getHtmlElement('#div-send-color')

  const domButtonGrid = document.createElement('button')
  domButtonGrid.innerText = 'grid'
  domButtonGrid.addEventListener('click', () => {
    gridPads.forEach(row => row.forEach(pad => sendPadColor(pad, mainColor)))
  })
  domDivSendColor.appendChild(domButtonGrid)

  ;(Object.keys(otherPads) as Array<keyof typeof otherPads>).forEach((section) => {
    const domButton = document.createElement('button')
    domButton.innerText = section
    domButton.addEventListener('click', () => {
      otherPads[section].forEach(pad => sendPadColor(pad, mainColor))
    })
    domDivSendColor.appendChild(domButton)
  })
}

export const createDomElements = (): void => {
  createMainColorButtons()
  createSendColorButtons()
}
