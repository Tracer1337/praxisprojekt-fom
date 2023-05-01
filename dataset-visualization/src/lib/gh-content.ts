export function getGTSDBImageUrl(number: number) {
  return `https://raw.githubusercontent.com/Tracer1337/praxisprojekt-fom/main/FullIJCNN2013/${number
    .toString()
    .padStart(5, "0")}.jpg`;
}

export const GTSDB_ANNOTATIONS_URL =
  "https://raw.githubusercontent.com/Tracer1337/praxisprojekt-fom/main/FullIJCNN2013/gt.json";
