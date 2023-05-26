const GITHUB_CONTENT_URL =
  "https://raw.githubusercontent.com/Tracer1337/praxisprojekt-fom/main";

export function getGTSDBImageUrl(number: number) {
  return `${GITHUB_CONTENT_URL}/datasets/gtsdb/images/${number
    .toString()
    .padStart(5, "0")}.jpg`;
}

export const GTSDB_ANNOTATIONS_URL = `${GITHUB_CONTENT_URL}/datasets/gtsdb/gt.json`;
