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

  const getAnnotationForImageNumer = (number: number) =>
    data ? data[number] : null;

  useEffect(() => {
    fetch(GTSDB_ANNOTATIONS_URL)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return [data === null, getAnnotationForImageNumer] as const;
}
