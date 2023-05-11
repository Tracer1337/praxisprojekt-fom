const RASPI_HOST = import.meta.env.DEV
  ? "http://localhost:9000"
  : window.location.host;

export const videoStreamURL = `${RASPI_HOST}/video-stream`;

export type ObjectDetection = {
  x: number;
  y: number;
  width: number;
  height: number;
  class: number;
  name: string;
};

export const getTrafficSignUrl = (objectId: number) =>
  `${RASPI_HOST}/traffic-sign/${objectId}`;
