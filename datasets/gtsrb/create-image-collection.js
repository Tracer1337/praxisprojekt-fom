const fs = require("fs")
const path = require("path")

const DATASET_DIR = process.argv[2]
const IMAGES_DIR = path.join(__dirname, "images")

if (!DATASET_DIR) {
  console.error("Missing argument: Dataset Directory")
  process.exit()
}

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR)
}

fs.readdirSync(DATASET_DIR, { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map((dir) => dir.name)
  .forEach((dir) => {
    const src = path.join(DATASET_DIR, dir)
    const dest = path.join(IMAGES_DIR, dir)

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest)
    }

    fs.readdirSync(src)
      .filter((filename) => path.parse(filename).name.endsWith("29"))
      .slice(0, 5)
      .forEach((filename) =>
        fs.copyFileSync(
          path.join(src, filename),
          path.join(dest, filename)
        )
      )
  })
