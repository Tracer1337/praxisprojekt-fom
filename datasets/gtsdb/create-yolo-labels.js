const fs = require("fs")
const gt = require("./gt.json")

const IMAGE_WIDTH = 1360
const IMAGE_HEIGHT = 800

const LABELS = {
  PROHIBITORY: 0,
  DANGER: 1,
  MANDATORY: 2,
  OTHER: 3
}

const labelMapping = {
  0: LABELS.PROHIBITORY,
  1: LABELS.PROHIBITORY,
  2: LABELS.PROHIBITORY,
  3: LABELS.PROHIBITORY,
  4: LABELS.PROHIBITORY,
  5: LABELS.PROHIBITORY,
  6: LABELS.OTHER,
  7: LABELS.PROHIBITORY,
  8: LABELS.PROHIBITORY,
  9: LABELS.PROHIBITORY,
  10: LABELS.PROHIBITORY,
  11: LABELS.DANGER,
  12: LABELS.OTHER,
  13: LABELS.OTHER,
  14: LABELS.OTHER,
  15: LABELS.PROHIBITORY,
  16: LABELS.PROHIBITORY,
  17: LABELS.OTHER,
  18: LABELS.DANGER,
  19: LABELS.DANGER,
  20: LABELS.DANGER,
  21: LABELS.DANGER,
  22: LABELS.DANGER,
  23: LABELS.DANGER,
  24: LABELS.DANGER,
  25: LABELS.DANGER,
  26: LABELS.DANGER,
  27: LABELS.DANGER,
  28: LABELS.DANGER,
  29: LABELS.DANGER,
  30: LABELS.DANGER,
  31: LABELS.DANGER,
  32: LABELS.OTHER,
  33: LABELS.MANDATORY,
  34: LABELS.MANDATORY,
  35: LABELS.MANDATORY,
  36: LABELS.MANDATORY,
  37: LABELS.MANDATORY,
  38: LABELS.MANDATORY,
  39: LABELS.MANDATORY,
  40: LABELS.MANDATORY,
  41: LABELS.OTHER,
  42: LABELS.OTHER
}

if (!fs.existsSync("./labels")) {
  fs.mkdirSync("./labels")
}

Object.entries(gt).forEach(([imageNumber, objects]) => {
  const text = objects
    .map((object) => {
      const width = object.right - object.left
      const height = object.bottom - object.top
      const centerX = object.left + width / 2
      const centerY = object.top + height / 2

      const normalizedWidth = width / IMAGE_WIDTH
      const normalizedHeight = height / IMAGE_HEIGHT
      const normalizedCenterX = centerX / IMAGE_WIDTH
      const normalizedCenterY = centerY / IMAGE_HEIGHT

      const label = labelMapping[object.objectId]
      
      return `${label} ${normalizedCenterX} ${normalizedCenterY} ${normalizedWidth} ${normalizedHeight}`
    })
    .join("\n")

  fs.writeFileSync(`./labels/${imageNumber.padStart(5, "0")}.txt`, text)
})
