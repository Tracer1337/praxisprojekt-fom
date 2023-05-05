const fs = require("fs")
const gt = require("./gt.json")

const IMAGE_WIDTH = 1360
const IMAGE_HEIGHT = 800

const OBJECT_IDS = []
// const OBJECT_IDS = [0, 14, 33]

if (!fs.existsSync("./labels")) {
  fs.mkdirSync("./labels")
}

const includedImages = []

Object.entries(gt).forEach(([imageNumber, objects]) => {
  const text = objects
    .filter((object) => OBJECT_IDS.length > 0 && OBJECT_IDS.includes(object.objectId))
    .map((object) => {
      const width = object.right - object.left
      const height = object.bottom - object.top
      const centerX = object.left + width / 2
      const centerY = object.top + height / 2

      const normalizedWidth = width / IMAGE_WIDTH
      const normalizedHeight = height / IMAGE_HEIGHT
      const normalizedCenterX = centerX / IMAGE_WIDTH
      const normalizedCenterY = centerY / IMAGE_HEIGHT

      const objectIndex = OBJECT_IDS.length > 0
        ? OBJECT_IDS.indexOf(object.objectId)
        : object.objectId

      return `${objectIndex} ${normalizedCenterX} ${normalizedCenterY} ${normalizedWidth} ${normalizedHeight}`
    })
    .join("\n")

  if (text.length === 0) {
    return
  }

  const imageNumberFormatted = imageNumber.padStart(5, "0")

  includedImages.push(imageNumberFormatted)

  fs.writeFileSync(`./labels/${imageNumberFormatted}.txt`, text)
})

if (OBJECT_IDS.length > 0) {
  if (!fs.existsSync("./images-tmp")) {
    fs.mkdirSync("./images-tmp")
  }

  includedImages.forEach((imageNumber) => {
    fs.copyFileSync(`./images/${imageNumber}.jpg`, `./images-tmp/${imageNumber}.jpg`)
  })

  fs.rmSync("./images", { recursive: true, force: true });

  fs.renameSync("./images-tmp", "./images")
}

