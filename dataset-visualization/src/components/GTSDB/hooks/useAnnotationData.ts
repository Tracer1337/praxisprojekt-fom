import { useEffect, useState } from "react";
import { GTSDB_ANNOTATIONS_URL } from "../../../lib/gh-content";

type AnnotationData = Record<
  number,
  {
    left: number;
    top: number;
    right: number;
    bottom: number;
    objectId: number;
  }[]
>;

export function useAnnotationData() {
  const [data, setData] = useState<AnnotationData | null>(null);

  const parseData = (text: string) => {
    const data: AnnotationData = {};

    text
      .split("\n")
      .filter((row) => row.length > 0)
      .forEach((row) => {
        const cols = row.split(";");

        const imageNumber = parseInt(cols[0].split(".")[0]);

        if (!(imageNumber in data)) {
          data[imageNumber] = [];
        }

        data[imageNumber].push({
          left: parseInt(cols[1]),
          top: parseInt(cols[2]),
          right: parseInt(cols[3]),
          bottom: parseInt(cols[4]),
          objectId: parseInt(cols[5]),
        });
      });

    return data;
  };

  const getAnnotationForImageNumer = (number: number) =>
    data ? data[number] : null;

  useEffect(() => {
    fetch(GTSDB_ANNOTATIONS_URL)
      .then((res) => res.text())
      .then((text) => setData(parseData(text)))
      .catch((error) => console.error(error));
  }, []);

  return [data === null, getAnnotationForImageNumer] as const;
}
