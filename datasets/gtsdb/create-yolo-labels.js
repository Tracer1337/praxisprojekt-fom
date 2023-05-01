const fs = require("fs")
const gt = require("./gt.json")

const IMAGE_WIDTH = 1360
const IMAGE_HEIGHT = 800

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

      return `${object.objectId} ${normalizedCenterX} ${normalizedCenterY} ${normalizedWidth} ${normalizedHeight}`
    })
    .join("\n")

  fs.writeFileSync(`./labels/${imageNumber.padStart(5, "0")}.txt`, text)
})
