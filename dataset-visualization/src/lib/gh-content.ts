import ThirtyFpsIcon from "@mui/icons-material/ThirtyFps";
import DangerousIcon from "@mui/icons-material/Dangerous";
import TurnRightIcon from "@mui/icons-material/TurnRight";

export function getGTSDBImageUrl(number: number) {
  return `https://raw.githubusercontent.com/Tracer1337/praxisprojekt-fom/main/datasets/gtsdb/images/${number
    .toString()
    .padStart(5, "0")}.jpg`;
}

export const GTSDB_ANNOTATIONS_URL =
  "https://raw.githubusercontent.com/Tracer1337/praxisprojekt-fom/main/datasets/gtsdb/gt.json";

export function getGTSRBImageUrls(objectId: number, track: number) {
  return Array(30)
    .fill(0)
    .map(
      (_, i) =>
        `https://raw.githubusercontent.com/Tracer1337/praxisprojekt-fom/main/datasets/gtsrb/images/${objectId
          .toString()
          .padStart(5, "0")}/${track.toString().padStart(5, "0")}_${i
          .toString()
          .padStart(5, "0")}.jpg`
    );
}

export const GTSRBDataset = [
  {
    objectId: 0,
    tracks: 7,
    label: "speed limit 20 (prohibitory)",
    icon: ThirtyFpsIcon,
  },
  {
    objectId: 14,
    tracks: 26,
    label: "stop (other)",
    icon: DangerousIcon,
  },
  {
    objectId: 33,
    tracks: 23,
    label: "go right (mandatory)",
    icon: TurnRightIcon,
  },
];
