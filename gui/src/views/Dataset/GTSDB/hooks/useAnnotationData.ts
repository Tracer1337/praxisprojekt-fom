import { useEffect, useState } from "react";
import { GTSDB_ANNOTATIONS_URL } from "../../../../lib/gh-content";
import { ObjectDetection } from "../../../../lib/raspi";

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

  const getAnnotationsForImageNumber = (number: number) =>
    data ? data[number] : null;

  const toObjectDetections = (
    annotations: AnnotationData[number]
  ): ObjectDetection[] =>
    annotations.map((annotation) => ({
      xmin: annotation.left,
      xmax: annotation.right,
      ymin: annotation.top,
      ymax: annotation.bottom,
      class: annotation.objectId,
      name: "",
      confidence: 1,
    }));

  useEffect(() => {
    fetch(GTSDB_ANNOTATIONS_URL)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return {
    isLoading: !data,
    getAnnotationsForImageNumber,
    toObjectDetections,
  };
}
